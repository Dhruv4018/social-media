import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Port 465 ke liye hamesha true
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // Wahi 16-digit App Password
  },
  tls: {
    // Ye line Google ke "Website not available" block ko bypass karne mein madad karti hai
    rejectUnauthorized: false,
    minVersion: "TLSv1.2"
  }
});

const sendMail = async(to ,otp)=>{
   await transporter.sendMail({
        from:process.env.EMAIL,
        to,
        subject:"Reset Your Password",
       html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`



    })
}

export default sendMail

