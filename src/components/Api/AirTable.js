import Airtable from 'airtable'
// Airtable.configure({
//     apiKey: process.env.AIRTABLE_API_KEY,
// });
var base = new  Airtable({apiKey: process.env.AIRTABLE_API_KEY}).base('app8f49zZ8CBv1Ocw');
export async function CreateNewFormRow(fullName, phoneNumber, email, clientSupportInfo, address) {
    var base = Airtable.base('app8f49zZ8CBv1Ocw');
    try {
        const createdRecords= await base('Form Liên Hệ').create({
            "Họ và Tên": fullName,
            "Số Điện Thoại": phoneNumber,
            "Email": email,
            //"Địa chỉ": address,
            "Nội dung tư vấn": clientSupportInfo,
            "Trạng thái": "Mới"
        }, function (err, records) {
            if (err) {
                throw err;
                // console.error("err while creating Form row",err);
                // return;
            }
            //console.log("Create complete bruhhhh", { ...records })
            return records;
        });
        return createdRecords;
    } catch (err) {
        throw err;
    }
}


 export default base;


