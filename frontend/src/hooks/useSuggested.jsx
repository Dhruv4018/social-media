import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setUserData, setUserSuggested } from '../redux/userSlice'

const useSuggested = () => {
    const dispatch = useDispatch()
    const {userData} = useSelector(state=>state.user)


    useEffect(() => {
        const fetchsuggested = async () => {
            try {
                const result = await axios.get(`${ServerUrl}/api/user/suggested`, { withCredentials: true })
                dispatch(setUserSuggested(result.data))
            } catch (error) {
                console.log(error);

            }
        }
        fetchsuggested()

    }, [userData])
}

export default useSuggested