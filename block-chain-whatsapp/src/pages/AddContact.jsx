import React, { Fragment, useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ChatAppContext } from '../context/ChatAppContext';
import UserCard from '../components/UserCard';
import images from "../assets/index";
import { FaUserAlt } from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";
import Loader from '../components/Loader';
import { FaUserFriends } from "react-icons/fa";


const AddContact = () => {
    const { userList, friendLists, account , checkIfUserExists, loading, setLoading } = useContext(ChatAppContext);
    const [cards, setCards] = useState([]);
    const [nameFilter, setNameFilter] = useState("");
    const [addressFilter, setAddressFilter] = useState("");
    const navigation = useNavigate();

    const userExists = async (userAcc) => {
        const isUserConnected = await checkIfUserExists(userAcc);
        if (!(!!isUserConnected)) {
            navigation('/');
        }
        makeUpCards();
    }

    const makeUpCards = async () => {
        const outputLevel1 = userList.filter(user => user.address.toLowerCase() !== account.toLowerCase()) ; 
        const outputLevel2 = outputLevel1?.map(user => ({
            ...user,
            showAddbutton : !(!!friendLists.find(friend => friend.address === user.address)) 
        }))
        setCards(outputLevel2);
    }

    const filterFunction = () => {
        debugger;
        if (!(!!nameFilter) && !(!!addressFilter)) {
            setTimeout(() => makeUpCards(), 1000);
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setCards((prev) => {
                let result = prev;
                if (nameFilter) {
                    result = result.filter(c => c.name.toLowerCase().startsWith(nameFilter.toLowerCase()));
                }
                if (addressFilter) {
                    result = result.filter(c => c.address.toLowerCase().startsWith(addressFilter.toLowerCase()));
                }
                return result;
            });
            setLoading(false);
        }, 1000);
    }

    useEffect(() => {
        userExists(account);
    }, [account, userList , friendLists])

    useEffect(() => {
        filterFunction();
    }, [nameFilter, addressFilter])

    return (
        <div className='flex flex-col justify-start h-[100%] pt-[20px] w-[100%] px-[25px] relative'>
            <h1 className='text-[42px] font-[600] text-[#ff006e] flex flex-row items-center gap-[10px] mb-[5px]'>
                <FaUserFriends className='text-[#331e36]' />
                Connect & Chat: Add Your Friends to Start the Conversation!
            </h1>
            <div className='flex flex-row w-[80%] mb-[40px] justify-between gap-[10px] ml-[-10px] h-[8%]'>
                <div className='flex flex-row w-[49.5%] relative h-[45px] ml-[10px] border-[3px] border-[#757575] rounded-[10px]'>
                    <FaUserAlt className='absolute bottom-[5px] left-[10px] text-[28px] text-gray-500' />
                    <input
                        className='pl-[50px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[24px]'
                        value={nameFilter}
                        placeholder='Enter Username'
                        onChange={(event) => setNameFilter(event.target.value)}
                    />
                </div>
                <div className='flex flex-row w-[49.5%] relative h-[45px] ml-[10px] border-[3px] border-[#757575] rounded-[10px]'>
                    <PiMapPinAreaFill className='absolute bottom-[5px] left-[10px] text-[28px] text-gray-500' />
                    <input
                        className='pl-[50px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[24px]'
                        value={addressFilter}
                        onChange={(event) => setAddressFilter(event.target.value)}
                        placeholder='Enter Address'
                    />
                </div>
            </div>
            {!loading && <div className='flex flex-row flex-wrap h-[auto] w-[100%] gap-[20px] justify-start overflow-scroll min-h-[600px]'>
                {cards.map((card, index) => {
                    const imageIndex = ((index) % 10) + 1;
                    const image = images[`image${imageIndex}`]
                    return <UserCard card={card} image={image} index={imageIndex} number={index} />
                })}
            </div>}

            <div className='h-[92%] w-[100%] relative'>
                {loading && <Loader />}
            </div>
        </div>
    )
}

export default AddContact; 