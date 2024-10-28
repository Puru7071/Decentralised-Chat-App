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
    const modifyFriendList = (friendLists) => {
        const arr = [];
        for (let friend of friendLists) {
            const targetFriend = [...friend];
            arr.push({ address: targetFriend?.[0], name: targetFriend?.[1] })
        }
        setFriendLists(arr);
    }
    const modifyUserList = (userList) => {
        const arr = [];
        for (let user of userList) {
            const name = user[0];
            const address = user[1];
            if (account.toLowerCase() === address.toLowerCase()) {
                continue;
            }
            arr.push({ name, address });
        }
        arr.push({ name: "Alice", address: "0x12345abcd12345abcd12345abcd12345abcd1234" });
        arr.push({ name: "Bob", address: "0x23456bcde23456bcde23456bcde23456bcde2345" });
        arr.push({ name: "Charlie", address: "0x34567cdef34567cdef34567cdef34567cdef3456" });
        arr.push({ name: "Daisy", address: "0x45678defg45678defg45678defg45678defg4567" });
        arr.push({ name: "Eve", address: "0x56789efgh56789efgh56789efgh56789efgh5678" });
        arr.push({ name: "Frank", address: "0x67890fghi67890fghi67890fghi67890fghi6789" });
        arr.push({ name: "Grace", address: "0x78901ghij78901ghij78901ghij78901ghij7890" });
        arr.push({ name: "Henry", address: "0x89012hijk89012hijk89012hijk89012hijk8901" });
        arr.push({ name: "Ivy", address: "0x90123ijkl90123ijkl90123ijkl90123ijkl9012" });
        arr.push({ name: "Jack", address: "0xa1234jklm1234jklm1234jklm1234jklm1234a12" });
        setUserList(arr);
    }

    const fetchData = async () => {
        try {
            debugger;
            const { contractRead, contractWrite } = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const username = await contractRead?.getUsername(connectAccount);
            if (!!username) setUsername(username);

            const friendLists = await contractRead.getMyFriends();
            if (!!friendLists) modifyFriendList(friendLists);

            const userList = await contractRead.getAllRegisteredUser();
            if (!!userList) modifyUserList(userList);

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
    }, []);

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
            debugger ; 
            if (!(!!name) || !(!!accountAddress)) {
                return setError("Name and Address are required.");
            }
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

    const fetchFriendsList = async () => {
        try {
            const { contractRead, contractWrite } = await connectingWithContract();
            const updateFriendsList = await contractRead.getMyFriends();
            console.log("Friend list fetched:", updateFriendsList);
            setFriendLists(updateFriendsList);
            return;
        } catch (e) {
            console.log("e", e);
        }
    }

    const addFriends = async (name, accountAddress) => {
        try {
            debugger;
            if (!(!!name) || !(accountAddress)) {
                setError("Name and Account Address is mandatory !!");
            }
            const { contractRead, contractWrite } = await connectingWithContract();
            const friendAdded = await contractWrite.addFriend(accountAddress, name);
            setLoading(true);
            await friendAdded.wait();
            setLoading(false);
            await fetchFriendsList();
            toast.success(`${name} successfully added to your Friends list!`);
            navigate("/");
        } catch (error) {
            toast.error(error.reason);
            console.log("Something went wrong while adding the friend. Try again !!", error.reason)
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
            if (!(!!targetAddress)) {
                return;
            }
            const { contractRead, contractWrite } = await connectingWithContract();
            const isUserConnected = await contractRead?.checkUserExists(targetAddress);
            return isUserConnected;
        } catch (error) {
            toast.error("Something went wrong");
            navigate("/");
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
        checkIfUserExists,
        setLoading,
        fetchFriendsList
    }
    return <ChatAppContext.Provider value={data}>
        {children}
    </ChatAppContext.Provider>
}
