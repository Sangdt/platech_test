
import { checkArrNotEmpty } from "@/Helper/checkArrNotEmpty";
import admin, { db, cartItemRef } from "../FirebaseAdmin"



const checkItemsExist = (uid, productID, cartItems) => {
    // console.log(cartItems,Object.keys(cartItems).length === 0 && cartItems.constructor === Object)
    if (checkArrNotEmpty(cartItems.Items)) {
        return cartItems.Items.findIndex(cartItems => {
            return cartItems.productID === productID
        }) > -1;
    }
}

const updateSingleItems = async (uid, productID, quantity) => {
    const { ...cartItems } = await getAllCartItems(uid);
    const indexToupdate = cartItems.Items.findIndex(cartItems => {
        return cartItems.productID === productID
    });

    if (cartItems.Items[indexToupdate].quantity !== quantity) {
        cartItems.Items[indexToupdate].quantity = quantity;
        cartItemRef.doc(uid).update({
            DateUpdate: admin.firestore.Timestamp.fromDate(new Date()),
            Items: cartItems.Items
        });
    }
}

const addItems = async (uid, productID, quantity) => {
    try {
        // try update to check if user info in cart or not
        await cartItemRef.doc(uid).update({
            DateUpdate: admin.firestore.Timestamp.fromDate(new Date()),
            Items: admin.firestore.FieldValue.arrayUnion({ productID, quantity })
        });
    } catch (error) {
        // user Dont have a cart yet
        if (error.code === 5) {
            //console.log("Error code 5")
            await cartItemRef.doc(uid).set({
                DateUpdate: admin.firestore.Timestamp.fromDate(new Date()),
                Items: admin.firestore.FieldValue.arrayUnion({ productID, quantity })
            });
        }
        else {
            throw error
        }
    }

}

const addMany = async (uid, ItemsArray) => {
    for (const cartItem of ItemsArray) {
        try {
            const { ...cartItems } = await getAllCartItems(uid);
            if (checkItemsExist(uid, cartItem.productID, cartItems)) {
                // if items already exist in firestore
                await updateSingleItems(uid, cartItem.productID, cartItem.Quantity)
            } else {
                await addItems(uid, cartItem.productID, cartItem.Quantity);
            }
        } catch (error) {
            console.log("err", error);
            throw error
        }
    }
}

const updatecart = async (uid, productID, quantity) => {
    var docRef = cartItemRef.doc(uid);
    let data;
    await docRef.get().then(function (doc) {
        if (doc.exists) {
            data = { ...doc.data() }
            // console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
        }
    }).catch(function (error) {
        //console.log("Error getting document:", error);
    });
    let dateUpdated = false;
    for (let i in data.Items) {
        // console.log(productID, data.Items[i])
        if (data.Items[i].productID === productID) {
            if (!dateUpdated) {
                data.DateUpdate = admin.firestore.Timestamp.fromDate(new Date());
                dateUpdated = true;
            }
            data.Items[i].quantity = quantity;
            break;
        }
    }
    docRef.update(data)
}
const deletecart = async (uid, productID) => {

    var docRef = cartItemRef.doc(uid);
    let data;
    await docRef.get().then(function (doc) {
        if (doc.exists) {
            data = { ...doc.data() }
            // console.log("Document data:", doc.data());
        } else {
            // doc.data() will be undefined in this case
            //console.log("No such document!");
        }
    }).catch(function (error) {
        //console.log("Error getting document:", error);
    });
    data.Items = data.Items.filter(Items => Items.productID != productID)
    //console.log("Document data:", data);
    data.DateUpdate = admin.firestore.Timestamp.fromDate(new Date());

    docRef.update(data)
}
const deleteproduct = async (productID) => {
    var docRef = cartItemRef;
    let someArray;
    let dateUpdated = false
    await docRef.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
            someArray = [
                {
                    id: doc.id,
                    data: doc.data()
                }
            ]
            for (let i = 0; i < someArray.length; i++) {
                let id = someArray[i].id;
                let data = someArray[i].data;
                // console.log(id)
                // console.log(data)
                if (!dateUpdated) {
                    data.DateUpdate = admin.firestore.Timestamp.fromDate(new Date());
                    dateUpdated = true;
                }
                data.Items = data.Items.filter(Items => Items.productID != productID)
                docRef.doc(id).update(data)
                break;
            }
        }

        );
    });

}


export const getAllCartItems = async (uid) => (await cartItemRef.doc(uid).get()).data();

export { addItems, addMany, updatecart, deletecart, deleteproduct }


