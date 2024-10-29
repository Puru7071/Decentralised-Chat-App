import React, { useState , useContext , useEffect  } from 'react'
import { useNavigate } from 'react-router-dom';
import images from "../assets/index";
import { FaUserPen } from "react-icons/fa6";
import { ImCheckmark } from "react-icons/im";
import { FaQuestionCircle } from "react-icons/fa";
import { ChatAppContext } from '../context/ChatAppContext';
const ChangeAvatar = () => {
    const allAvatars = [
        { name: "image1", img: images.image1 }, { name: "image2", img: images.image2 }, { name: "image3", img: images.image3 },
        { name: "image4", img: images.image4 }, { name: "image5", img: images.image5 }, { name: "image6", img: images.image6 },
        { name: "image7", img: images.image7 }, { name: "image8", img: images.image8 }, { name: "image9", img: images.image9 },
        { name: "image10", img: images.image10 }, { name: "image11", img: images.image11 }, { name: "image12", img: images.image12 },
        { name: "image13", img: images.image13 }, { name: "image14", img: images.image14 }, { name: "image15", img: images.image15 },
        { name: "image16", img: images.image16 }, { name: "image17", img: images.image17 }, { name: "image18", img: images.image18 },
        { name: "image19", img: images.image19 }, { name: "image20", img: images.image20 }, { name: "image21", img: images.image21 },
        { name: "image22", img: images.image22 }, { name: "image23", img: images.image23 }, { name: "image24", img: images.image24 }
    ]
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const {updateAvatarID , checkIfUserExists , account} = useContext(ChatAppContext) ;
    const navigation = useNavigate() ; 

    const userExists = async () => {
        const isUserConnected = await checkIfUserExists(account);
        if (!(!!isUserConnected)) {
            navigation('/');
        }
    }
    useEffect(()=>{
        userExists() ; 
    } , []) ;  
    return (
        <div className='w-[100%] h-[100%] flex flex-col pt-[20px] px-[25px]'>
            <div className='w-[100%] h-[40px] ml-[10px] mt-[10px] flex flex-row justify-between items-center pr-[20px] mb-[20px]'>
                <h1 className='text-3xl font-bold mb-4 flex items-center gap-3'>
                    <FaUserPen className='text-pink-500' /> Find Your Perfect Avatar
                </h1>
                {!!selectedAvatar&&<button onClick={() => updateAvatarID(selectedAvatar.name)} className='px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-900 transition-colors mt-[-10px]'>
                    Change Avatar
                </button>}
            </div>
            <div className='h-[90%] w-[100%] flex flex-row justify-center items-center overflow-scroll'>
                <div className='h-[100%] w-[100%] grid grid-cols-6 gap-6 p-[20px] rounded-[20px]'>
                    {allAvatars.map((avatar) => (
                        <button className='h-[160px] w-[160px] rounded-[150px] overflow-hidden relative group focus:ring-2 focus:ring-blue-500 focus:ring-offset-2' onClick={() => setSelectedAvatar(avatar)}>
                            <img src={avatar?.img}></img>
                            {selectedAvatar?.name === avatar?.name && <div className='h-[100%] w-[100%] absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-50'>
                                <ImCheckmark className='text-[54px] text-green-600'/>
                            </div>}
                            {selectedAvatar?.name !== avatar?.name && <div className='h-[100%] w-[100%] absolute top-0 left-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100'>
                            </div>}
                        </button>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default ChangeAvatar;