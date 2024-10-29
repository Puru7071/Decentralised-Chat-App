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
        const outputLevel1 = userList.filter(user => user?.address?.toLowerCase() !== account?.toLowerCase()) ; 
        const outputLevel2 = outputLevel1?.map(user => ({
            ...user,
            showAddbutton : !(!!friendLists.find(friend => friend?.address === user?.address)) 
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
                    result = result.filter(c => c?.address?.toLowerCase().startsWith(addressFilter.toLowerCase()));
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
            <h1 className='text-3xl font-bold mb-4 flex items-center gap-3'>
                <FaUserFriends className='text-pink-500' />
                Connect & Chat: Add Your Friends
            </h1>
            <div className='flex flex-row w-[80%] mb-[20px] justify-between gap-[10px] ml-[-10px] h-[10%]'>
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
            {!loading && <div className='grid grid-cols-3 h-[80%] w-[100%] overflow-y-auto content-start gap-y-[10px] gap-x-[5px]'>
                {cards.map((card, index) => {
                    const imageIndex = ((index) % 24) + 1;
                    const image = card.avatarID ? images[`${card.avatarID}`] : images[`image${imageIndex}`]
                    return <UserCard card={card} image={image} index={imageIndex} number={index} />
                })}
            </div>}

            {loading && <div className='h-[92%] w-[100%] relative'>
                {<Loader />}
            </div>}
        </div>
    )
}

export default AddContact; 