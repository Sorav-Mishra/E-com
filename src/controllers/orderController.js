// import { Order } from "../models/ordersModels.js";
// import { Address } from "../models/addressModel.js";
// import { Cart } from "../models/cartModel.js";

// import Razorpay from "razorpay";
// import { Order } from "../models/ordersModels.js";

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // create Order
// const createOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { addressId, paymentMethod } = req.body;

//     const cart = await Cart.findOne({ user: userId }).populate(
//       "products.product"
//     );
//     if (!cart) {
//       return res.status(404).json({ message: "Cart not found" });
//     }

//     const address = await Address.findById(addressId);
//     if (!address) {
//       return res.status(404).json({ message: "Address not found" });
//     }

//     // create new order
//     const newOrder = new Order({
//       user: userId,
//       cart: cart._id,
//       address: address._id,
//       products: cart.products,
//       totalAmount: cart.totalPrice,
//       paymentMethod,
//     });

//     await newOrder.save();

//     await Cart.findOneAndDelete({ user: userId });

//     res
//       .status(201)
//       .json({ message: "Order placed successfully", order: newOrder });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // View Orders
// const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const orders = await Order.find({ user: userId })
//       .populate("products.product")
//       .populate("address")
//       .sort({ createdAt: -1 });
//     if (!orders || orders.length === 0) {
//       return res.status(404).json({ message: "No orders found" });
//     }

//     res.status(200).json({ orders });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// // Cancel Order
// const cancelOrder = async (req, res) => {
//   try {
//     const userId = req.user._id;
//     const { orderId } = req.params;

//     // Find the order
//     const order = await Order.findOne({ _id: orderId, user: userId });
//     if (!order) {
//       return res.status(404).json({ message: "Order not found" });
//     }

//     // Check if order can be canceled (e.g., not already delivered or canceled)
//     if (order.status === "delivered") {
//       return res
//         .status(400)
//         .json({ message: "Order already delivered, cannot be canceled" });
//     }
//     if (order.status === "canceled") {
//       return res.status(400).json({ message: "Order is already canceled" });
//     }

//     // Update the order status to canceled
//     order.status = "canceled";
//     await order.save();

//     res.status(200).json({ message: "Order canceled successfully", order });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error: error.message });
//   }
// };

// export { createOrder, getUserOrders, cancelOrder };

import { Order } from "../models/ordersModels.js";
import { Address } from "../models/addressModel.js";
import { Cart } from "../models/cartModel.js";
import Razorpay from "razorpay";

// Initialize Razorpay with API keys from environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// createOrder function to create a new order in the database
const createOrder = async (req, res) => {
  try {
    // Extract user ID and payment information from the request
    const userId = req.user._id;
    const { addressId, paymentMethod } = req.body;

    // Find the user's cart and populate it with product information
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart) {
      // If cart is not found, send a 404 error response
      return res.status(404).json({ message: "Cart not found" });
    }

    // Retrieve the specified address from the database
    const address = await Address.findById(addressId);
    if (!address) {
      // If address is not found, send a 404 error response
      return res.status(404).json({ message: "Address not found" });
    }

    // Create a new Order object with user, cart, address, and payment details
    const newOrder = new Order({
      user: userId,
      cart: cart._id,
      address: address._id,
      products: cart.products,
      totalAmount: cart.totalPrice,
      paymentMethod,
    });

    // Save the new order to the database
    await newOrder.save();

    // Remove the cart once the order is successfully created
    await Cart.findOneAndDelete({ user: userId });

    // Respond with success message and the created order data
    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// getUserOrders function to retrieve all orders for a user
const getUserOrders = async (req, res) => {
  try {
    // Get the user ID from the authenticated request
    const userId = req.user._id;

    // Find all orders for the user, sorted by creation date, with populated product and address data
    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .populate("address")
      .sort({ createdAt: -1 });

    // If no orders are found, return a 404 message
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    // Respond with the list of orders
    res.status(200).json({ orders });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// cancelOrder function to cancel a specific order
const cancelOrder = async (req, res) => {
  try {
    // Get user ID and order ID from the request
    const userId = req.user._id;
    const { orderId } = req.params;

    // Find the order by ID and user ID to ensure it belongs to the user
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      // If the order is not found, return a 404 error
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if the order status is delivered or already canceled
    if (order.status === "delivered") {
      return res
        .status(400)
        .json({ message: "Order already delivered, cannot be canceled" });
    }
    if (order.status === "canceled") {
      return res.status(400).json({ message: "Order is already canceled" });
    }

    // Update the order status to canceled
    order.status = "canceled";
    await order.save();

    // Respond with success message and the updated order data
    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    // Handle any server errors
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the functions to use them in other parts of the app
export { createOrder, getUserOrders, cancelOrder };
