import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from "./routes/client.js";
import generalRoutes from "./routes/general.js";
import managementRoutes from "./routes/management.js";
import salesRoutes from "./routes/sales.js";
import {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
} from "./data/index.js";
import User from "./models/User.js";
import Product from "./models/product.js";
import productStat from "./models/productStat.js";
import Transaction from "./models/Transaction.js";
import OverallStat from "./models/OverallStat.js";

dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.contentSecurityPolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

const PORT = process.env.PORT || 9000;

const getConnection = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    if (conn) {
      console.log(`MongoDB Connected on ${conn.connection.host}`);
    } else {
      console.log("Failed to connect DB");
    }
  } catch (error) {
    console.log(`Failed with error: ${error.message}`);
  }
};

const checkDatabaseStatus = async () => {
  try {
    const dbConnection = mongoose.connection;
    return {
      status: dbConnection.readyState === 1 ? "Connected" : "Disconnected",
      host: dbConnection.host,
      port: dbConnection.port,
      databaseName: dbConnection.name,
    };
  } catch (error) {
    throw new Error(`Failed to check database status: ${error.message}`);
  }
};

app.get("/", async (req, res) => {
  try {
    const databaseStatus = await checkDatabaseStatus();
    res.status(200).json({ message: "Server is running", databaseStatus, port: PORT });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

getConnection();
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});