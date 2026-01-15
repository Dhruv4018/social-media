import React, { useEffect, useState } from 'react'
import dp from "../assets/empty.webp"
import { useSelector } from 'react-redux'
import { FiPlusCircle } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ServerUrl } from '../App'

const StoryCard = ({ profileImage, userName, story }) => {
    const { userData } = useSelector(state => state.user)
    const navigate = useNavigate()
    const [viewed, setViewed] = useState(false)
    const hasStory = !!story && (Array.isArray(story) ? story.length > 0 : story._id)

    const handleViewers = async () => {
        try {
            if (!hasStory) return
            await axios.get(`${ServerUrl}/api/story/view/${story._id}`, { withCredentials: true })
        } catch (error) {
            console.log(error)
        }
    }

    const handleClick = () => {
        if (!story && userName === "Your Story") {
            navigate("/upload");
            return;
        }

        if (story) {
            // mark as viewed locally (author + others)
            localStorage.setItem(`story_viewed_${story._id}`, "true");

            handleViewers();

            if (userName === "Your Story") {
                navigate(`/story/${userData.userName}`);
            } else {
                navigate(`/story/${userName}`);
            }
        }
    };

    useEffect(() => {
        if (!story) return;

        const key = `story_viewed_${story._id}`;
        const isViewed = localStorage.getItem(key);

        setViewed(!!isViewed);
    }, [story]);


    return (
        <div className="flex flex-col w-[80px]" onClick={handleClick}>
            <div className={`w-[76px] h-[76px] rounded-full ${!hasStory
                    ? ""
                    : !viewed
                        ? "bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600"
                        : "bg-gradient-to-r from-gray-500 to-black-800"
                } p-[3px]`}>
                <div className="w-[70px] h-[70px] rounded-full border-black border-2 overflow-hidden cursor-pointer relative">
                    <img src={profileImage || dp} className="w-full h-full object-cover" />

                    {/* ✅ Plus icon */}
                    {!hasStory && userName == "Your Story" && (
                        <FiPlusCircle
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate("/upload");
                            }}
                            className="absolute bottom-[6px] right-[2px] w-[22px] h-[22px] bg-white text-black rounded-full z-[300] cursor-pointer"
                        />
                    )}
                </div>
            </div>
            <div className='text-[14px] text-center truncate w-full text-white'>{userName}</div>
        </div>
    )
}

export default StoryCard
