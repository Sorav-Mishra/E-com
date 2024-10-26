import express, { Router } from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  getUserAddresses,
} from "../controllers/addressController.js";
import authenticateToken from "../middlewares/authMIddleware.js";

const router = Router();

router.post("/addAddress", authenticateToken, addAddress);

router.put("/edit/:id", authenticateToken, editAddress);

router.delete("/delete/:id", authenticateToken, deleteAddress);

router.get("/get", authenticateToken, getUserAddresses);

export default router;
