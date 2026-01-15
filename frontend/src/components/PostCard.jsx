import React, { useEffect, useState } from 'react'
import dp from "../assets/empty.webp"
import VideoPlayer from '../pages/VideoPlayer'
import { GoBookmarkFill, GoHeart, GoHeartFill } from "react-icons/go"
import { MdOutlineBookmarkBorder, MdOutlineComment } from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"
import { IoSendSharp } from "react-icons/io5"
import axios from "axios"
import { ServerUrl } from "../App"
import { setPostData } from '../redux/postSlice'
import { setUserData } from '../redux/userSlice'
import FollowButton from './FollowButton'
import { useNavigate } from 'react-router-dom'

const PostCard = ({ post }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { userData } = useSelector(state => state.user)
    const { postData } = useSelector(state => state.post)
    const { socket } = useSelector(state => state.socket)
    const [showComment, setComment] = useState(false)
    const [message, setMessage] = useState("")

    const handleLike = async () => {
        try {
            const result = await axios.get(`${ServerUrl}/api/post/like/${post._id}`, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)

        }
    }

    const handleComment = async () => {
        try {
            const result = await axios.post(`${ServerUrl}/api/post/comment/${post._id}`, { message }, { withCredentials: true })
            const updatedPost = result.data
            const updatedPosts = postData.map(p => p._id == post._id ? updatedPost : p)
            dispatch(setPostData(updatedPosts))
        } catch (error) {
            console.log(error)

        }
    }

    const handleSaved = async () => {
        try {
            const result = await axios.get(`${ServerUrl}/api/post/saved/${post._id}`, { withCredentials: true })

            dispatch(setUserData(result.data))
        } catch (error) {
            console.log(error)

        }
    }

    useEffect(() => {
        socket?.on("likedPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, likes: updatedData.likes } : p)
            dispatch(setPostData(updatedPosts))
        })
        socket?.on("CommentPost", (updatedData) => {
            const updatedPosts = postData.map(p => p._id == updatedData.postId ? { ...p, comments: updatedData.comments } : p)
            dispatch(setPostData(updatedPosts))
        })

        return ()=>{socket?.off("likedPost")
            socket?.off("CommentPost")
        }
    } , [socket ,postData , dispatch])

    return (
        <div className='w-[90%] flex flex-col gap-[10px] pb-[20px]
        bg-white items-center 
        
        shadow-2xl shadow-[#00000058] 
        rounded-2xl'>

            {/* Header */}
            <div className='w-full h-[80px] flex justify-between items-center px-3'>
                <div className='flex items-center gap-3 md:gap-5' onClick={() => navigate(`/profile/${post.author?.userName}`)}>
                    <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] 
                    border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                        <img
                            src={post?.author?.profileImage || dp}
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className='w-[150px] font-semibold truncate'>
                        {post?.author?.userName}
                    </div>
                </div>

                {userData?._id != post?.author?._id && <FollowButton tailwind={'px-3 md:px-5 py-1.5 md:py-2  bg-black text-white rounded-2xl text-sm md:text-base cursor-pointer'} targetUserId={post?.author?._id} />}

            </div>

            {/* Media */}
            <div className="w-full px-3 pb-4 flex items-center justify-center">
                {post?.mediaType === "image" && (
                    <img
                        src={post?.media}
                        className="w-[80%] max-h-[350px] object-contain rounded-xl"
                    />
                )}

                {post?.mediaType === "video" && (
                    <div className='w-[80%] rounded-xl overflow-hidden flex flex-col items-center justify-center '>
                        <VideoPlayer media={post?.media} />
                    </div>
                )}
            </div>


            <div className='w-full h-[60px] flex justify-between items-center px-[20px] mt-[10px]'>
                <div className='flex justify-center items-center gap-[10px]'>
                    <div className='flex justify-center items-center gap-[5px]'>
                        {!post?.likes.includes(userData?._id) && <GoHeart className='w-[25px] h-[25px] cursor-pointer text-black' onClick={handleLike} />}
                        {post?.likes.includes(userData?._id) && <GoHeartFill className='w-[25px] h-[25px] text-red-600  cursor-pointer' onClick={handleLike} />}
                        <span className='text-black'>{post?.likes.length}</span>
                    </div>
                    <div className='flex justify-center items-center gap-[5px]'>
                        <MdOutlineComment className='w-[25px] h-[25px] cursor-pointer text-black ' onClick={() => setComment(prev => !prev)} />
                        <span className='text-black'>{post?.comments?.length}</span>
                    </div>
                </div>
                <div >
                    {!userData?.saved?.includes(post?._id) && <MdOutlineBookmarkBorder className='w-[25px] h-[25px] cursor-pointer text-black' onClick={handleSaved} />}
                    {userData?.saved?.includes(post?._id) && <GoBookmarkFill className='w-[25px] h-[25px] cursor-pointer  text-black' onClick={handleSaved} />}
                </div>
            </div>

            {post?.caption && <div className='w-full px-[20px] gap-[10px] flex justify-start items-center font-semibold'>
                <h1>{post?.author?.userName}</h1>
                <div>{post?.caption}</div>
            </div>}

            {showComment &&
                <div className='w-full flex flex-col gap-[30px] pb-[20px]'>
                    <div className='w-full h-[80px] flex items-center justify-between px-[20px] relative'>


                        <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] 
                    border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                            <img
                                src={post?.author?.profileImage || dp}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <input type="text" className='px-[10px] border-b-2 border-b-gray-500 w-[90%] outline-none h-[40px] text-black' placeholder='Write comment...' onChange={(e) => setMessage(e.target.value)} value={message} />
                        <button className='absolute right-[20px] cursor-pointer'> <IoSendSharp className='w-[25px] h-[25px]' onClick={handleComment} /></button>
                    </div>
                    <div className='w-full max-h-[300px] overflow-auto'>
                        {post.comments?.map((com, index) => (
                            <div key={index} className='w-full px-[20px] py-[20px] flex items-center gap-[20px] border-b-2 border-b-gray-200 text-black'>
                                <div className='w-[40px] h-[40px] md:w-[60px] md:h-[60px] 
                    border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                                    <img
                                        src={com?.author?.profileImage || dp}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>{com?.message}</div>
                            </div>
                        ))}


                    </div>
                </div>
            }

        </div>
    )
}

export default PostCard
