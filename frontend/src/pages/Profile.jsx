import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ServerUrl } from '../App'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setProfileData, setUserData } from '../redux/userSlice'
import { MdOutlineKeyboardBackspace } from "react-icons/md"
import dp from "../assets/empty.webp"
import Nav from '../components/Nav'
import FollowButton from '../components/FollowButton'
import PostCard from '../components/PostCard'
import { setSelectedUser } from '../redux/messageSlice'
const Profile = () => {


  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userName } = useParams()
  const { profileData, userData } = useSelector(state => state.user)
  const { postData } = useSelector(state => state.post)
  const [postType, setPostType] = useState("posts")



  const handleProfile = async () => {
    try {
      const result = await axios.get(
        `${ServerUrl}/api/user/getProfile/${userName}`,
        { withCredentials: true }
      )
      dispatch(setProfileData(result.data))
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogOut = async () => {
    try {
      const result = await axios.get(`${ServerUrl}/api/auth/logout`, { withCredentials: true })
      console.log(result);
      dispatch(setUserData(null))

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleProfile()
  }, [userName])




  return (
    <div className="w-full min-h-screen bg-black text-white p-4">

      {/* HEADER */}
      <div className='w-full h-[80px] flex justify-between items-center px-[30px]'>
        <div
          className='w-[25px] h-[25px] cursor-pointer'
          onClick={() => navigate("/")}
        >
          <MdOutlineKeyboardBackspace className="text-2xl text-white" />
        </div>

        <div className="font-semibold text-[20px]">
          {profileData?.userName}
        </div>

        <div
          className="cursor-pointer font-semibold text-[20px] text-blue-500"
          onClick={handleLogOut}
        >
          LogOut
        </div>
      </div>

      {/* PROFILE INFO */}
      <div className='w-full flex items-start gap-[20px] lg:gap-[50px] px-[10px] justify-center py-6'>


        <div className='w-[80px] h-[80px] md:w-[140px] md:h-[140px] border border-white/20 rounded-full cursor-pointer overflow-hidden'>
          <img
            src={profileData?.profileImage || dp}
            className="w-full h-full object-cover"
          />
        </div>

        <div className='flex flex-col'>
          <div className='font-semibold text-[22px]'>{profileData?.name}</div>
          <div className='text-[17px] text-[#ffffffc7]'>
            {profileData?.profession || "New User"}
          </div>
          <div className='text-[15px] text-[#ffffffa8]'>
            {profileData?.bio}
          </div>
        </div>
      </div>

      {/* STATS */}
      <div className='w-full flex items-center justify-center gap-[40px] md:gap-[60px] px-[20%] pt-[20px]'>

        <div className='text-center'>
          <div className='text-[22px] md:text-[30px] font-semibold'>
            {profileData?.posts?.length || 0}
          </div>
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>
            Posts
          </div>
        </div>

        <div className='flex flex-col items-center gap-[6px]'>


          <div className='flex items-center gap-[10px]'>


            <div className='flex relative h-[40px] w-[64px]'>
              {profileData?.followers?.slice(0, 3).map((user, index) => (

                <div className={`w-[40px] h-[40px] border border-white/20 rounded-full overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""}`}>
                  <img src={user?.profileImage || dp} className="w-full h-full object-cover" />
                </div>
              ))}



            </div>

            {/* Count */}
            <div className='font-semibold text-[29px]'>
              {profileData?.followers?.length || 0}
            </div>

          </div>

          {/* Followers text niche */}
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>
            Followers
          </div>

        </div>




        <div className='flex flex-col items-center gap-[6px]'>


          <div className='flex items-center gap-[10px]'>


            <div className='flex relative h-[40px] w-[64px]'>
              {profileData?.following?.slice(0, 3).map((user, index) => (

                <div className={`w-[40px] h-[40px] border border-white/20 rounded-full overflow-hidden ${index > 0 ? `absolute left-[${index * 9}px]` : ""}`}>
                  <img src={user?.profileImage || dp} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>

            {/* Count */}
            <div className='font-semibold text-[29px]'>
              {profileData?.following?.length || 0}
            </div>

          </div>

          {/* Followering text niche */}
          <div className='text-[18px] md:text-[22px] text-[#ffffffc7]'>
            Following
          </div>

        </div>

      </div>


      <div className='w-full h-[80px] flex justify-center items-center gap-[20px] mt-[10px]'>
        {profileData?._id == userData._id && <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl text-black' onClick={() => navigate("/editprofile")}>
          Edit Profile
        </button>}

        {profileData?._id != userData._id && <> <FollowButton tailwind={'px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl text-black'} targetUserId={profileData?._id} onFollowChange={handleProfile} />

          <button className='px-[10px] min-w-[150px] py-[5px] h-[40px] bg-[white] cursor-pointer rounded-2xl text-black' onClick={() => {
  console.log("Selected User:", profileData);
  dispatch(setSelectedUser(profileData));
  navigate("/messagesArea");
}}

          >
            Say Hi
          </button>  </>}

      </div>


      <div className='w-full  min-h-[100vh] flex justify-center'>
        <div className='w-full max-w-[900px] flex flex-col items-center rounded-t-[30px] bg-white relative gap-[20px] pt-[30px] pb-[100px]'>

          {profileData?._id == userData._id && <div className='w-[90%] max-w-[500px] h-[80px] bg-[white] rounded-full flex justify-center items-center gap-[10px]' >
            <div className={` ${postType == "posts" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] cursor-pointer font-semibold hover:bg-black rounded-full hover:text-white hover:shadow-2xl hover:shadow-black  text-black`} onClick={() => setPostType("posts")}>Post</div>
            <div className={` ${postType == "saved" ? "bg-black text-white shadow-2xl shadow-black" : ""} w-[28%] h-[80%] flex justify-center items-center text-[19px] cursor-pointer font-semibold hover:bg-black rounded-full hover:text-white hover:shadow-2xl hover:shadow-black  text-black `} onClick={() => setPostType("saved")}>Saved</div>


          </div>
          }

          <Nav />

          {profileData?._id == userData._id && <> {postType == "posts" && postData.map((post, index) => (
            post.author?._id == profileData?._id && <PostCard post={post} key={index} />
          ))}

            {postType === "saved" &&
              postData
                .filter(post => userData?.saved?.includes(post._id))
                .map((post, index) => (
                  <PostCard post={post} key={index} />
                ))}
          </>
          }

          {profileData?._id != userData._id && postType == "posts" && postData.map((post, index) => (
            post.author?._id == profileData?._id && <PostCard post={post} key={index} />
          ))



          }






        </div>
      </div>

    </div>
  )

}

export default Profile
