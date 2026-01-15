import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'


import { setLoopData } from '../redux/loopSlice'

const useAllLoop = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)


    useEffect(() => {
        const fetchgetAllLoop = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/loop/getAll`, { withCredentials: true })
                dispatch(setLoopData(result.data))
            } catch (error) {
                console.log(error);

            }
        }
        fetchgetAllLoop()

    }, [dispatch , userData])
}

export default useAllLoop 