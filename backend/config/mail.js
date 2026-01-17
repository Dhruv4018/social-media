import { Resend } from "resend"
import dotenv from "dotenv"

dotenv.config()

const resend = new Resend(process.env.RESEND_API_KEY)

const sendMail = async (to, otp) => {
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject: "Reset Your Password",
      html: `
        <p>Your OTP for password reset is:</p>
        <h2>${otp}</h2>
        <p>This OTP will expire in 5 minutes.</p>
      `,
    })

    console.log("✅ OTP email sent via Resend")
  } catch (error) {
    console.error("❌ Email send failed:", error)
    throw error
  }
}

export default sendMail
