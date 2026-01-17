import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,            // ✅ CHANGE THIS
  secure: false,        // ✅ CHANGE THIS
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
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

