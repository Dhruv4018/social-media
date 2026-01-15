import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'

import { setStoryList } from '../redux/storySlice'

const useStory = () => {
    const dispatch = useDispatch()
    const { UserData } = useSelector(state => state.user)
    const { storyData } = useSelector(state => state.story)

    useEffect(() => {
        const fetchStory = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/story/getAll`, { withCredentials: true })
                dispatch(setStoryList(result.data))
                

            } catch (error) {
                console.log(error);

            }
        }
        fetchStory()

    }, [UserData , storyData])
}

export default useStory