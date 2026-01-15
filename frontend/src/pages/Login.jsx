import React from 'react'
import { useState } from 'react'
import { IoIosEye, IoIosEyeOff } from "react-icons/io"
import axios from "axios"
import { ServerUrl } from '../App'
import { ClipLoader } from "react-spinners"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserData } from '../redux/userSlice'
import logo from "../assets/logosocial.png"
const Login = () => {
    const [inputClicked, setInputClicked] = useState({

        userName: false,

        password: false
    })
    const [showpassword, setShowPassord] = useState(false)


    const [userName, setUserName] = useState("")

    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [err , setERR] = useState("")
    const dispatch = useDispatch()
    const handleSignUp = async () => {
        setLoading(true)


        try {
            const result = await axios.post(`${ServerUrl}/api/auth/login`, { userName, password }, { withCredentials: true })
            dispatch(setUserData(result.data))
            setERR(" ")
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
                <div className='md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[5px] shadow-2xl shadow-black overflow-hidden'>
                    <img src={logo} alt="" className='w-[70%]' />
                    <p>Not Just A Platform , It's A Social Connect</p>
                </div>
                <div className='w-full lg:w-[50%] h-full bg-white flex flex-col items-center p-[10px] gap-[20px] justify-center items-center'>
                    <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[40px]">
                        <span>Sign In to</span>
                       
                    </div>

                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, userName: true })}>
                        <label htmlFor="userName" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.userName ? "top-[-16px]" : ""}`}>Enter Your UserName</label>
                        <input type="text" id="userName" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setUserName(e.target.value)} value={userName} />

                    </div>

                    <div className='relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl  border-2 border-black ' onClick={() => setInputClicked({ ...inputClicked, password: true })}>
                        <label htmlFor="password" className={`text-gray-700 absolute left-[20px] p-[5px] bg-white text-[15px]  ${inputClicked.password ? "top-[-16px]" : ""}`}>Enter Your Password</label>
                        <input type={showpassword ? "text" : "password"} id="password" className='w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0 ' required onChange={(e) => setPassword(e.target.value)} value={password} />
                        {!showpassword ? <IoIosEye className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassord(true)} /> : <IoIosEyeOff className='absolute cursor-pointer right-[20px] w-[25px] h-[25px]' onClick={() => setShowPassord(false)} />}


                    </div>
                     {err&&<p className='text-red-500 text-center'>{err}</p>}
                    <div className='w-[90%] px-[20px] cursor-pointer' onClick={()=>navigate("/forgot-password")}>Forgot Password</div>
                    <button className='w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]' onClick={handleSignUp} disable={loading}>{loading ? <ClipLoader size={30} color="white" /> : "Sign Up"}</button>
                    <p className='cursor-pointer text-gray-800' onClick={() => navigate("/signup")}>Already Have an account ? <span className='border-b-2 border-b-black pb-[3px] text-black'>Sign UP</span> </p>
                </div>


            </div>

        </div>
    )
}

export default Login