const mongoose =require("mongoose");

const payementSchema=new mongoose.Schema({
    payementId:String,
    orderId:String,
    amount:Number,
    currency:String,
    status:String,
    method:String,
    email:String,
    contact:String,
    createAt:Date
})

const Payment=mongoose.model("Payment".payementSchema);
module.exports=Payment;