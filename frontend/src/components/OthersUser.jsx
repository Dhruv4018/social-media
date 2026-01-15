import React from 'react'
import { useSelector } from 'react-redux'
import {useNavigate} from "react-router-dom"

import dp from "../assets/empty.webp"
import FollowButton from './FollowButton'
const OthersUser = ({user}) => {
    const navigate = useNavigate()
    
    return (
        <div className='w-full h-[80px] flex items-center justify-between norder-b-2 border-gray-800'>
            <div className='flex items-center gap-[10px]'>
                <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden' onClick={()=>navigate(`/profile/${user.userName}`)}>
                    <img src={user.profileImage || dp} alt="" className="w-full object-cover h-full" />
                </div>
                <div>
                    <div className='text-white text-[18px] font-semibold'>{user.userName}</div>
                    <div className='text-white text-[18px] font-semibold'>{user.name}</div>
                </div>
            </div>
            
            <FollowButton tailwind={'px-[10px] w-[100px] py-[5px] h-[40px] bg-[white] rounded-2xl cursor-pointer'} targetUserId={user._id}/>
           
        </div>
    )
}

export default OthersUser