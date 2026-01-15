import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setStoryData } from '../redux/storySlice'
import Storyshow from '../components/Storyshow'

const Story = () => {
    const { storyData } = useSelector(state => state.story)
    const { userName } = useParams()
    
    const dispatch = useDispatch()
    const navigate = useNavigate()
    console.log("param userName =", userName)
    console.log("storyData redux =", storyData)

    const handleStory = async () => {
        //dispatch(storyData(""))
        try {
            const result = await axios.get(`${ServerUrl}/api/story/getByUserName/${userName}`, { withCredentials: true })
            dispatch(setStoryData(result.data[0]))

        } catch (error) {
            console.log(error);

        }
    }

    useEffect(() => {
        if (userName) {
            handleStory()
        }
    }, [userName])
    return (
        <div className='w-full h-[100vh] bg-black flex justify-center items-center'>
              {storyData ? (
                <Storyshow storyData={storyData} />
            ) : (
               <div>
                {navigate("/upload")}
               </div>
            )}

        </div>
    )
}

export default Story