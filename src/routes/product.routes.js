import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
} from "../controllers/productControllers.js";

import { upload } from "../middlewares/multer.middlewares.js";

import authenticateToken from "../middlewares/authMIddleware.js";

const router = Router();

// Product routes
router.route("/addProduct").post(
  upload.fields([
    {
      name: "productImage",
      maxCount: 1,
    },
    {
      name: "thumbnails",
      maxCount: 5,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createProduct
);

router.route("/getAllProducts").get(getAllProducts);
router.route("/getProductById/:id").get(getProductById);

export default router;
