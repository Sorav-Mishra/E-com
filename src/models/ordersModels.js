// import mongoose, { Schema } from "mongoose";

// const orderSchema = new Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     cart: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     address: {
//       type: Schema.Types.ObjectId,
//       ref: "Address",
//       required: true,
//     },
//     products: [
//       {
//         product: {
//           type: Schema.Types.ObjectId,
//           ref: "product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//         },
//         price: { type: Number, required: true },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     paymentsStatus: {
//       type: String,
//       enum: ["pending", "completed", "failed"],
//       default: "pending",
//     },
//     orderStatus: {
//       type: String,
//       enum: ["processing", "shipped", "delivered", "cancelled"],
//       default: "processing",
//     },
//     paymentMethod: {
//       type: String,
//       enum: ["cod", "card", "netbanking"],
//       required: true,
//     },
//     orderDate: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// export const Order = mongoose.model("Order", orderSchema);

import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    orderStatus: {
      type: String,
      enum: ["processing", "shipped", "delivered", "cancelled"],
      default: "processing",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "card", "netbanking"],
      required: true,
    },
    razorpayOrderId: {
      type: String,
      required: function () {
        return this.paymentMethod !== "cod";
      },
    },
  },
  { timestamps: true }
);

export const Order = mongoose.model("Order", orderSchema);
