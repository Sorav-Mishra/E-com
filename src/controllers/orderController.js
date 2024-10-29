import { Order } from "../models/ordersModels.js";
import { Address } from "../models/addressModel.js";
import { Cart } from "../models/cartModel.js";

// create Order
const createOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { addressId, paymentMethod } = req.body;

    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product"
    );
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const address = await Address.findById(addressId);
    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }

    // create new order
    const newOrder = new Order({
      user: userId,
      cart: cart._id,
      address: address._id,
      products: cart.products,
      totalAmount: cart.totalPrice,
      paymentMethod,
    });

    await newOrder.save();

    await Cart.findOneAndDelete({ user: userId });

    res
      .status(201)
      .json({ message: "Order placed successfully", order: newOrder });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// View Orders
const getUserOrders = async (req, res) => {
  try {
    const userId = req.user._id;

    const orders = await Order.find({ user: userId })
      .populate("products.product")
      .populate("address")
      .sort({ createdAt: -1 });
    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    res.status(200).json({ orders });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Cancel Order
const cancelOrder = async (req, res) => {
  try {
    const userId = req.user._id;
    const { orderId } = req.params;

    // Find the order
    const order = await Order.findOne({ _id: orderId, user: userId });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Check if order can be canceled (e.g., not already delivered or canceled)
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

    res.status(200).json({ message: "Order canceled successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createOrder, getUserOrders, cancelOrder };
