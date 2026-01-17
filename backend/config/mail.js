import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // ✅ must for production
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const sendMail = async (to, otp) => {
  try {
    await transporter.sendMail({
      from: `"OTP Service" <${process.env.EMAIL}>`,
      to,
      subject: "Your OTP Code",
      html: `<h2>Your OTP is ${otp}</h2>`,
    });

    console.log("✅ OTP email sent");
  } catch (error) {
    console.error("❌ Email error:", error.message);
  }
};

export default sendMail;
