import express from "express";
import authenticateToken from "../middlewares/authMIddleware.js";
import {
  cancelOrder,
  createOrder,
  getUserOrders,
  // getUserOrderById,
  // getAllOrders,
  // getOrderDetails,
  //getUserOrders,
  // updateOrderStatus,
} from "../controllers/orderController.js";
const router = express.Router();

//User routes
router.route("/create").post(authenticateToken, createOrder);

router.route("/").get(authenticateToken, getUserOrders);
router.patch("/:orderId/cancel", authenticateToken, cancelOrder);

// // Admin routes
// router.route("/").get(authenticateToken, getOrderDetails);
// router.route("update-status").put(authenticateToken, updateOrderStatus);

export default router;
