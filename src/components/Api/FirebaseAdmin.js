import * as admin from 'firebase-admin'

//#region INITIALIZE FIREBASE APP 
const firebaseEnvKey = fromB64(process.env.FIREBASE_PRIVATEKEY_ENCRYPTED);
const Firebasecredential = JSON.parse(firebaseEnvKey);
// console.log("Firebasecredential",Firebasecredential)
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(Firebasecredential),
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  });
}
// export const initializeFirebaseApp = () => {

// }
//#endregion

//#region FIRESTORE AND COLLECTION REFERNCE
export const db = admin.firestore();
export const cartItemRef = db.collection("cart");
//#endregion

//#region ADMIN HELPER METHOD 
/**Helper  */
export const verifyIdToken = (token) => {
  return admin
    .auth()
    .verifyIdToken(token, true)
    .catch((error) => {
      throw error
    })
}
export function fromB64(string) {
  return Buffer.from(string, 'base64').toString();
}
//#endregion


// run this first so it save us from problem
// initializeFirebaseApp()

export default admin;

