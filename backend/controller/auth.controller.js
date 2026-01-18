import User from "../models/user.model.js"

import bcrypt from "bcryptjs"
import genToken from "../config/token.js"

import dotenv from 'dotenv';
import { sendEmail } from "../config/mail.js";
dotenv.config();
export const signUp = async (req, res) => {
    try {
        const { name, email, password, userName } = req.body
        let findByEmail = await User.findOne({ email })
        if (findByEmail) {
            return res.status(400).json({ message: "email already exist !" })
        }

        let findByUserName = await User.findOne({ userName })
        if (findByUserName) {
            return res.status(400).json({ message: "userName already exist !" })
        }


        if (password.length < 8) {
            return res.status(400).json({ message: "Enter strong password" })
        }

        let hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({
            name, email, userName, password: hashPassword
        })

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 20 * 365 * 24 * 60 * 60 * 1000


        })

        return res.status(201).json( user)


    } catch (error) {
        return res.status(500).json({ message: "signUp error", error })
        console.log(error);
    }
}

export const login = async (req, res) => {
    try {
        const { userName, password } = req.body
        let user = await User.findOne({ userName })
        if (!user) {
            return res.status(400).json({ message: "User doesnot exist" })
        }
        let isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "incorrect password" })
        }

        let token = await genToken(user._id)
        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
            maxAge: 20 * 365 * 24 * 60 * 60 * 1000


        })

        return res.status(201).json( user )


    } catch (error) {
        return res.status(500).json({ message: "signUp error" })
    }
}

export const logout = async (req, res) => {
    try {
        await res.clearCookie("token", {
          httpOnly: true,
           secure: true,
           sameSite: "None"
});

        return res.status(200).json({ message: "logout successfully" })
    } catch (error) {
        return res.status(500).json({ message: "Logot error" })
    }

}

export const sendOtp = async (req, res) => {
    try {
        const { email } = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User not found otp " })
        }

        const otp = Math.floor(1000 + Math.random() * 9000).toString()

        user.resetOtp = otp
        user.otpExpires =  Date.now() + 5 * 60 * 1000
        user.isOtpVerified = false
        await user.save()

       await sendEmail(email , otp)

       return res.status(200).json({message:"email successfully send otp "})

    } catch (error) {
    return res.status(500).json({ message: "sendotp error " })


    }
}

export const verifyOtp = async(req,res)=>{
    try {
        const {email , otp} = req.body
        const user = await User.findOne({email})
        if(!user || user.resetOtp !==otp || user.otpExpires< Date.now()){
            return res.status(400).json({message:"Invalid otp/ expired otp"})
        }

        user.isOtpVerified = true
        user.resetOtp = undefined
        user.otpExpires = undefined
        await user.save()
         return res.status(200).json({message:"otp verified"})
    } catch (error) {
         return res.status(400).json({message:"verified otp error"})
    }
}


export const resetPassword = async (req,res)=>{
    try {
        const {email , password } = req.body
        const user = await User.findOne({ email })
         if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "otp verification required " })

        }

        const hashedPassword = await bcrypt.hash(password , 10)
         user.password = hashedPassword
         user.isOtpVerified = false
         await user.save()

         return res.status(200).json({message:"password reset successfully"})
    } catch (error) {
        return res.status(400).json({message:"verified otp error"})
    }

}



