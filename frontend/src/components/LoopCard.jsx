import React, { useEffect, useRef, useState } from 'react'
import { FiVolume2, FiVolumeX } from 'react-icons/fi'
import dp from "../assets/empty.webp"
import FollowButton from './FollowButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { GoHeart, GoHeartFill } from 'react-icons/go'
import { MdOutlineComment } from 'react-icons/md'
import axios from 'axios'
import { ServerUrl } from '../App'
import { setLoopData } from '../redux/loopSlice'
import { IoSendSharp } from 'react-icons/io5'
const LoopCard = ({ loop }) => {
  const { socket } = useSelector(state => state.socket)
  const [message, setMessage] = useState("")
  const { loopData } = useSelector(state => state.loop)
  const dispatch = useDispatch()
  const [showComment, setShowComment] = useState(false)
  const videoRef = useRef()
  const [isPlaying, setIsPlaying] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [progress, setProgress] = useState(0)
  const navigate = useNavigate()
  const [showHeart, setShowHeart] = useState(false)
  const { userData } = useSelector(state => state.user)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {

        const video = videoRef.current
        if (!video) return

        if (entry.isIntersecting) {
          video.play()
          setIsPlaying(true)
        } else {
          video.pause()
          setIsPlaying(false)
        }
      },
      { threshold: 0.6 }
    )

    if (videoRef.current) observer.observe(videoRef.current)



    return () => {
      if (videoRef.current) observer.unobserve(videoRef.current)
    }
  }, [])

  const handleClick = () => {

    if (isPlaying) {
      videoRef.current.pause()
      setIsPlaying(false)
    } else {
      videoRef.current.play()
      setIsPlaying(true)
    }
  }

  const handleTimeUpdate = () => {
    const video = videoRef.current
    if (video) {
      const percent = (video.currentTime / video.duration) * 100
      setProgress(percent)
    }
  }


  const handleLike = async () => {
    try {
      const result = await axios.get(`${ServerUrl}/api/loop/like/${loop._id}`, { withCredentials: true })
      const updatedLoop = result.data
      const updatedLoops = loopData.map(p => p._id == loop._id ? updatedLoop : p)
      dispatch(setLoopData(updatedLoops))
    } catch (error) {
      console.log(error)

    }
  }

  const handlikeOnDoubleClick = async () => {
    setShowHeart(true)
    setTimeout(() => setShowHeart(false), 500)
    { !loop.likes.includes(userData._id) ? handleLike() : null }
  }


  const commentRef = useRef()


  useEffect(() => {
    const handleOutsideClick = () => {
      setShowComment(false)
    }

    if (showComment) {
      document.addEventListener("click", handleOutsideClick)
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick)
    }
  }, [showComment])

  const handleComment = async () => {
  try {
    await axios.post(
      `${ServerUrl}/api/loop/comment/${loop._id}`,
      { message },
      { withCredentials: true }
    )
    setMessage("")
  } catch (error) {
    console.log(error)
  }
}


  useEffect(() => {
  socket?.on("likedLoop", (updatedData) => {
    const updatedloops = loopData.map(p =>
      p._id == updatedData.loopId ? { ...p, likes: updatedData.likes } : p
    )
    dispatch(setLoopData(updatedloops))
  })

  socket?.on("CommentLoop", (updatedData) => {
    const updatedloops = loopData.map(p =>
      p._id == updatedData.loopId ? { ...p, comments: updatedData.comments } : p
    )
    dispatch(setLoopData(updatedloops))
  })

  return () => {
    socket?.off("likedLoop")
    socket?.off("CommentLoop")
  }
}, [socket, dispatch])   


  return (
    <div className='w-full lg:w-[480px] h-[100vh] flex items-center justify-center border-l-2 border-r-2 border-gray-800 relative overflow-hidden'>
      {showHeart && <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 heart-animation z-50'>
        <GoHeartFill className='text-white w-[100px] h-[100px] drop-shadow-2xl' />
      </div>}

      <div
        ref={commentRef}
        onClick={(e) => e.stopPropagation()}
        className={`absolute z-[200] bottom-0 w-full h-[500px] p-[10px] rounded-t-4xl 
  bg-[#0e1718] transition-transform duration-500 shadow-2xl shadow-black 
  ease-in-left left-0 ${showComment ? "translate-y-0" : "translate-y-[100%]"}`}
      >
        <h1 className='text-white text-[20px] text-center font-semibold'>
          Comments
        </h1>

        <div className='w-full h-[350px] overflow-y-auto flex flex-col gap-[20px]'>
          {loop.comments.length == 0 && <div className='text-center text-white text-[20px] font-semibold mt-[50px]'>No Comments Yet</div>}
          {loop.comments.map((com, index) => (
            <div key={index} className='w-full  flex text-white flex-col gap-[5px] border-b-[1px] border-gray-800 justify-center pb-[10px] mt-[10px]'>
              <div className='flex justify-start gap-3 md:gap-5'>
                <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                                    border-2 border-black rounded-full overflow-hidden cursor-pointer '>
                  <img
                    src={com?.author?.profileImage || dp}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className='w-[150px] font-semibold truncate'>
                  {com?.author?.userName}
                </div>

              </div>
              <div className='pl-[60px]'>
                {com.message}
              </div>
            </div>
          ))}

        </div>


        <div>
          <div className='w-full fixed bottom-0 h-[80px] flex items-center justify-between px-[10px] py-[20px] '>


            <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                              border-2 border-black rounded-full overflow-hidden cursor-pointer '>
              <img
                src={loop?.author?.profileImage || dp}
                className="w-full h-full object-cover shrink-0"
              />
            </div>
            <input type="text" className='px-[10px] border-b-2 border-b-gray-500 text-white w-[90%] outline-none h-[40px] text-black' placeholder='Write comment...' onChange={(e) => setMessage(e.target.value)} value={message} />

            {message && <button className='absolute right-[20px] cursor-pointer text-white'> <IoSendSharp className='w-[25px] h-[25px]' onClick={handleComment} /></button>}

          </div>
        </div>
      </div>



      <video ref={videoRef} autoPlay  muted={isMuted}  loop src={loop?.media} className='w-full object-cover h-full' onClick={handleClick} onTimeUpdate={handleTimeUpdate} onDoubleClick={handlikeOnDoubleClick} />
      <div className='absolute top-[20px] right-[20px] z-[100] cursor-pointer' onClick={() => setIsMuted(prev => !prev)}>
        {!isMuted ? (
          <FiVolume2 className="w-5 h-5 text-white cursor-pointer" />
        ) : (
          <FiVolumeX className="w-5 h-5 text-white cursor-pointer" />
        )}
      </div>
      <div className='absolute bottom-0  w-full h-[5px] bg-white/30'>
        <div className='h-full bg-red-600 w-[40%] transition-all duration-200 ease-linear' style={{ width: `${progress}%` }}></div>
      </div>

      <div className='w-full absolute h-[100px] bottom-[10px] p-[10px] flex flex-col'>
        <div className='flex items-center gap-[5px] '>
          <div className='w-[30px] h-[30px] md:w-[40px] md:h-[40px] 
                          border-2 border-black rounded-full overflow-hidden cursor-pointer 'onClick={() => navigate(`/profile/${userData.userName}`)}>
            <img
              src={loop?.author?.profileImage || dp}
              className="w-full h-full object-cover"
            />
          </div>

          <div className='w-[110px] font-extrabold truncate text-white '>
            {loop?.author?.userName}
          </div>
          <FollowButton targetUserId={loop.author?._id} tailwind={"px-[10px] py-[5px] text-white border-2 border-white rounded-2xl text-[14px] font-extrabold"} />
        </div>

        <div className='text-white gap-[10px] px-[10px]'>
          {loop.caption}
        </div>

        <div className='absolute right-0 flex flex-col gap-[20px]  text-white bottom-[190px] justify-center px-[10px] '>
          <div className='flex flex-col items-center cursor-pointer'>
            <div onClick={handleLike}>
              {!loop?.likes.includes(userData?._id) && <GoHeart className='w-[25px] h-[25px] cursor-pointer text-white font-extrabold' />}
              {loop?.likes.includes(userData?._id) && <GoHeartFill className='w-[25px] h-[25px] text-red-600  cursor-pointer' />}

            </div>
            <div>{loop?.likes.length}</div>
          </div>
          <div>
            <div
              className='flex flex-col items-center cursor-pointer'
              onClick={(e) => {
                e.stopPropagation()
                setShowComment(true)
              }}
            >
              <MdOutlineComment className='w-[25px] h-[25px] text-white' />
            </div>

            <div>
              {loop.comments.length}
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}

export default LoopCard