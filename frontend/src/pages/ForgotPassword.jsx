import React, { useState } from 'react'
import { ClipLoader } from 'react-spinners'
import axios from "axios"
import { IoIosArrowRoundBack } from 'react-icons/io'
import { ServerUrl } from '../App'
import { useNavigate } from 'react-router-dom'
const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [otp, setOTP] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmPassword: false
  })

  const handlesendOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${ServerUrl}/api/auth/sendotp`, { email }, { withCredentials: true })
      setLoading(false)
      console.log(result.data);
      setStep(2)

    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }
  const handleOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${ServerUrl}/api/auth/verifyotp`, { email, otp }, { withCredentials: true })
      setLoading(false)
      console.log(result.data);
      setStep(3)
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }

  const handleresetPassword = async () => {
    if (newPassword !== confirmPassword) {
      return console.log("Password doesnot match");
    }
    setLoading(true)

    try {

      const result = await axios.post(`${ServerUrl}/api/auth/resetpassword`, { email, password: newPassword }, { withCredentials: true })
      setLoading(false)
      console.log(result.data);
      navigate("/login")
    } catch (error) {
      console.log(error);
      setLoading(false)

    }
  }

  return (
    <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>

      {/* STEP 1 */}
      {step === 1 && (

        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center'>

          <IoIosArrowRoundBack onClick={() => navigate("/login")} className='w-[35px] h-[35px] cursor-pointer' />
          <h2 className='text-[30px] font-semibold'>Forgot Password</h2>

          <div
            className='relative flex items-center mt-[30px] w-[90%] h-[50px] rounded-2xl border-2 border-black'
            onClick={() => setInputClicked({ ...inputClicked, email: true })}

          >
            <label
              className={`absolute left-[20px] p-[5px] bg-white text-[15px] text-gray-700 transition-all
                ${inputClicked.email || email ? "top-[-16px]" : "top-[12px]"}
              `}
            >
              Enter Your Email
            </label>

            <input
              type="text"
              className='w-full h-full rounded-2xl px-[20px] outline-none'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <button
            className='w-[70%] h-[50px] bg-black text-white font-semibold rounded-2xl mt-[30px]'
            disabled={loading}
            onClick={handlesendOtp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Send OTP"}
          </button>
        </div>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center'>
          <h2 className='text-[30px] font-semibold'>OTP</h2>

          <div
            className='relative flex items-center mt-[30px] w-[90%] h-[50px] rounded-2xl border-2 border-black'
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}
          >
            <label
              className={`absolute left-[20px] p-[5px] bg-white text-[15px] text-gray-700 transition-all
                ${inputClicked.otp || otp ? "top-[-16px]" : "top-[12px]"}
              `}
            >
              Enter OTP
            </label>

            <input
              type="text"
              className='w-full h-full rounded-2xl px-[20px] outline-none'
              onChange={(e) => setOTP(e.target.value)}
              value={otp}
            />
          </div>

          <button
            className='w-[70%] h-[50px] bg-black text-white font-semibold rounded-2xl mt-[30px]'
            disabled={loading}
            onClick={handleOtp}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Submit"}
          </button>
        </div>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <div className='w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex flex-col justify-center items-center'>
          <h2 className='text-[30px] font-semibold'>Reset Password</h2>

          {/* New Password */}
          <div
            className='relative flex items-center mt-[30px] w-[90%] h-[50px] rounded-2xl border-2 border-black'
            onClick={() => setInputClicked({ ...inputClicked, newPassword: true })}
          >
            <label
              className={`absolute left-[20px] p-[5px] bg-white text-[15px] text-gray-700 transition-all
                ${inputClicked.newPassword || newPassword ? "top-[-16px]" : "top-[12px]"}
              `}
            >
              Enter New Password
            </label>

            <input
              type="password"
              className='w-full h-full rounded-2xl px-[20px] outline-none'
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          {/* Confirm Password */}
          <div
            className='relative flex items-center mt-[30px] w-[90%] h-[50px] rounded-2xl border-2 border-black'
            onClick={() => setInputClicked({ ...inputClicked, confirmPassword: true })}
          >
            <label
              className={`absolute left-[20px] p-[5px] bg-white text-[15px] text-gray-700 transition-all
                ${inputClicked.confirmPassword || confirmPassword ? "top-[-16px]" : "top-[12px]"}
              `}
            >
              Confirm Password
            </label>

            <input
              type="password"
              className='w-full h-full rounded-2xl px-[20px] outline-none'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            className='w-[70%] h-[50px] bg-black text-white font-semibold rounded-2xl mt-[30px]'
            disabled={loading}
            onClick={handleresetPassword}
          >
            {loading ? <ClipLoader size={30} color="white" /> : "Reset Password"}
          </button>
        </div>
      )}

    </div>
  )
}

export default ForgotPassword
