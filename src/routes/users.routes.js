import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authenticateToken from "../middlewares/authMIddleware.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

// User registration route
router.post("/register", registerUser);

// User login route
router.post("/login", loginUser);

router.get("/profile", authenticateToken, getUserProfile);

router.put(
  "/profile",
  authenticateToken,
  upload.single("avatar"),
  updateUserProfile
);

export default router;
