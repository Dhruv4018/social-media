import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'

import { setPostData } from '../redux/postSlice'

const useAllPost = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)


    useEffect(() => {
        const fetchgetAllPost = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/post/getAll`, { withCredentials: true })
                dispatch(setPostData(result.data))
            } catch (error) {
                console.log(error);

            }
        }
        fetchgetAllPost()

    }, [dispatch , userData])
}

export default useAllPost