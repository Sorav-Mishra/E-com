import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const CORS_ORIGIN = process.env.CORS_ORIGIN || "*";

// Middleware
app.use(cors({ origin: CORS_ORIGIN, credentials: true }));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));

// routes import
import productRouter from "./routes/product.routes.js";
import userRouter from "./routes/users.routes.js";
import cartRouter from "./routes/cart.routes.js";
import orderRouter from "./routes/order.routes.js";
import addressRouter from "./routes/address.routes.js";

// routes declaration
app.use("/api/v1", productRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/address", addressRouter);

export { app };
