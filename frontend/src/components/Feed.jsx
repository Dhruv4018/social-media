import React from 'react'
import { FaRegHeart } from 'react-icons/fa6'
import StoryCard from './StoryCard'
import Nav from './Nav'
import { useSelector } from 'react-redux'
import PostCard from './PostCard'
import VideoPlayer from '../pages/VideoPlayer'
import LoopCard from './LoopCard'
import { BiMessageAltDetail } from "react-icons/bi"
import { useNavigate } from 'react-router-dom'

const Feed = () => {
    const { notificationData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    const { userData } = useSelector(state => state.user)
    const { storyList, currentUserStory } = useSelector(state => state.story)
    const navigate = useNavigate()

    return (
        <div className='lg:w-[50%] w-full bg-black min-h-[100vh] lg:h-[100vh] relative lg:overflow-y-auto'>
            <div className='w-full h-[100px] flex items-center justify-between p-[20px] lg:hidden'>
                <img src="" className='w-[80px]' />
                <div className='flex items-center gap-[10px]'>
                    <div className="relative cursor-pointer" onClick={()=>navigate("/notification")}>

                        <FaRegHeart className='w-[25px] h-[25px] text-white' />
                        {(notificationData && notificationData.some((noti) => noti.isRead === false)) && (<div className="w-[10px] h-[10px] bg-blue-600 rounded-full absolute top-0 right-[-5px]">

                        </div>)}


                    </div>
                    <BiMessageAltDetail className='w-[25px] h-[25px] text-white cursor-pointer' onClick={() => navigate("/messages")} />

                </div>
            </div>
            <div className="flex w-full overflow-auto gap-[10px] p-[20px]">

                <StoryCard userName={"Your Story"} profileImage={userData.profileImage} story={currentUserStory} />
                {storyList?.map((story, index) => (
                    <StoryCard userName={story?.author?.userName} profileImage={story?.author?.profileImage} story={story} key={index} />

                ))}

            </div>

            <div className='w-full min-h-[100vh] flex flex-col items-center gap-[20px] p-[10px] pt-[40px] bg-white rounded-t-[60px] relative pb-[120px]'>
                <Nav />

                {postData?.map((post, index) => (
                    <PostCard post={post} key={index} />
                ))}

            </div>
        </div>
    )
}

export default Feed