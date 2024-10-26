import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productImage: {
      type: String,
      required: true,
    },
    thumbnails: {
      type: [String],
    },
    video: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    discountedPrice: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const product = mongoose.model("product", productSchema);
