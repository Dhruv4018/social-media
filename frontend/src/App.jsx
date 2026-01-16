import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import SignIn from './pages/SignIn'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import Home from './pages/Home'
import { useDispatch, useSelector } from 'react-redux'
import useCurrent from './hooks/useCurrent'
import useSuggested from './hooks/useSuggested'
import Profile from './pages/Profile'
import EditProfile from "./pages/EditProfile"
import Upload from './pages/Upload'
import VideoPlayer from './pages/VideoPlayer'
import PostCard from './components/PostCard'
import LoopCard from './components/LoopCard'
import useAllPost from './hooks/useAllPost'
import Loops from './pages/Loops'
import useAllLoop from './hooks/useAllLoops'
import Story from './pages/Story'
import useStory from './hooks/useAllStory'
import Messages from './pages/Messages'
import MessageArea from './pages/MessageArea'
import { io } from "socket.io-client"
import { setOnlineUsers, setSocket } from './redux/socketSlice'
import useGetFollowingList from './hooks/useGetFollowinglist'
import useGetPrevUsers from './hooks/usegetPrevUsers'
import Search from './pages/Search'
import useAllNotification from './hooks/useAllNotification'
import Notification from './pages/Notification'
import { setNotificationData } from './redux/userSlice'
export const ServerUrl = "https://social-media-backend-7tyi.onrender.com"
const App = () => {
  useCurrent()
  useSuggested()
  useAllPost()
  useAllLoop()
  useStory()
  useGetFollowingList()
  useGetPrevUsers()
  useAllNotification()
  const { userData , notificationData} = useSelector(state => state.user)
  const { socket } = useSelector(state => state.socket)

  const dispatch = useDispatch()
  useEffect(() => {
    if (userData) {
      const socketIo = io(ServerUrl, {
        query: {
          userId: userData._id
        }
      })
      dispatch(setSocket(socketIo))

      socketIo.on('getOnlineUsers', (users) => {
        dispatch(setOnlineUsers(users))


      })
      return () => socketIo.close()
    } else {
      if (socket) {
        socket.close()
        dispatch(setSocket(null))
      }
    }

  }, [userData])

  
    // socket?.on("newNotification",(noti)=>{
    //   dispatch(setNotificationData([...notificationData,noti]))
    // })
    useEffect(() => {
  if (!socket) return

  socket.on("newNotification", (noti) => {
    dispatch(setNotificationData([...notificationData, noti]))
  })

  return () => {
    socket.off("newNotification")
  }
}, [socket, notificationData])

 
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignIn /> : <Navigate to={"/"} />} />
      <Route path='/login' element={!userData ? <Login /> : <Navigate to={"/"} />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />} />
      <Route path='/' element={userData ? <Home /> : <Navigate to={"/login"} />} />
      <Route path='/profile/:userName' element={userData ? <Profile /> : <Navigate to={"/login"} />} />
      <Route path='/story/:userName' element={userData ? <Story /> : <Navigate to={"/login"} />} />
      <Route path='/editprofile' element={userData ? <EditProfile /> : <Navigate to={"/login"} />} />
      <Route path='/upload' element={userData ? <Upload /> : <Navigate to={"/login"} />} />
      <Route path='/messages' element={userData ? <Messages /> : <Navigate to={"/login"} />} />
      <Route path='/messagesArea' element={userData ? <MessageArea /> : <Navigate to={"/login"} />} />
      <Route path='/loops' element={userData ? <Loops /> : <Navigate to={"/login"} />} />
      <Route path='/search' element={userData ? <Search /> : <Navigate to={"/login"} />} />
      <Route path='/notification' element={userData ? <Notification /> : <Navigate to={"/login"} />} />


    </Routes>
  )
}

export default App
