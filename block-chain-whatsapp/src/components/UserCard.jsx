import React, { useContext } from 'react';
import { FaUserFriends } from "react-icons/fa";
import { ChatAppContext } from '../context/ChatAppContext';


const UserCard = ({ card, image, index, number, }) => {
    const { addFriends } = useContext(ChatAppContext);
    return (
        <div className='bg-[white] h-[200px] w-[400px] pt-[20px] border-[3px] border-gray-400 rounded-[10px] relative overflow-hidden'>
            <div className='h-[30px] w-[30px] rounded-[30px] text-[#1e91d6] bg-white absolute right-[10px] top-[10px] text-[24px] font-[700] flex justify-center items-center'>
                {number + 1}
            </div>
            <div className='flex flex-row justify-start gap-[15px] px-[20px]'>
                <div className='h-[100px] w-[100px] rounded-full overflow-hidden'>
                    <img src={image} className='w-[100%] h-[100%]' />
                </div>
                <div className='w-[auto]'>
                    <div className='w-[100%] capitalize text-[32px] font-[700] mt-[10px] text-[#116db5]'>
                        {card?.name?.length < 10 ? (card?.name) :(card?.name?.substr(0,10)+"...")}
                    </div>
                    <div className='w-[100%] capitalize text-[14px] font-[400] text-[#403d39]'>
                        {card?.address?.substr(0, 25) + "..."}
                    </div>
                </div>
            </div>
            <div className='h-[70px] w-[100%] flex justify-end items-center px-[20px] bg-[#edeef4] mt-[10px] cursor-pointer'>
                <button
                    onClick={() => addFriends(card.name, card.address)}
                    className='flex flex-row justify-center items-center h-[40px] w-[130px] bg-[#1e91d6] gap-[10px] text-[16px] text-[white] font-[700] rounded-[5px]'>
                    <FaUserFriends className='text-[20px]' />
                    Add Friend
                </button>
            </div>
        </div>
    )
}

export default UserCard