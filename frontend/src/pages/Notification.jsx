import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import NotificationCard from '../components/NotificationCard'
import axios from "axios"
import { ServerUrl } from '../App'
import { setNotificationData } from '../redux/userSlice'

const Notification = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { notificationData } = useSelector(state => state.user)
    const ids = notificationData.map((n) => n._id)
    const marked = async () => {
        try {
            const result = await axios.post(`${ServerUrl}/api/user/markAsRead`, { notificationId: ids }, { withCredentials: true })
            await fetchgetAllNotifications()
        } catch (error) {
            console.log(error);

        }
    }
    const fetchgetAllNotifications = async () => {
        try {
            const result = await axios.get(`${ServerUrl}/api/user/getallNotifications`, { withCredentials: true })
            dispatch(setNotificationData(result.data))
        } catch (error) {
            console.log(error);

        }
    }



    useEffect(() => {
        marked()


    }, [])

    return (
        <div className='w-full h-[100vh] bg-black overflow-auto'>
            <div
                className='w-full h-[80px] flex items-center gap-[20px] px-[20px] lg:hidden'>
                <MdOutlineKeyboardBackspace className="text-2xl text-white cursor-pointer" onClick={() => navigate(`/`)} />
                <h1 className='text-white text-[20px] font-semibold'>Notification</h1>
            </div>

            <div className="w-full h-[100%] flex flex-col gap-[20px] px-[10px]">
                {notificationData?.map((noti, index) => (
                    <NotificationCard noti={noti} key={index} />
                ))}
            </div>

        </div>
    )
}

export default Notification