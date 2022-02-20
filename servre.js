const mongoose = require('mongoose');
const { async } = require('regenerator-runtime');
mongoose.connect('mongodb://localhost:27017/testPhoneBook').then(() => {console.log('db connected');}).catch((err) => {console.log('db not connected', err);});

const schemaPhonenumber = new mongoose.Schema({
    name : { type : String, required :true },
    phoneNumber : { type : Number, required :true },
    email: { type : String, required :true },
    addres : { type : String, default : 'Germany' },
});
const PhonebookModel = mongoose.model('phonebook', schemaPhonenumber);
const maxPhonenumber = new PhonebookModel
(
    {
        name : 'ali',
        phoneNumber : 96345,
        email : 'ali@gamil.com'
    }
);
async function createNumber()
{
    const savedNumber = await maxPhonenumber.save();
    console.log('Number Saved', savedNumber );
}
// Filter parameters
// eq => equal to
// ne => not equal to
// gt => greater than
// gte => greater than or equal to
// lt => 
// lte
// in
// nin => mot in

async function getPhonenumberList()
{
    // const phoneNumberList = await PhonebookModel.find();
    // const phoneNumberList = await PhonebookModel.find({ name: 'max' });
    // const phoneNumberList = await PhonebookModel.find({ phoneNumber:{ $ne : 12345  } });
    // const phoneNumberList = await PhonebookModel.find({ phoneNumber:{ $nin : [ 12345 ] } });
    // const phoneNumberList = await  PhonebookModel.find().or([ { name:'jak' }, { phoneNumber : { $lt :20000 } } ]);  
    // const phoneNumberList = await  PhonebookModel.find().and([ { name:'jak' }, { phoneNumber : { $lt :20000 } } ]);
    
    // rejaks sintaks
    // First word have 'm' 
    // const phoneNumberList = await  PhonebookModel.find({ name:/^m/ }); 
    // last word have 'k' 
    // const phoneNumberList = await  PhonebookModel.find({ name:/k$/ }); 
    // Word included 'f'
    // const phoneNumberList = await  PhonebookModel.find({ name:/.*f.*/ }); 
    // count fild with a
    const phoneNumberList = await  PhonebookModel.find({ name:/.*a.*/ }).count(); 
    // const phoneNumberList = await PhonebookModel.find().limit(1);
    // const phoneNumberList = await PhonebookModel.find().sort({ name:-1 });
    // const phoneNumberList = await PhonebookModel.find().sort({ name:-1 }).select({ 
    //     name : 1,
    //     phoneNumber:1
    // });
    console.clear();
    console.log(phoneNumberList);
}
async function pagination()
{
    const pageNumber =1;
    const pageSize = 4;
    const phoneNumberList = await  PhonebookModel.find().skip((pageNumber-1)*pageSize).limit(pageSize); 
    console.clear();
    console.log(phoneNumberList);
}
async function modifyMetodOne(id, name)
{
    const phoneNumber = await  PhonebookModel.findById(id); 
    if (!phoneNumber) return;
    phoneNumber.name = name;
    const phoneNumberModify = await phoneNumber.save();
    console.clear();
    console.log(phoneNumberModify);
}
async function modifyMetodTow(id, name)
{
    const phoneNumberModify = await  PhonebookModel.update({ _id:id }, { $set : { name } }); 
    console.clear();
    console.log(phoneNumberModify);
}
async function deleted(id)
{
    const phoneNumberDeleted = await  PhonebookModel.findByIdAndDelete(id); 
    console.clear();
    console.log(phoneNumberDeleted);
}
// createNumber();
// getPhonenumberList();
// pagination();
// modifyMetodOne('6212187ad467c8092aea1ee7', 'Hamid');
// modifyMetodTow('6212187ad467c8092aea1ee7', 'Hamed');
deleted('6212187ad467c8092aea1ee7');
