// SPDX-License-Identifier: UNLICENSED  

pragma solidity ^0.8.24;
import "hardhat/console.sol";

contract ChatApp{
    struct user{
        string name ;
        address[] friendList ; 
        string avatarID ;
    }
    struct message{
        address sender ; 
        uint256 timestamp ; 
        string msg ; 
    }
    struct allUserStruct{
        string name ;  
        address accountAddress ; 
        string avatarID ; 
    }

    allUserStruct[] allUsers ; 

    mapping(address => user) userList ; 
    mapping(bytes32 => message[]) allMessages ; 


    function checkUserExists(address publicKey) public view returns (bool){
        return bytes(userList[publicKey].name).length > 0 ; 
    }
    function getAvatarID(address publicKey) public view returns (string memory) {
        require(checkUserExists(publicKey), "User does not exists.") ;
        bytes memory str = bytes(userList[publicKey].avatarID) ; 
        if(str.length == 0){
            return "" ; 
        }
        return userList[publicKey].avatarID ; 
    }
    function updateAvatarID(address pubkey , string memory inputAvatarID) public{
        userList[pubkey].avatarID = inputAvatarID ; 
        return ; 
    }

    function createAccount(string calldata name) external{
        require(checkUserExists(msg.sender) == false , "User Already Exists !!");
        require(bytes(name).length > 0 , "Username can not be empty !!") ; 
        
        userList[msg.sender].name = name ; 
        allUsers.push(allUserStruct(name , msg.sender , "")) ; 
    }

    function getUsername(address publicKey)public view returns (string memory){
        console.log("The user is there %s" , publicKey) ; 
        if(!checkUserExists(publicKey)){
            return "" ; 
        }
        return userList[publicKey].name ; 
    }

    function getUser(address publicKey) public view returns (user memory){
        return userList[publicKey] ; 
    }
    
    function _checkAlreadyAFriend(address key1 , address key2) internal view returns(bool){
        user storage user1 = userList[key1];
        for(uint256 i = 0 ; i < user1.friendList.length ; i ++){
            if(user1.friendList[i] == key2){
                return true ; 
            }
        }
        return false ; 
    }

    function _addFriend(address me, address friend_key) internal {
        userList[me].friendList.push(friend_key);
    }

    function addFriend(address friend_key) external {
        require(checkUserExists(msg.sender), "Create an account first!");
        require(checkUserExists(friend_key), "User is not registered!");
        require(msg.sender!=friend_key, "Users cannot add themselves as friends!");
        require(_checkAlreadyAFriend(msg.sender,friend_key)==false, "These users are already friends!");

        _addFriend(msg.sender, friend_key);
        _addFriend(friend_key, msg.sender);
    }

    function getMyFriends() external view returns(address[] memory) {
        return userList[msg.sender].friendList  ; 
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
        allUserStruct[] memory arr =  allUsers ; 
        for(uint i = 0 ; i < arr.length ; i ++){
            string memory avatarIDCur = getAvatarID(arr[i].accountAddress); 
            arr[i].avatarID = avatarIDCur ; 
        }
        return arr ; 
    }
}