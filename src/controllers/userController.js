import { User } from "../models/userModel.js";
import { generateAccessAndRefreshTokens } from "../utils/tokenUtils.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, number, password } = req.body;

  if (!fullName || !email || !number || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existsUser = await User.findOne({
    $or: [{ email }, { number }],
  });

  if (existsUser) {
    return res
      .status(400)
      .json({ message: "User with email or number already exists" });
  }

  const user = await User.create({
    fullName,
    email,
    number,
    password,
    avatar: "",
  });

  const createUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createUser) {
    return res.status(500).json({ message: "Something went wrong" });
  }

  const { accessToken, refreshToken } =
    generateAccessAndRefreshTokens(createUser);

  return res.status(201).json({
    message: "User registered successfully",
    data: createUser,
    tokens: { accessToken, refreshToken },
  });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, number, password } = req.body;

  if (!email && !number) {
    return res.status(400).json({ message: "Email or number is required" });
  }

  const user = await User.findOne({
    $or: [{ email }, { number }],
  });

  if (!user) {
    return res.status(400).json({ message: "User does not exist" });
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: "Password incorrect" });
  }

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const { accessToken, refreshToken } =
    generateAccessAndRefreshTokens(loggedInUser);

  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json({
      message: "User logged in successfully",
      user: loggedInUser,
      accessToken,
      refreshToken,
    });
});

// In UserController.js
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  return res.status(200).json(user);
});

// In UserController.js
const updateUserProfile = asyncHandler(async (req, res) => {
  const { fullName, email, number } = req.body;

  let user = await User.findById(req.user._id);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Update fields
  user.fullName = fullName || user.fullName;
  user.email = email || user.email;
  user.number = number || user.number;

  // Handle avatar upload if provided
  if (req.file) {
    const uploadedImage = await uploadOnCloudinary(req.file.path);
    user.avatar = uploadedImage.secure_url;
  }

  const updatedUser = await user.save();
  const userWithoutSensitiveData = updatedUser.toObject();
  delete userWithoutSensitiveData.password;
  delete userWithoutSensitiveData.refreshToken;

  return res.status(200).json(userWithoutSensitiveData);
});

export { registerUser, loginUser, getUserProfile, updateUserProfile };
