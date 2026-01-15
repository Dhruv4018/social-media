import React, { useEffect, useState } from 'react'
import dp from "../assets/empty.webp"
import { FaEye } from "react-icons/fa6"

import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from '../pages/VideoPlayer'
import { useSelector } from 'react-redux'

const Storyshow = ({ storyData }) => {


    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const [showviewers, setShowViewers] = useState(false)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        if (!storyData) return;

        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(interval)
                    navigate("/")
                    return 100;
                }
                return prev + 1
            })


        }, 150)
        return () => clearInterval(interval)
    },

        [navigate])

    return (
        <div className='w-full max-w-[500px] h-[100vh] border-x-2 border-gray-800 pt-[10px] relative flex flex-col justify-center'>

            <div className='flex items-center gap-[10px] absolute top-[30px] px-[10px]'>
                <MdOutlineKeyboardBackspace className="text-2xl text-white cursor-pointer" onClick={() => navigate(`/`)} />
                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                                  border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                    <img src={storyData?.author?.profileImage || dp}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className='w-[110px] font-extrabold truncate text-white '>
                    {storyData?.author?.userName}
                </div>
            </div>
            <div className='absolute top-[10px]  w-full h-[5px] bg-white/30'>
                <div className='h-full bg-white w-[40%] transition-all duration-200 ease-linear' style={{ width: `${progress}%` }}></div>
            </div>
            {!showviewers && <>
                <div className="w-[full] h-[90vh] flex items-center justify-center">
                    {storyData?.mediaType === "image" && (
                        <img
                            src={storyData?.media}
                            className="w-[80%] max-h-[350px] object-contain rounded-xl"
                        />
                    )}

                    {storyData?.mediaType === "video" && (
                        <div className='w-[80%] rounded-xl overflow-hidden flex flex-col items-center justify-center '>
                            <VideoPlayer media={storyData?.media} />
                        </div>
                    )}
                </div>


                <div>
                    {storyData?.author?.userName == userData?.userName &&
                        <div className='w-full flex items-center gap-[10px] absolute h-[70px] bottom-0 cursor-pointer p-2 left-0 text-white' onClick={()=>setShowViewers(true)}>
                            <div className='text-white flex items-center gap-[5px]'>
                                <FaEye />
                                {storyData.viewers?.length}
                            </div>
                            <div className='flex relative h-[40px] w-[64px]'>
                                {storyData?.viewers?.slice(0, 3).map((viewer, index) => {
                                    const viewerImage = viewer.profileImage || viewer.user?.profileImage || dp;

                                    return (
                                        <div
                                            key={viewer._id || index}
                                            className={`w-[30px] h-[30px] border border-white/20 rounded-full overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""
                                                }`}
                                        >
                                            <img src={viewerImage} className="w-full h-full object-cover" />
                                        </div>
                                    )
                                })}

                            </div>

                        </div>}
                </div>
            </>}

            {showviewers && <>
                <div className="w-full h-[30%] flex items-center justify-center mt-[100px] cursor-pointer overflow-hidden py-[30px]"onClick={()=>setShowViewers(false)} >
                    {storyData?.mediaType === "image" && <div className='h-[full] flex items-center justify-center'>
                        <img
                            src={storyData?.media}
                            className=" h-full object-cover rounded-2xl"
                        />
                    </div>

                    }

                    {storyData?.mediaType === "video" && (
                        <div className='h-full    flex flex-col items-center justify-center '>
                            <VideoPlayer media={storyData?.media} />
                        </div>


                    )}

                </div>

                <div className='w-full h-[70%] border-t-2 border-t-gray-800 p-[20px]'>
                    <div className='text-white flex items-center gap-[10px]'>
                        <FaEye />
                        <span>{storyData?.viewers?.length}</span>
                        <span>Viewers</span>
                    </div>
                    <div className='w-full max-h-full flex flex-col gap-[10px] overflow-auto pt-[20px]'>
                        {storyData?.viewers?.map((viewer, index) => (
                            <div key={index} className='w-full flex items-center gap-[20px]'>
                                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                                  border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                                    <img src={viewer?.profileImage || dp}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className='w-[110px] font-extrabold truncate text-white '>
                                    {viewer?.userName}
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
            </>}




        </div>
    )
}

export default Storyshow