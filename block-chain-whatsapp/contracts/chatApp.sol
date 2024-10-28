// SPDX-License-Identifier: UNLICENSED  

pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract ChatApp{
    struct friend{
        address pubkey ; 
        string name ; 
    }
    struct user{
        string name ;
        friend[] friendList ; 
    }
    struct message{
        address sender ; 
        uint256 timestamp ; 
        string msg ; 
    }
    struct allUserStruct{
        string name ;  
        address accountAddress ; 
    }

    allUserStruct[] allUsers ; 

    mapping(address => user) userList ; 
    mapping(bytes32 => message[]) allMessages ; 


    function checkUserExists(address publicKey) public view returns (bool){
        return bytes(userList[publicKey].name).length > 0 ; 
    }

    function createAccount(string calldata name) external{
        require(checkUserExists(msg.sender) == false , "User Already Exists !!");
        require(bytes(name).length > 0 , "Username can not be empty !!") ; 
        
        userList[msg.sender].name = name ; 
        allUsers.push(allUserStruct(name , msg.sender)) ; 
    }

    function getUsername(address publicKey)public view returns (string memory){
        console.log("The user is there %s" , publicKey) ; 
        if(!checkUserExists(publicKey)){
            return "" ; 
        }
        return userList[publicKey].name ; 
    }
    
    function _checkAlreadyAFriend(address key1 , address key2) internal view returns(bool){
        user storage user1 = userList[key1];
        for(uint256 i = 0 ; i < user1.friendList.length ; i ++){
            if(user1.friendList[i].pubkey == key2){
                return true ; 
            }
        }
        return false ; 
    }

    function _addFriend(address me, address friend_key, string memory name) internal {
        friend memory newFriend = friend(friend_key,name);
        userList[me].friendList.push(newFriend);
    }

    function addFriend(address friend_key, string calldata name) external {
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender!=friend_key, "Users cannot add themselves as friends!");
        require(_checkAlreadyAFriend(msg.sender,friend_key)==false, "These users are already friends!");

        _addFriend(msg.sender, friend_key, name);
        _addFriend(friend_key, msg.sender, userList[msg.sender].name);
    }

    function getMyFriends() external view returns(friend[] memory) {
        friend[] memory arr = userList[msg.sender].friendList ; 
        return arr ; 
    }

    function _getChatCode(address publicKey1 , address publicKey2) internal pure returns(bytes32){
        // Ensure the addresses are ordered to prevent duplicates (e.g., A-B vs B-A)
        // eg A > B if fn(A,B) then hash will be of AB say its X 
        // if fn(B,A) then also hash will be X.
        if(publicKey1 < publicKey2){
            return keccak256(abi.encodePacked(publicKey1 , publicKey2)) ; 
        }
        return keccak256(abi.encodePacked(publicKey2 , publicKey1)) ; 
    }

    function sendMessage(address friends_key , string calldata _msg) external{
        require(checkUserExists(msg.sender) , "Create an account first !!") ; 
        require(checkUserExists(friends_key) , "User doesn't exists !!") ; 
        require(_checkAlreadyAFriend(msg.sender, friends_key) , "You are not a friend with the given user.");   
        require(bytes(_msg).length > 0 , "Please enter a message !!") ;  
           
        message memory newMsg = message(msg.sender , block.timestamp , _msg) ;

        bytes32 chatCode = _getChatCode(friends_key, msg.sender);
        allMessages[chatCode].push(newMsg); 
    }

    function readMessage(address friends_key) external view returns(message[] memory){
        bytes32 chatCode = _getChatCode(msg.sender, friends_key);
        return allMessages[chatCode] ; 
    }

    function getAllRegisteredUser() external view returns(allUserStruct[] memory){
        return allUsers ; 
        // require(checkUserExists(msg.sender) , "Access Denied !!") ; 
    }
}