import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()
const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, 
  auth: {
    user: "dhruvjain78791999@gmail.com",
    pass: "rtsd bqgb fuun wbyu",
  },
});

const sendMail = async(to ,otp)=>{
   await transporter.sendMail({
        from:"dhruvjain78791999@gmail.com",
        to,
        subject:"Reset Your Password",
       html: `<p>Your OTP for password reset is <b>${otp}</b>. It expires in 5 minutes.</p>`



    })
}

export default sendMail