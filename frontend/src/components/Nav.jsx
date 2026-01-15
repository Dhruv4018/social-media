import React from 'react'
import { GoHomeFill } from "react-icons/go"
import { FiSearch, FiPlusSquare } from "react-icons/fi"
import { RxVideo } from "react-icons/rx"
import dp from "../assets/empty.webp"
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Nav = () => {
    const navigate = useNavigate()
   
    const {userData} = useSelector(state=>state.user)
    return (
        <div className='w-[90%] lg:w-[40%] h-[80px] bg-black flex justify-around items-center fixed bottom-[20px] rounded-full shadow-2xl shadow-[#000000] z-[100]'>
            <div><GoHomeFill  className='text-white h-[25px] w-[25px] cursor-pointer' onClick={()=>navigate("/")}/></div>
            <div onClick={()=>navigate("/search")}><FiSearch  className='text-white h-[25px] w-[25px] cursor-pointer'/></div>
            <div><FiPlusSquare  className='text-white h-[25px] w-[25px] cursor-pointer' onClick={()=>navigate("/upload")}/></div>
            <div onClick={()=>navigate("/loops")}><RxVideo className='text-white h-[28px] w-[28px] cursor-pointer' /></div>
            <div className='w-[42px] h-[42px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${userData.userName}`)}>
                <img src={userData.profileImage || dp} className="w-full object-cover h-full" />
            </div>
        </div>
    )
}

export default Nav