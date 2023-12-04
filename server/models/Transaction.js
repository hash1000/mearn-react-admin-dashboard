import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId:String,
    cost:String,
    products:
    {
        type: [mongoose.Types.ObjectId],
    of:Number
    },
    
});

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
