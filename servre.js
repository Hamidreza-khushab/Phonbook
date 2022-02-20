const mongoose = require('mongoose');
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
        name : 'jak',
        phoneNumber : 12345,
        email : 'max@gamil.com'
    }
);
async function createNumber()
{
    const savedNumber = await maxPhonenumber.save();
    console.log('Number Saved', savedNumber );
}
createNumber();
