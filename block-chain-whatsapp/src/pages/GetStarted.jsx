import { React, useContext, Fragment, useState, useEffect  } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatAppContext } from '../context/ChatAppContext';
import { FaEthereum } from "react-icons/fa";
import { FaUserAlt } from "react-icons/fa";
import { PiMapPinAreaFill } from "react-icons/pi";
import { FaArrowTurnDown } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import toast from "react-hot-toast";
import images from "../assets/index";
import Loader from '../components/Loader';

const GetStarted = () => {
    const { account, error , createAccount, loading, setError } = useContext(ChatAppContext);
    const [address, setAddress] = useState(account);
    const [username, setUsername] = useState("");
    const [intialLoad , setIntialLoad] = useState(false) ; 
    const navigation = useNavigate() ; 

    useEffect(() => {
        if(!(!!account) && intialLoad){
            navigation("/")
        }
        setAddress(account);
        setIntialLoad(true) ; 
    }, [account])

    useEffect(() => {
        if(!!error)toast.error(error) ; 
        setError("")
    } , [error])
    return (
        <Fragment>
            <div className='w-[48%] h-[100%] flex justify-center items-center'>
                <img src={images?.login} className='w-[80%] h-[80%] object-contain' />
            </div>
            <div className='w-[48%] h-[100%] flex flex-col justify-center'>
                <h1 className='text-[36px] text-[#1976d2] font-[700] capitalize flex flex-row flex-nowrap items-center'>
                    <FaEthereum className='text-gray-700 mr-[10px] text-[42px]' /> Welcome to Cipherspace.
                </h1>
                <h4 className='mt-[5px] ml-[10px] text-gray-600 font-[500]'>
                    Welcome to Cipherspace, your gateway to secure and private messaging!
                </h4>
                <h4 className='ml-[10px] mt-[20px] text-[#ff930a] text-[18px] font-[600] mb-[10px] flex flex-row flex-nowrap gap-[10px] justify-start items-center'>
                    Please Create Username <FaArrowTurnDown className='mt-[8px]' />
                </h4>
                <div className='flex flex-row w-[99%] relative h-[45px] ml-[10px] border-[3px] border-[#757575] rounded-[10px]'>
                    <FaUserAlt className='absolute bottom-[5px] left-[10px] text-[28px] text-gray-500' />
                    <input
                        className='pl-[50px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[24px]'
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        placeholder='Enter Username'
                    />
                </div>

                <h4 className='ml-[10px] mt-[20px] text-[#ff930a] text-[18px] font-[600] mb-[10px] flex flex-row flex-nowrap gap-[10px] justify-start items-center'>
                    Selected Address <FaArrowTurnDown className='mt-[8px]' />
                </h4>
                <div className='flex flex-row w-[99%] relative h-[45px] ml-[10px] border-[3px] border-[#757575] rounded-[10px]'>
                    <PiMapPinAreaFill className='absolute bottom-[5px] left-[10px] text-[28px] text-gray-500' />
                    <input
                        className='pl-[50px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[24px]'
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        placeholder='Enter Address'
                        disabled
                    />
                </div>
                <div className='flex flex-row gap-[20px] ml-[10px]'>
                    <button onClick={() => createAccount(username, address)}
                        className='hover-pointer mt-[30px] bg-[#1976d2] rounded-[10px] text-[14px] font-[600] text-white h-[50px] w-[180px] flex flex-row items-center justify-around px-[20px] hover:cursor-pointer'>
                        <IoIosAddCircle className='text-[20px]' />
                        Create Account
                    </button>
                </div>
            </div>
            {loading ? <Loader/> : ""}
        </Fragment>
    )
}

export default GetStarted