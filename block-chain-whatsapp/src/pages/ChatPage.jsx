import React, { Fragment, useEffect, useState, useContext } from 'react'
import images from "../assets/index";
import { useNavigate } from 'react-router-dom';
import { ChatAppContext } from '../context/ChatAppContext';
import { RiMapPinUserFill } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { LuSearch } from "react-icons/lu";
import ChatArea from '../components/ChatArea';

const ChatPage = () => {
    const { account, avatarID, username, friendLists , readMessages , sendMessage , friendMsg , connectingWithContract , convertTime , checkIfUserExists} = useContext(ChatAppContext);
    const navigation = useNavigate() ; 
    const [userFilter, setUserFilter] = useState([]);
    const [searchField, setSearchField] = useState("");
    const [targetChat , setTargetChat] = useState(null) ; 
    const filterFunction = () => {
        if(searchField?.length === 0){
            setUserFilter(friendLists) ;
        }
        const filterList = friendLists.filter(friend => friend?.name.toLowerCase().startsWith(searchField.toLocaleLowerCase())) ; 
        setUserFilter(filterList) ; 
    }
    const userExists = async () => {
        const isUserConnected = await checkIfUserExists(account);
        if (!(!!isUserConnected)) {
            navigation('/');
        }
    }
    useEffect(() => {
        setUserFilter(friendLists);
    }, [friendLists]);

    useEffect(()=>{
        filterFunction() ; 
    } , [searchField])

    useEffect(()=>{
        userExists() ; 
    } , []) ;

    return (
        <Fragment>
            <div className='h-[100%] w-[30%] border-[1px] border-[#dee2e6]'>
                <div className='h-[15%] w-[100%] border-b-[1px] border-[#dee2e6] flex flex-row justify-start items-center p-[20px] gap-[20px]'>
                    <div className='p-[2px] border-[2px] border-[#c77dff] rounded-full'>
                        <div className='h-[80px] w-[80px] overflow-hidden rounded-full'>
                            <img src={images[avatarID]} />
                        </div>
                    </div>
                    <div className='h-[80px] w-[auto] flex flex-col justify-center gap-[3px]'>
                        <h1 className='text-xl font-bold text-[#023e7d]'>{username}</h1>
                        <h5 className='text-xs font-medium flex flex-row items-center gap-[5px]'><RiMapPinUserFill className='text-[18px]' />{account?.substr(0, 28) + "..."}</h5>
                    </div>
                </div>
                <div className='h-[9%] w-[100%] flex flex-row justify-center p-[10px]'>
                    <div className='flex flex-row w-[99%] relative h-[45px] border-[2px] border-[#757575] rounded-[10px]'>
                        <LuSearch className='absolute bottom-[10px] right-[10px] text-[20px] text-gray-500' />
                        <input
                            className='pl-[20px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[18px]'
                            value={searchField}
                            onChange={(event) => setSearchField(event.target.value)}
                            placeholder='Enter Username'
                        />
                    </div>
                </div>
                <div className='h-[76%] w-[100%] flex flex-col gap-0 justify-start overflow-y-auto'>
                    {userFilter?.map(friend => (<button
                        onClick={()=>{readMessages(friend?.address); setTargetChat(friend)}}
                        className='cursor-pointer'>
                        <div className='h-[80px] border-b-[1px] border-[#dee2e6] flex flex-row items-center justify-between p-[10px] hover:bg-[#e9ecef]'>
                            <div className='rounded-full p-[2px] border-[2px] border-[#2ec4b6]'>
                                <img src={images[friend?.avatarID] || images?.image11} className='h-[60px] w-[60px] rounded-full' />
                            </div>
                            <div className='h-[80px] w-[70%] flex flex-col justify-center gap-[3px]'>
                                <h1 className='text-base font-semibold text-[black] text-start'>{friend?.name}</h1>
                                <h5 className='text-xs font-medium flex flex-row items-center gap-[5px]'><RiMapPinUserFill className='text-[18px]' />{friend?.address?.substr(0, 28) + "..."}</h5>
                            </div>
                            <IoIosArrowForward className='text-[#6c757d]' />
                        </div>
                    </button>))}
                </div>
            </div>
            <div className='h-[100%] w-[70%]  flex flex-col'>
                {!(!!targetChat) && <img src={images.mainchat} className='h-[100%] w-[100%] object-contain'/>}
                {(!!targetChat) && <ChatArea friend={targetChat} avatarID={avatarID} username={username} account={account} sendMessage={sendMessage} msgList = {friendMsg} connectingWithContract={connectingWithContract} convertTime={convertTime}/>}
            </div>
        </Fragment>
    )
}

export default ChatPage