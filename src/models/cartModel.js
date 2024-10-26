import mongoose, { Schema } from "mongoose";

const cartSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "product",
          reqyired: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
          min: 1,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      requried: true,
      default: 0,
    },
  },
  { timestamps: true }
);

cartSchema.pre("save", function (next) {
  this.totalPrice = this.products.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);
  next();
});

export const Cart = mongoose.model("cart", cartSchema);
