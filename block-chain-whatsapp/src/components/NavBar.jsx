import React, { useState, useContext, useEffect } from 'react'
import { useNavigate, NavLink } from "react-router-dom";
import { SiBlockchaindotcom } from "react-icons/si";
import images from "../assets/index"
import { FaUsers } from "react-icons/fa6";
import { BsChatSquareFill } from "react-icons/bs";
import { MdContacts } from "react-icons/md";
import { TbUserSquare } from "react-icons/tb";
import { FaQuestionCircle } from "react-icons/fa";
import { FaInfoCircle } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { IoPersonAddSharp } from "react-icons/io5";
import { IoLogIn } from "react-icons/io5";
import { IoLogOut } from "react-icons/io5";
import { ChatAppContext } from '../context/ChatAppContext';

const NavBar = () => {
  const [menuOptions, setMenuOptions] = useState([]);
  
  const navigate = useNavigate();
  const { account, connectWallet, username, avatarID } = useContext(ChatAppContext);
  useEffect(() => {
    if(username){
      const m = [
        { label: "All Chats", url: "/chat-area", icon: <BsChatSquareFill className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' />, show: !!username },
        // { label: "Video Chat", url: "/", icon: <FaUsers className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' /> },
        { label: "Add Friends", url: "/all-users", icon: <MdContacts className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' />, show: !!username },
        { label: "Edit Avatar", url: "/change-avatar", icon: <TbUserSquare className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' />, show: !!username },
        // { label: "FAQs", url: "/", icon: <FaQuestionCircle className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' /> },
        { label: "About", url: "/", icon: <FaInfoCircle className='text-[#898787] text-[24px] mb-[5px] group-hover:text-[white]' />, show: !!username }
      ];
      setMenuOptions(m)
    }
  }, [username])
  return (
    <div className='h-[100%] w-[7%] flex flex-col items-center justify-around nav-bar-component'>
      <div className='h-[80px] w-[80px] flex justify-center items-center hover:cursor-pointer'>
        <button>
          <SiBlockchaindotcom className='text-[white] text-[48px]' />
        </button>
      </div>

      <div className='min-h-[550px] flex flex-col justify-center'>
        {menuOptions?.filter(item => item.show)?.map(opt => (
          <div className='mb-[10px] group transition ease-in duration-[1000] hover:cursor-pointer'>
            <NavLink to={opt?.url}>
              <div className='flex flex-col justify-center items-center h-[80px] w-[80px] text-white group-hover:rounded-[10px] group-hover:bg-[#464646]'>
                {opt?.icon}
                <span className='w-[100%] text-nowrap text-center text-[12px] text-[#555455] group-hover:text-[white]'>{opt.label}</span>
              </div>
            </NavLink>
          </div>
        ))}
      </div>

      <div>
        {!(!!account) && <button className='group hover:cursor-pointer' onClick={() => connectWallet()}>
          <div className='flex flex-col justify-center items-center h-[80px] w-[80px] text-white'>
            <GiWallet className='text-[#898787] text-[32px] mb-[5px] group-hover:text-[white]' />
            <span className='w-[100%] text-center text-[12px] text-[#555455] group-hover:text-[white]'>Connect Wallet</span>
          </div>
        </button>}

        {(!!account) && <button className='group hover:cursor-pointer' onClick={() => navigate("/get-started")}>
          {!(!!username) ?
            <div className='flex flex-col justify-center items-center h-[80px] w-[80px] text-white'>
              <IoPersonAddSharp className='text-[#898787] text-[32px] mb-[5px] group-hover:text-[white]' />
              <span className='w-[100%] text-center text-[12px] text-[#555455] group-hover:text-[white]'>Get Started</span>
            </div> :
            <div className='flex flex-col justify-center items-center h-[60px] w-[60px] text-white'>
              <img src={avatarID === "" ? images?.accountName : images?.[avatarID]} alt="Account Image" width={50} height={50} className='rounded-[30px]' />
            </div>}
        </button>}


        {false && <button className='group hover:cursor-pointer'>
          <div className='flex flex-col justify-center items-center h-[80px] w-[80px] text-white'>
            <IoLogIn className='text-[#898787] text-[32px] mb-[5px] group-hover:text-[white]' />
            <span className='w-[100%] text-center text-[12px] text-[#555455] group-hover:text-[white]'>Authenticate</span>
          </div>
        </button>}


        {false && <button className='group hover:cursor-pointer'>
          <div className='flex flex-col justify-center items-center h-[80px] w-[80px] text-white'>
            <IoLogOut className='text-[#898787] text-[32px] mb-[5px] group-hover:text-[white]' />
            <span className='w-[100%] text-center text-[12px] text-[#555455] group-hover:text-[white]'>Log out</span>
          </div>
        </button>}
      </div>
    </div>
  )
}

export default NavBar;