import { Cart } from "../models/cartModel.js";
import { product } from "../models/productModel.js";

// Add product to cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    const productDetails = await product.findById(productId);
    if (!productDetails) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [
          {
            product: productId,
            quantity,
            price: productDetails.discountedPrice,
          },
        ],
      });
    } else {
      const existingProductIndex = cart.products.findIndex(
        (item) => item.product.toString() === productId
      );

      if (existingProductIndex >= 0) {
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({
          product: productId,
          quantity,
          price: productDetails.discountedPrice,
        });
      }
    }

    await cart.save();

    res.status(200).json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get user cart
const getUserCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ user: userId }).populate(
      "products.product",
      "name discountedPrice productImage"
    );

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    res.status(200).json({ message: "Cart fetched successfully", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.query;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({ message: "Product removed from cart", cart });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const updateCartQuantity = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id;

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (item) => item.product.toString() === productId
    );

    if (productIndex >= 0) {
      cart.products[productIndex].quantity = quantity;

      if (quantity < 1) {
        cart.products.splice(productIndex, 1);
      }

      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
    } else {
      res.status(404).json({ message: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { addToCart, getUserCart, removeFromCart, updateCartQuantity };
