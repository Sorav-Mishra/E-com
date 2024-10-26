import jwt from "jsonwebtoken";

export const generateAccessAndRefreshTokens = (userId) => {
  try {
    const accessToken = jwt.sign(
      { _id: userId },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRE }
    );

    const refreshToken = jwt.sign(
      { _id: userId },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRE }
    );

    return { accessToken, refreshToken };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Token generation failed");
  }
};
