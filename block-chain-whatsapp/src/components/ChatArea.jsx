import React, { Fragment, useState, useEffect ,useRef } from 'react';
import images from "../assets/index";
import { FaExchangeAlt } from "react-icons/fa";
import { convertTime } from '../Utils/apiFeatures';

const ChatArea = ({ friend, avatarID, account, sendMessage, msgList, connectingWithContract }) => {
    const [msg, setMsg] = useState("");
    const [msgs , setMsgs] = useState() ; 
    const bottomRef = useRef(null);
    const initialLoad = useRef(true);
    const contractWriteRef = useRef(null);
    const chatCodeRef = useRef("");

    const onNewMessage = (chatCodeEvent, sender, content, timestamp) => {
        console.log(chatCodeEvent.args);
        const newMessage = {
            message: [...chatCodeEvent.args][2],
            address: [...chatCodeEvent.args][1],
            timeStamp: convertTime([...chatCodeEvent.args][3])
        }
        setMsgs(prev => {
            return [...(prev || []), newMessage]; 
        });
    }
    const eventTracer = async () => {
        if (!!friend && !!account) {
            const { contractRead, contractWrite } = await connectingWithContract();
            const chatCode = await contractWrite._getChatCode(account || "", friend?.address || "");
            contractWriteRef.current = contractWrite;
            chatCodeRef.current = chatCode;
            const filter = contractWrite.filters.NewMessage(chatCode);
            contractWrite.on(filter, onNewMessage);
        }
    }
    useEffect(() => {
        eventTracer()
        return () => {
            if (contractWriteRef.current) {
                contractWriteRef.current.off(contractWriteRef.current.filters.NewMessage(chatCodeRef.current), onNewMessage);
            }
        };
    }, [friend, account]) ; 

    useEffect(() => {
        setMsgs(msgList) ; 
    }, [msgList]);

    useEffect(()=>{
        bottomRef.current?.scrollIntoView({ behavior: 'auto' });
        initialLoad.current = false;
    },[msgs])

    return (
        <Fragment>
            <div className='w-[100%] h-[10%] border-b-[1px] bg-[#ffffff] border-[#dee2e6] flex flex-row items-center justify-start gap-[20px] px-[20px] shadow-md'>
                <div className='p-[2px] border-[2px] border-[#708d81] rounded-full'>
                    <img src={images[friend?.avatarID]} className='h-[60px] w-[60px] rounded-full' />
                </div>
                <div className='flex flex-col justify-center h-[100%]'>
                    <h1 className='text-xl font-semibold text-[black] text-start'>You & {friend?.name}</h1>
                    <h5 className='text-xs font-medium flex flex-row items-center gap-[5px]'>({friend?.address?.substr(0, 28) + "..."}) <FaExchangeAlt className='text-[18px]' /> ({account?.substr(0, 28) + "..."})</h5>
                </div>
            </div>

            <div className='h-[80%] w-[100%] bg-slate-100 flex flex-col p-[20px] overflow-y-auto gap-[15px]'>
                {msgs?.map(msg => (
                    <Fragment>
                        {account.toLowerCase() !== msg.address.toLowerCase() && <div className='w-[70%] h-[auto] flex flex-row justify-start self-start items-center gap-[10px]'>
                            <div className='rounded-full p-[2px] border-[2px] border-[#ef476f] h-[62px] w-[62px] flex justify-center items-center'>
                                <img className='h-[] w-[60px] rounded-full' src={msg?.address.toLowerCase() === account.toLowerCase() ? images[avatarID] : images[friend.avatarID]} />
                            </div>
                            <div className='h-[auto] w-[90%] bg-[white] shadow-lg min-h-[80px] rounded-md p-[12px] relative'>
                                <span className='text-lg'> {msg.message} </span>
                                <div className='h-[10px] text-[10px] absolute bottom-2 right-4'>
                                    {msg.timeStamp}
                                </div>
                            </div>
                        </div>}
                        {account.toLowerCase() === msg.address.toLowerCase() && <div className='w-[70%] h-[auto] flex flex-row justify-end self-end items-center gap-[10px]'>
                            <div className='rounded-full p-[2px] border-[2px] border-[#7209b7] h-[62px] w-[62px] flex justify-center items-center'>
                                <img className='h-[] w-[60px] rounded-full' src={msg?.address.toLowerCase() === account.toLowerCase() ? images[avatarID] : images[friend.avatarID]} />
                            </div>
                            <div className='h-[auto] w-[90%] bg-[white] shadow-lg min-h-[80px] rounded-md p-[12px] relative'>
                                <span className='text-lg'> {msg.message} </span>
                                <div className='h-[10px] text-[10px] absolute bottom-2 right-4'>
                                    {msg.timeStamp}
                                </div>
                            </div>
                        </div>}

                    </Fragment>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className='h-[9%] w-[100%] flex flex-row justify-around items-center p-[10px] border-t-[2px] border-[#dee2e6] bg-[white]'>
                <div className='flex flex-row w-[90%] relative h-[45px] border-[2px] border-[#757575] rounded-[10px]'>
                    <input
                        className='pl-[20px] w-[100%] h-[100%] bg-[transparent] outline-none text-gray-500 text-[18px]'
                        placeholder='Type a Message...'
                        value={msg}
                        onChange={(event) => setMsg(event.target.value)}
                    />
                </div>
                <button onClick={() => { sendMessage(msg, friend?.address); setMsg(""); }} className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>Send</button>
            </div>
        </Fragment>
    )
}

export default ChatArea; 