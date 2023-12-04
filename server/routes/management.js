import express from "express";
import { getAdmins , getUserPerformance } from "../controller/management.js";
const router = express.Router();
router.get("/admin", getAdmins);
router.get("/perfomance/:id", getUserPerformance);

export default router;
