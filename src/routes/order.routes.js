import express from "express";
import authenticateToken from "../middlewares/authMIddleware.js";
import {
  cancelOrder,
  createOrder,
  getUserOrders,
  verifyPayment,
} from "../controllers/orderController.js";
const router = express.Router();

//User routes
router.route("/create").post(authenticateToken, createOrder);
router.route("/verify").post(authenticateToken, verifyPayment);

router.route("/").get(authenticateToken, getUserOrders);
router.patch("/:orderId/cancel", authenticateToken, cancelOrder);

export default router;
