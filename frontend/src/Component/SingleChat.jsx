import React, { useEffect, useState } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box , flexbox, position, Spinner, Text, useToast} from '@chakra-ui/react';
import { IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender } from '../config/ChatLogics';
import ProfileModel from './Authentication/misslanius/ProfileModel';
import { getSenderFull } from '../config/ChatLogics';
import UpdatedGroupChatModal from './Authentication/misslanius/UpdatedGroupChatModal';
import { FormControl,Input } from '@chakra-ui/react';
import axios from 'axios';
import "./styles.css"
import ScrolableChat from './Authentication/misslanius/ScrolableChat';
import io from 'socket.io-client';
import Lottie from 'react-lottie'
import animationData from "../Animation/Animation - 1726404508867.json"
const ENDPOINT="http://localhost:5000";
var socket,selectedChatCompare;


const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const backendUrl = "";
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const { user, selectedChat, setSelectedChat,notification, setNotfication } = ChatState();
  const [socketConnected,setSocketConnected]=useState(false);
  const [typing,setTyping]= useState(false);
  const [isTyping,setIsTyping]=useState(false);
  const toast = useToast();
  

  const defaultOptions={
    loop:true,
    autoplay:true,
    animationData: animationData,
    redererSettings:{
      preserveAspectRatio:"xMidYMid slice"
    }
  }

  // Function to send a message
  // Handle message sending
const sendMessage = async (event) => {
  if (event.key === "Enter" && newMessage) {
    socket.emit("stop typing", selectedChat._id);

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      // Send the message to the server
      const { data } = await axios.post(
        `${backendUrl}/api/message`,
        {
          content: newMessage,  // Send the current message
          chatId: selectedChat._id,
        },
        config
      );

      setNewMessage("");  // Clear the input after sending the message
      setMessages((prevMessages) => [...prevMessages, data]);  // Update messages state
      socket.emit("new message", data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send the message",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "bottom",
      });
    }
  }
};
  useEffect(()=>{
  socket=io(ENDPOINT);
  socket.emit("setup",user);
  socket.on("connected",()=>setSocketConnected(true));
  socket.on('typing',()=>setIsTyping(true));
  socket.on('stop typing',()=>setIsTyping(false));
  },[])

  // Function to fetch messages for the selected chat
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);
      // Reset messages when fetching new chat messages
      const { data } = await axios.get(
        backendUrl + `/api/message/${selectedChat._id}`,
        config
      );
      setMessages([]);

      setMessages(data);  // Set the messages for the new chat

      console.log("data  : ",data);
      console.log("message :",messages);
      setLoading(false);
      socket.emit('join chat',selectedChat._id);
      
      
      
      
      

    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("Updated messages:", messages);
  }, [messages]);
  // Fetch messages when `selectedChat` changes
  useEffect(() => {
    fetchMessages();
    selectedChatCompare=selectedChat;
  }, [selectedChat]);  // Whenever the chat changes, fetch new messages
  
  useEffect(()=>{
    socket.on('message recived',(newMessageRecieved)=>{
      if(!selectedChatCompare || selectedChatCompare._id!==newMessageRecieved.chat._id){
          // give notification 
          if(!notification.includes(newMessageRecieved)){
            setNotfication([newMessageRecieved,...notification]);
            setFetchAgain(!fetchAgain);
          }


      }else{
        setMessages([...messages,newMessageRecieved])
      }
    })
  })
  console.log("notifications : ",notification);
let typingTimeoutRef;
  const typingHandler = (e) => {
    setNewMessage(e.target.value);
  
    // Typing indicator logic
    if (!socketConnected) return;
  
    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }
  
    // Stop typing after a delay
    let lastTypingTime = new Date().getTime();
    var timerLength = 3000;
  
    // Clear the previous timeout if the user keeps typing
    if (typingTimeoutRef) clearTimeout(typingTimeoutRef);
  
    typingTimeoutRef = setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };
  

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: "28px", md: "30px" }}
            pb={3}
            px={2}
            w={"100%"}
            fontFamily={"work sans"}
            display={"flex"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <IconButton
              display={"flex"}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat("")}
            />
            {!selectedChat.isGroupChat ? (
              <>
                {getSender(user, selectedChat.users)}
                <ProfileModel user={getSenderFull(user, selectedChat.users)} />
              </>
            ) : (
              <>
                {selectedChat.chatName.toUpperCase()}
                <UpdatedGroupChatModal
                  fetchAgain={fetchAgain}
                  setFetchAgain={setFetchAgain}
                  fetchMessages={fetchMessages}
                />
              </>
            )}
          </Text>

          <Box
            display={"flex"}
            flexDir={"column"}
            justifyContent={"flex-end"}
            p={3}
            bg={"#E8E8E8"}
            w={"100%"}
            h={"100%"}
            borderRadius={"lg"}
            overflowY={"hidden"}
          >
            {loading ? (
              <Spinner
                size={"xl"}
                w={20}
                h={20}
                alignSelf={"center"}
                margin={"auto"}
              />
            ) : (
              <div className="messages">
                <ScrolableChat messages={messages} />
              </div>
            )}
            <FormControl onKeyDown={sendMessage} isRequired mt={3}>
              {isTyping && <Box mb={2} display="flex" alignItems="center">
             <Lottie
              width={70}
              style={{ marginBottom: 0, marginLeft: 0 }}
               options={defaultOptions}
              />
            <Text ml={2}>Typing...</Text> {/* Optional typing text */}
          </Box>}
              <Input
                variant={"filled"}
                bg={"#E0E0E0"}
                placeholder="Enter a message"
                onChange={typingHandler}
                value={newMessage}
              />
            </FormControl>
          </Box>
        </>
      ) : (
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} h={"100%"}>
          <Text fontSize={"3xl"} pb={3} fontFamily={"work sans"}>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;



