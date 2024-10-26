import React, { useState, useEffect, createContext } from 'react';
import { Await, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
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
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");
    const [friendMsg, setFriendMsg] = useState([]);

    const navigate = useNavigate();

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            window.location.reload();
        }
    };

    const fetchData = async () => {
        try {
            debugger;
            const { contractRead, contractWrite } = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const username = await contractRead?.getUsername(connectAccount);
            if (!!username) setUsername(username);

            const friendLists = await contractRead.getMyFriends();
            if (!!friendLists) setFriendLists(friendLists);

            const userList = await contractRead.getAllRegisteredUser();
            if (!!userList) setUserList(userList);

            if (window.ethereum) {
                window.ethereum.on("accountsChanged", handleAccountsChanged);
            }
        }
        catch (error) {
            setError("Please connect to your wallet !!");
        }
    }
    useEffect(() => {
        fetchData();
    }, [account]);

    const readMessages = async (friendAddress) => {
        try {
            const { contractRead, contractWrite } = await connectingWithContract();
            const read = await contractRead.readMessage(friendAddress);
            setFriendMsg(read);
        } catch (error) {
            setError("No Message was found !!");
        }
    }

    const createAccount = async (name, accountAddress) => {
        try {
            if (!(!!name) || !(!!accountAddress)) {
                return setError("Name and Address are required.");
            }
            debugger;
            const { contractRead, contractWrite } = await connectingWithContract();
            //Broadcast (await contract.createAccount(name)):
            // Sends the transaction to the blockchain network and 
            // resolves once the network has accepted it. It is now waiting 
            // to be mined by a miner.
            const getCreatedUser = await contractWrite.createAccount(name);
            setLoading(true);

            //Wait for Mining (getCreatedUser.wait()):
            // Pauses the execution until the transaction is actually included
            //  in a new block (mined), meaning the transaction is now confirmed on 
            // the blockchain.     
            await getCreatedUser.wait();
            setLoading(false);
            setUsername(name);
            toast.success("Account Created Successfully.")
            navigate("/");
        } catch (error) {
            setError("Error in creating account. Please Try again.");
        }
    }

    const addFriends = async (name, accountAddress) => {
        try {
            debugger;
            if (!(!!name) || !(accountAddress)) {
                setError("Name and Account Address is mandatory !!");
            }
            const { contractRead, contractWrite } = await connectingWithContract();
            const friendAdded = contractWrite.addFriend(accountAddress, name);
            setLoading(true);
            await friendAdded.wait();
            setLoading(false);
            navigate("/");
        } catch (error) {
            setError("Something went wrong while adding the friend. Try again !!")
        }
    }

    const sendMessage = async (msg, accountAddress) => {
        try {
            if (!(!!msg) || !(!!accountAddress)) {
                setError("Message and Account Address is mandatory !!")
            }

            const { contractRead, contractWrite } = await connectingWithContract();
            const msgSent = await contractWrite.sendMessage(accountAddress, msg);
            setLoading(true);
            await msgSent.wait();
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setError("Message not sent. Please try again !!");
        }
    }

    const readUser = async (userAddress) => {
        const { contractRead, contractWrite } = await connectingWithContract();
        const username = await contractRead.getUsername(userAddress);
        setCurrentUserAddress(userAddress);
        setCurrentUserName(username);
    }

    const checkIfUserExists = async (targetAddress) => {
        try {
            debugger ; 
            if(!(!!targetAddress)){
                return ; 
            }
            const { contractRead, contractWrite } = await connectingWithContract();
            const isUserConnected = await contractRead?.checkUserExists(targetAddress);
            return isUserConnected;
        } catch (error) {
            toast.error("Something went wrong") ; 
            navigate("/") ; 
        }
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
        userList,
        error,
        friendMsg,
        currentUserName,
        currentUserAddress,
        checkIfWalletConnected,
        connectWallet,
        connectingWithContract,
        setAccount,
        setError,
        checkIfUserExists
    }
    return <ChatAppContext.Provider value={data}>
        {children}
    </ChatAppContext.Provider>
}
