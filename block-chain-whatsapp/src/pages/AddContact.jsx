import React, { Fragment, useEffect, useState, useContext } from 'react'
import { ChatAppContext } from '../context/ChatAppContext';
import UserCard from '../components/UserCard';
import images from "../assets/index" ; 
import { TbDatabaseSearch } from "react-icons/tb";


const AddContact = () => {
    const {userList , friendLists , account , addFriends} = useContext(ChatAppContext) ; 
    const [cards, setCards] = useState([]) ; 

    useEffect(()=>{
        debugger;
        const arr = [] ;
        for(let user of userList){
            const name = user[0]; 
            const address = user[1]; 
            if (account.toLowerCase() === address.toLowerCase()) {
                continue;
            }
            arr.push({ name, address }); 
        }
        setCards(arr) ;
    } , [userList])

    return (
        <div className='flex flex-col justify-start h-[100%] pt-[50px] w-[100%] pl-[50px]'>
            <div className='flex flex-row flex-wrap h-[auto] w-[100%] gap-[20px] justify-start'>
                {cards.map((card , index) => {
                    const imageIndex = (index + 1) % 10 ;
                    const image = images[`image${imageIndex}`]
                    return <UserCard card={card} image={image} index={imageIndex} /> 
                })}
            </div>
        </div>
    )
}

export default AddContact; 