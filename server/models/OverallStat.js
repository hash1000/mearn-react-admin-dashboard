import mongoose from "mongoose";

const overallStatSchema = new mongoose.Schema({
  totalCustomers: Number,
  yearlySalesTotal: Number,
  yearlyTotalSoldUnits: Number,
  year: Number,
  monthlyData: [
    {
      month: String,
      totalSales: Number,
      totalUnits: Number,
    },
  ],
  dailyData: [{
    data: String,
    totalSales: Number,
    totalUnits: Number,
  }],
  salesByCategory: {
    type: Map,
    of: Number,
  },
});

const OverallStat = mongoose.model("OverallStat", overallStatSchema);

export default OverallStat;
