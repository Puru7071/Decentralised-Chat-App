import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from "react-router-dom";

import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract
} from '../Utils/apiFeatures';

export const ChatAppContext = createContext();

export default function ChatAppProvider({ children }) {
    const [account, setAccount] = useState("");
    const [username, setUsername] = useState("");
    const [friendLists, setFriendLists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [useList, setUserList] = useState([]);
    const [error, setError] = useState("");
    const [friendMsg, setFriendMsg] = useState([]);

    const navigate = useNavigate();

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const username = await contract.getUsername(connectAccount);
            setUsername(username);

            const friendLists = await contract.getMyFriends();
            setFriendLists(friendLists);

            const userList = await contract.getAllRegisteredUser();
            setUserList(useList);
        }
        catch (error) {
            setError("Please connect to your wallet !!");
        }
    }
    useEffect(() => {
        fetchData();
    }, []);

    const readMessages = async (friendAddress) => {
        try {
            const contract = await connectingWithContract();
            const read = await contract.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("No Message was found !!");
        }
    }

    const createAccount = async ({ name, accountAddress }) => {
        try {
            if (!(!!name) || !(!!accountAddress)) {
                return setError("Name and Account Address is mandatory !!");
            }

            const contract = await connectingWithContract();
            //Broadcast (await contract.createAccount(name)):
            // Sends the transaction to the blockchain network and 
            // resolves once the network has accepted it. It is now waiting 
            // to be mined by a miner.
            const getCreatedUser = await contract.createAccount(name);
            setLoading(true);

            //Wait for Mining (getCreatedUser.wait()):
            // Pauses the execution until the transaction is actually included
            //  in a new block (mined), meaning the transaction is now confirmed on 
            // the blockchain.     
            await getCreatedUser.wait();
            setLoading(false);
            await contract.createAccount(name);

            window.location.reload();
        } catch (error) {
            setError("Error in creating account. Please refresh the browser");
        }
    }

    const addFriends = async ({ name, accountAddress }) => {
        try {
            if (!(!!name) || !(accountAddress)) {
                setError("Name and Account Address is mandatory !!");
            }
            const contract = await connectingWithContract();
            const friendAdded = contract.addFriend(accountAddress, name);
            setLoading(true);
            await friendAdded.wait();
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError("Something went wrong while adding the friend. Try again !!")
        }
    }

    const sendMessage = async ({ msg, accountAddress }) => {
        try {
            if (!(!!msg) || !(!!accountAddress)) {
                setError("Message and Account Address is mandatory !!")
            }

            const contract = await connectingWithContract();
            const msgSent = await contract.sendMessage(accountAddress, msg);
            setLoading(true);
            await msgSent.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Message not sent. Please try again !!");
        }
    }

    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const username = await contract.getUsername(userAddress);
        setCurrentUserAddress(userAddress);
        setCurrentUserName(username);
    }
    const data = {
        readMessages,
        createAccount,
        addFriends,
        sendMessage,
        readUser,
        account,
        username,
        friendLists,
        loading,
        useList,
        error,
        friendMsg , 
        currentUserName , 
        currentUserAddress , 
        checkIfWalletConnected,
        connectWallet
    }
    return <ChatAppContext.Provider value={data}>
        {children}
    </ChatAppContext.Provider>
}
