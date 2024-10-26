// import twilio from "twilio";
// import dotenv from "dotenv";
// dotenv.config();

// // Twilio configuration
// const client = twilio(
//   process.env.TWILIO_ACCOUNT_SID,
//   process.env.TWILIO_AUTH_TOKEN
// );

// const sendOtp = async (mobile) => {
//   try {
//     const otp = Math.floor(1000 + Math.random() * 9000); // Generate a 4-digit OTP

//     // Send OTP via Twilio
//     await client.messages.create({
//       body: `Your OTP is ${otp}`,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to: `+91${mobile}`,
//     });

//     // Return OTP to verify later (in practice, you should store this securely)
//     return otp;
//   } catch (error) {
//     console.error("Error sending OTP: ", error);
//     throw new Error("Failed to send OTP");
//   }
// };

// export default sendOtp;
