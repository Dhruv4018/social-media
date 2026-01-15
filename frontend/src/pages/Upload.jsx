import React, { useRef, useState } from 'react'
import { FiPlusSquare } from 'react-icons/fi'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import VideoPlayer from './VideoPlayer'
import { ServerUrl } from "../App"
import axios from "axios"
import { ClipLoader } from 'react-spinners'
import { useDispatch, useSelector } from 'react-redux'
import { setPostData } from '../redux/postSlice'
import { setCurrentUserStory, setStoryData } from '../redux/storySlice'
import { setLoopData } from '../redux/loopSlice'
import { setUserData } from '../redux/userSlice'

const Upload = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [uploadType, setUploadType] = useState("post")
    const inputmedia = useRef()
    const [caption, setCaption] = useState("")
    const [frontendMedia, setFrontendMedia] = useState(null)
    const [backendMedia, setBackendMedia] = useState(null)
    const [mediaType, setMediaType] = useState("")
    const [loading, setLoading] = useState(false)
    const { postData } = useSelector(state => state.post)
    const { storyData } = useSelector(state => state.story)
    const { loopData } = useSelector(state => state.loop)
    const handleMedia = (e) => {
        const file = e.target.files[0]
        if (file.type.includes("image")) {
            setMediaType("image")
        } else {
            setMediaType("video")
        }

        setBackendMedia(file)
        setFrontendMedia(URL.createObjectURL(file))
    }

    const uploadPost = async () => {
        setLoading(true)
        try {
            const formData = new FormData
            formData.append("caption", caption)
            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${ServerUrl}/api/post/upload`, formData, { withCredentials: true })

            dispatch(setPostData([...postData, result.data]))


            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }

    const uploadStory = async () => {
        setLoading(true)
        try {
            const formData = new FormData

            formData.append("mediaType", mediaType)
            formData.append("media", backendMedia)
            const result = await axios.post(`${ServerUrl}/api/story/upload`, formData, { withCredentials: true })
            //setUserData((prev)=>({...prev,story:result.data}))
            dispatch(setCurrentUserStory(result?.data))

            //dispatch(setStoryData([...storyData, result.data]))

            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setLoading(false)

        }

    }
    const uploadLoop = async () => {
        setLoading(true)
        try {
            const formData = new FormData
            formData.append("caption", caption)

            formData.append("media", backendMedia)
            const result = await axios.post(`${ServerUrl}/api/loop/upload`, formData, { withCredentials: true })

            dispatch(setLoopData([...loopData, result.data]))

            setLoading(false)
            navigate("/")
        } catch (error) {
            console.log(error);
            setLoading(false)

        }





    }

    const handleUpload = () => {
        if (uploadType == "post") {
            uploadPost()
        } else if (uploadType == "story") {
            uploadStory()
        } else {
            uploadLoop()
        }
    }


    return (
        <div className='w-full h-[100vh] bg-black flex flex-col items-center'>

            <input type="file" accept={uploadType == "loop" ? "video/*" : ""} ref={inputmedia} hidden onChange={handleMedia} />
            <div



                className='w-full h-[80px] flex items-center gap-[20px] px-[20px]'>
                <MdOutlineKeyboardBackspace className="text-2xl text-white cursor-pointer" onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Upload media</h1>
            </div>

            <div className='w-[90%] max-w-[600px] h-[80px] bg-[white] rounded-full flex justify-around items-center gap-[10px]' >
                <div className={` ${uploadType == "post" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] cursor-pointer font-semibold hover:bg-black rounded-full hover:text-white hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("post")}>Post</div>

                <div className={` ${uploadType == "story" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] cursor-pointer font-semibold hover:bg-black rounded-full hover:text-white hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("story")}>Story</div>

                <div className={` ${uploadType == "loop" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] cursor-pointer font-semibold hover:bg-black rounded-full hover:text-white hover:shadow-2xl hover:shadow-black`} onClick={() => setUploadType("loop")}>Loop</div>
            </div>


            {!frontendMedia && <div className='w-[80%] text-white max-w-[500px] h-[250px] bg-[#0e1316] border-gray-800 border-2 flex flex-col items-center justify-center gap-[8px] mt-[15vh] rounded-2xl cursor-pointer hover:bg-[#353a3d]' onClick={() => inputmedia.current.click()}>
                <FiPlusSquare className='text-white h-[25px] w-[25px] cursor-pointer' />
                <div className='text-white text-[19px] font-semibold'>
                    Upload {uploadType}
                </div>

            </div>}

            {frontendMedia &&
                <div className="w-[80%] max-w-[500px] mt-8 flex flex-col items-center gap-4 text-white">

                    {mediaType == "image" && <div><img
                        src={frontendMedia}
                        className="w-full max-h-[320px] object-contain rounded-2xl"
                    />


                        {uploadType != "story" && <input type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-[5px] text-white mt-[20px]' placeholder='Write Caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                    </div>}

                    {mediaType == "video" && <div>
                        <VideoPlayer media={frontendMedia} />
                        {uploadType != "story" && <input type="text" className='w-full border-b-gray-400 border-b-2 outline-none px-[5px] text-white mt-[15px]' placeholder='Write Caption' onChange={(e) => setCaption(e.target.value)} value={caption} />}
                    </div>}


                </div>}



            {frontendMedia && (
                <button className="mt-6 px-4 w-[60%] max-w-[400px] h-[50px] bg-white rounded-2xl font-semibold cursor-pointer" disabled={loading} onClick={handleUpload}>
                    {loading ? <ClipLoader /> : ` Upload ${uploadType}`}
                </button>
            )}

        </div>


    )
}

export default Upload