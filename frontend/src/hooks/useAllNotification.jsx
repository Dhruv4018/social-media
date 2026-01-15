import axios from 'axios'
import React, { useEffect } from 'react'
import { ServerUrl } from '../App'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationData } from '../redux/userSlice'

const useAllNotification = () => {
    const dispatch = useDispatch()
    const { userData } = useSelector(state => state.user)


  useEffect(()=>{
     const fetchgetAllNotifications = async () => {
        try {
            const result = await axios.get(`${ServerUrl}/api/user/getallNotifications`, { withCredentials: true })
            dispatch(setNotificationData(result.data))
        } catch (error) {
            console.log(error);

        }
    }
    fetchgetAllNotifications()

  }, [dispatch,userData])
   

}

export default useAllNotification