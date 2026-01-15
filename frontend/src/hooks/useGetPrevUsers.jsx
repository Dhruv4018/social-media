import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'


import { setPrevChatUsers } from '../redux/messageSlice'

const useGetPrevUsers = () => {
    const dispatch = useDispatch()
    const { messages } = useSelector(state => state.message)


    useEffect(() => {
        const fetchprevchat = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/message/prevChats`, { withCredentials: true })
                dispatch(setPrevChatUsers(result.data))
                 console.log(result.data);

            } catch (error) {
                console.log(error);

            }
        }
        fetchprevchat()

    }, [messages])
}

export default useGetPrevUsers