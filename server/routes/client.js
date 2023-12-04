import express from "express";
import { getProducts, getCustomers , getTransaction , getGeography } from "../controller/client.js";

const router =express.Router();
router.get('/porduct',getProducts);
router.get('/customer',getCustomers);
router.get('/transaction',getTransaction);
router.get('/geography',getGeography);


export default router;