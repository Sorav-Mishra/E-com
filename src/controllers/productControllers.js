import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { product } from "../models/productModel.js";

const createProduct = async (req, res) => {
  try {
    const { name, originalPrice, discountedPrice, discount } = req.body;

    if (!req.files.productImage || !req.files.thumbnails || !req.files.video) {
      return res.status(400).json({ message: "All files are required" });
    }

    const productImageLocalPath = req.files.productImage[0].path;
    const videoLocalPath = req.files.video[0].path;

    const productImage = await uploadOnCloudinary(productImageLocalPath);
    const video = await uploadOnCloudinary(videoLocalPath);

    if (!productImage || !video) {
      throw new Error("File upload to Cloudinary failed");
    }

    const thumbnails = await Promise.all(
      req.files.thumbnails.map(async (file) => {
        const uploadResult = await uploadOnCloudinary(file.path);
        return uploadResult.url;
      })
    );

    const newProduct = await product.create({
      name,
      originalPrice,
      discountedPrice,
      discount,
      productImage: productImage.url,
      thumbnails,
      video: video.url,
    });

    res
      .status(201)
      .json({ message: "Product created successfully", newProduct });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await product.find({}, { thumbnails: 0, video: 0 });
    res
      .status(200)
      .json({ message: "Products fetched successfully", products });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const productDetail = await product
      .findById(id)
      .select("+thumbnails +video");

    if (!productDetail) {
      return res.status(404).json({ message: "Product not found" });
    }

    res
      .status(200)
      .json({ message: "Product fetched successfully", productDetail });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export { createProduct, getAllProducts, getProductById };
