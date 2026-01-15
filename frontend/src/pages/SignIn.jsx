import React from 'react'
import { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import logo from "../assets/logosocial.png"
import axios from "axios"
import { ServerUrl } from '../App'
import { ClipLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux"
import { setUserData } from '../redux/userSlice'
const SignIn = () => {
    const [inputClicked, setInputClicked] = useState({
        name: false,
        userName: false,
        email: false,
        password: false
    })
    const [showpassword, setShowPassord] = useState(false)

    const [name, setName] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [err, setERR] = useState("")
    const dispatch = useDispatch()

    const handleSignUp = async () => {
        setLoading(true)

        try {
            const result = await axios.post(`${ServerUrl}/api/auth/signup`, { name, userName, email, password }, { withCredentials: true })
            console.log(result);
            setERR(" ")
             dispatch(setUserData(result.data))
            setLoading(false)

        } catch (error) {
            setERR(error.response?.data?.message)
            console.log(error);
            setLoading(false)

        }
    }

    return (
        <div className='w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center'>
            <div className='w-[90%] lg:max-w-[60%] h-[600px] bg-white rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]'>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px]'>
                    <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
                        <span>Sign up to</span>
                        <img src="" alt="" />
                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[30px] border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, name: true })}>
                        <label htmlFor="name" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.name ? "top-[-16px]" : ""}`}>Enter Your Name</label>
                        <input type="text" id="name" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setName(e.target.value)} value={name} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label htmlFor="userName" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.userName ? "top-[-16px]" : ""}`}>Enter Your UserName</label>
                        <input type="text" id="userName" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setUserName(e.target.value)} value={userName} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, email: true })}>
                        <label htmlFor="email" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.email ? "top-[-16px]" : ""}`}>Enter Your email</label>
                        <input type="text" id="email" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setEmail(e.target.value)} value={email} />

                    </div>
                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.password ? "top-[-16px]" : ""}`}>Enter Your Password</label>
                        <input type={showpassword ? "text" : "password"} id="password" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!showpassword ? <IoIosEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassord(true)} /> : <IoIosEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassord(false)} />}


                    </div>
                    {err && <p className='text-red-500 text-center'>{err}*</p>}
                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignUp} disable={loading}>{loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}</button>
                    <p className='cursor-pointer text-gray-800' onClick={() => navigate("/login")}>Already Have an account ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign In</span> </p>
                </div>

                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black'>
                    <img src={logo} alt="" className='w-[70%]' />
                    <p>Not Just A Platform , It's A Social Connect</p>
                </div>
            </div>

        </div>
    )
}

export default SignIn