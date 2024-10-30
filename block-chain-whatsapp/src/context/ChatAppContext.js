import React, { useState, useEffect, createContext } from 'react';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
    checkIfWalletConnected,
    connectWallet,
    connectingWithContract,
    convertTime
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
    const [map, setMap] = useState({});
    const [avatarID , setAvatarID] = useState("") ; 

    const navigate = useNavigate();

    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");
    const handleAccountsChanged = (accounts) => {
        if (accounts.length > 0) {
            window.location.reload();
        }
    };
    const modifyFriendList = (friendLists) => {
        const arr = []; const mp = map;
        for (let friend of friendLists) {
            arr.push({ address: friend, name: mp[friend].name, avatarID: mp[friend].avatarID });
        }
        console.log(arr);
        setFriendLists(arr);
    }
    const modifyUserList = (userList , account) => {
        const arr = []; const mp = map;
        for (let user of userList) {
            const name = user[0];
            const address = user[1];
            const avatarID = user[2];
            if(account.toLowerCase() === address.toLowerCase()){                
                setAvatarID(avatarID) ; 
            }
            mp[address] = { name, avatarID };
            if (account.toLowerCase() === address.toLowerCase()) {
                continue;
            }
            arr.push({ name, address, avatarID });
        }
        console.log("USER LIST: ", arr);
        setUserList(arr); setMap(mp);
    }
    const modifyMsgList = (msgList) => {
        const arr = [] ; 
        for(let msg of msgList){
            const address = msg[0] ; 
            const timeStamp = msg[1] ; const message = msg[2] ;  
            arr.push({message,timeStamp:convertTime(timeStamp),address}); 
        }
        console.log(arr) ; 
        setFriendMsg(arr) ; 
    }

    const fetchData = async () => {
        try {
            debugger;
            const { contractRead, contractWrite } = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);

            const username = await contractRead?.getUsername(connectAccount);
            if (!!username) setUsername(username);

            const userList = await contractRead.getAllRegisteredUser();
            if (!!userList) modifyUserList(userList , connectAccount);

            const completeUser = await contractRead.getUser(connectAccount);
            if (!!completeUser) modifyFriendList([...completeUser][1]);

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
            const read = await contractWrite.readMessage(friendAddress);
            modifyMsgList([...read]);
            console.log([...read])
        } catch (error) {
            setError("No Message was found !!");
        }
    }

    const createAccount = async (name, accountAddress) => {
        try {
            debugger;
            if (!(!!name) || !(!!accountAddress)) {
                return setError("Name and Address are required.");
            }
            const { contractRead, contractWrite } = await connectingWithContract();
            //Broadcast (await contract.createAccount(name)):
            // Sends the transaction to the blockchain network and 
            // resolves once the network has accepted it. It is now waiting 
            // to be mined by a miner.
            const random = Math.floor(Math.random() * 24) + 1 ; 
            const getCreatedUser = await contractWrite.createAccount(name , `image${random}`);
            setLoading(true);

            //Wait for Mining (getCreatedUser.wait()):
            // Pauses the execution until the transaction is actually included
            //  in a new block (mined), meaning the transaction is now confirmed on 
            // the blockchain.     
            await getCreatedUser.wait();
            setLoading(false);
            setUsername(name);
            setAvatarID(`image${random}`)
            toast.success("Account Created Successfully.")
            navigate("/");
        } catch (error) {
            setError("Error in creating account. Please Try again.");
        }
    }

    const fetchFriendsList = async () => {
        try {
            const { contractRead, contractWrite } = await connectingWithContract();
            const completeUser = await contractRead.getUser(account)
            if (!!completeUser) modifyFriendList([...completeUser][1]);
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

            const friendAdded = await contractWrite.addFriend(accountAddress);

            setLoading(true);
            await friendAdded.wait();
            setLoading(false);

            await fetchFriendsList();
            toast.success(`${name} successfully added to your Friends list!`);
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
            // window.location.reload();
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
    const updateAvatarID = async (avatarID) => {
        try {
            debugger ; 
            const { contractWrite } = await connectingWithContract();

            const updateOfAvatar = await contractWrite.updateAvatarID(account, avatarID);

            await updateOfAvatar.wait();
            setAvatarID(avatarID) ; 
            toast.success("Avatar Updated Successfully.")
        } catch (e) {
            console.log("error" , e) ; 
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
        fetchFriendsList , 
        updateAvatarID , 
        avatarID , 
        convertTime
    }
    return <ChatAppContext.Provider value={data}>
        {children}
    </ChatAppContext.Provider>
}
