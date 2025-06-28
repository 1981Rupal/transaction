const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
    date:Date,
    description :String,
    amount:Number,
    catogery:String,
    type:{type:String,enum:['Income','Expense']},
    createdAt:{type:Date,default:Date.now},
    updatedAt:Date
});
module.exports = mongoose.model('Transaction',transactionSchema);
