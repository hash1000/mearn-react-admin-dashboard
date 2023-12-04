import mongoose from "mongoose";

const productStatSchema = new mongoose.Schema({
    productId:String,
    yearlySalesTotal:Number,
    yearlyTotalSoldUnits :Number,
    year:Number,
    monthlyData:[
    {
    month:String,
    totalSales:Number,
    totalUnits:Number,
    }],
    dailyData:[{
    data:String,
    totalSales:Number,
    totalUnits:Number,
    }]
    
});

const productStat = mongoose.model("ProductStat", productStatSchema);

export default productStat;
