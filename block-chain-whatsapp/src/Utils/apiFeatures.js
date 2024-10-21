import { ethers } from "ethers";
import Web3Modal from "web3modal";

import { chatAppAddress, chatAppABI } from "../context/contants";

export const checkIfWalletConnected = async () => {
    try {
        if (!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({
            method: "eth_accounts",
        })
        const firstAcc = accounts[0];
        return firstAcc;
    } catch (err) {
        console.log("Something went wrong error is: ", err);
    }
}
export const connectWallet = async () => {
    try {
        if (!window.ethereum) return console.log("Install Metamask");

        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
        })
        const firstAcc = accounts[0];
        return firstAcc;
    } catch (err) {
        console.log("Something went wrong error is: ", err);
    }
}
export const fetchContract = (signerOrProvider) => new ethers.Contract(chatAppABI , chatAppAddress , signerOrProvider);

export const connectingWithContract = async () => {
    try {
        // Web3Modal is a library that provides a simple interface to connect 
        // to different wallet providers (like MetaMask, WalletConnect, etc.). 
        const web3modal = new Web3Modal(); 

        // This line prompts the user to connect their wallet. Always
        const connection = await web3modal.connect();

        //The connection object obtained in the previous step is passed 
        // to ethers.js to create a provider. A provider is an abstraction 
        // that allows you to interact with the Ethereum blockchain.
        const provider = new ethers.BrowserProvider(connection);

        // This is essentially the wallet account that you will use to send 
        // transactions or call functions on the smart contract. The getSigner 
        // method retrieves the first account connected to the provider.
        const signer = await provider.getSigner();

        // chatAppAddress: The deployed address of your smart contract on the 
        // Ethereum blockchain.

        // chatAppABI: The ABI (Application Binary Interface) of your smart 
        // contract, which defines the methods and structures of the contract. 
        // It acts as an interface for interacting with the contract.

        // signer: This is the account that will be used to call functions 
        // and send transactions to the contract.
        const contract = new ethers.Contract(
            chatAppAddress,
            chatAppABI,
            signer
        );

        return contract;
    } catch (error) {
        console.error("Contract connection error:", error);
        throw new Error("Failed to connect to the contract");
    }
};
export const convertTime = (time) => {
    const newTime = new Date(time.toNumber()) ;
    const realTime = 
    newTime.getHours() + ":" + newTime.getMinutes() + "  " + 
    newTime.getDate() + "/" + (newTime.getMonth()+1) + "/" + newTime.getFullYear() ; 

    return realTime ; 
}