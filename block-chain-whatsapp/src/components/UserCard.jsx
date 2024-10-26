import React , {useContext} from 'react';
import { FaUserFriends } from "react-icons/fa";
import { ChatAppContext } from '../context/ChatAppContext';


const UserCard = ({ card, image, index }) => {
    const {addFriends} = useContext(ChatAppContext) ; 
    return (
        <div className='bg-[white] h-[280px] w-[400px] pt-[20px] border-[3px] border-[#1e91d6] rounded-[20px] relative'>
            <div className='h-[50px] w-[50px] rounded-[30px] bg-[#1e91d6] text-white absolute right-[20px] top-[20px] text-[24px] font-[700] flex justify-center items-center'>
                {index}
            </div>
            <div className='h-[100px] w-[100px] rounded-[50px] overflow-hidden m-auto'>
                <img src={image} className='w-[100%] h-[100%] object-contain' />
            </div>
            <div className='w-[100%] text-center capitalize text-[18px] font-[600] mt-[10px]'>
                {card?.name}
            </div>
            <div className='w-[100%] text-center capitalize text-[14px] font-[500]'>
                {card?.address.substr(0, 25) + "..."}
            </div>
            <div className='h-[100px] w-[100%] flex justify-center items-center'>
                <button
                    onClick={()=>addFriends(card.name,card.address)}
                    className='flex flex-row justify-center items-center h-[40px] w-[130px] bg-[#1e91d6] gap-[10px] text-[16px] text-[white] font-[700] rounded-[5px]'>
                    <FaUserFriends className='text-[20px]' />
                    Add Friend
                </button>
            </div>
        </div>
    )
}

export default UserCard