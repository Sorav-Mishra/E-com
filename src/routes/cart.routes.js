// import express from "express";
// import {
//   addToCart,
//   removeFromCart,
//   //getCart,
//   getUserCart,
// } from "../controllers/cartPageControllers.js";
// import authenticateToken from "../middlewares/authMIddleware.js";

// const router = express.Router();

// router.get("/", getUserCart);
// router.post("/add", addToCart);
// router.delete("remove", removeFromCart);

// export default router;

import express from "express";
import {
  addToCart,
  removeFromCart,
  getUserCart,
  updateCartQuantity,
} from "../controllers/cartPageControllers.js";
import authenticateToken from "../middlewares/authMIddleware.js";

const router = express.Router();

router.get("/", authenticateToken, getUserCart);

router.post("/add", authenticateToken, addToCart);

router.delete("/remove", authenticateToken, removeFromCart);

router.put("/update", authenticateToken, updateCartQuantity);

export default router;
