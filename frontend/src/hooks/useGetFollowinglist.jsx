import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setFollowing, setUserData } from '../redux/userSlice'
import { setCurrentUserStory } from '../redux/storySlice'

const useGetFollowingList = () => {
    const dispatch = useDispatch()
    const {storyData} = useSelector(state=>state.story)


    useEffect(() => {
        const fetchfollowing = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/user/followingList`, { withCredentials: true })
               
                dispatch(setFollowing(result.data))
                
            } catch (error) {
                console.log(error);

            }
        }
       fetchfollowing()

    }, [storyData])
}

export default useGetFollowingList