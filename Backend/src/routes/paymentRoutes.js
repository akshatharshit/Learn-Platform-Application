import express from "express";
import { verifyPayPalPayment, createPayPalOrder } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/verify-paypal", verifyPayPalPayment);
router.post("/create-paypal-order", createPayPalOrder);

export default router;
