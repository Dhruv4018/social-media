import React, { useEffect, useState } from 'react'
import { MdOutlineKeyboardBackspace } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import axios from "axios"
import { ServerUrl } from "../App"
import dp from "../assets/empty.webp"
import { useDispatch, useSelector } from 'react-redux'
import { setSearchData } from '../redux/userSlice'
const Search = () => {
  const { searchData } = useSelector(state => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState("")
  const handleSearch = async () => {
    
    try {
      const result = await axios.get(`${ServerUrl}/api/user/search?keyWord=${input}`, { withCredentials: true })
      dispatch(setSearchData(result.data))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
   
    handleSearch()
  }, [input])
  return (
    <div className='w-full min-h-[100vh] bg-black flex items-center flex-col gap-[20px]'>
      <div
        className='w-full h-[80px] flex items-center gap-[20px] px-[20px] top-0'>
        <MdOutlineKeyboardBackspace className="text-2xl text-white cursor-pointer" onClick={() => navigate(`/`)} />

      </div>
      <div className='w-full h-[80px] flex items-center justify-center'>
        <form className='w-[90%] max-w-[800px] h-[80%] rounded-full bg-[#0f1414]  flex items-center px-[20px]'  >
          <FiSearch className='w-[18px] h-[18px] text-white' />
          <input type="text" placeholder='search...' className='w-full h-full outline-0 rounded-full px-[20px] text-white text-[18px]' onChange={(e) => setInput(e.target.value)} value={input} />

        </form>
      </div>
     {input  &&  searchData?.map((user) => (
        <div className='w-[90vw] max-w-[700px] h-[60px] rounded-full bg-white flex items-center cursor-pointer gap-[20px] p-[20px] hover:bg-gray-300'  onClick={() => navigate(`/profile/${user.userName}`)}>
          <div className='w-[50px] h-[50px] border-2 border-black rounded-full cursor-pointer overflow-hidden '>
            <img src={user.profileImage || dp} className="w-full object-cover" />
          </div>

          <div className="text-black text-[18px] font-semibold">
            <div>{user.userName}</div>
            <div className='text-[14px] text-gray-400'>{user.name}</div>

          </div>


        </div>
      ))}

      {!input && <div className='text-[30px] font-bold text-gray-700'>Search Here...</div>}
     

    </div>
  )
}

export default Search