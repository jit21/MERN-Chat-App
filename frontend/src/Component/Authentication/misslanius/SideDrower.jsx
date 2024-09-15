
import React, { useState } from 'react'
import { Box, DrawerContent, DrawerOverlay, position, Spinner, Toast, useToast } from '@chakra-ui/react';
import { Tooltip } from '@chakra-ui/react';
import { Button,Text } from '@chakra-ui/react';
import { Menu,MenuButton,MenuList,MenuDivider,MenuItem } from '@chakra-ui/react';
import {BellIcon, ChevronDownIcon} from "@chakra-ui/icons"
import { Avatar } from '@chakra-ui/react';
import { ChatState } from '../../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useNavigate } from 'react-router-dom';
import { Drawer, DrawerHeader ,DrawerBody} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import axios from 'axios';
import ChatLoading from './ChatLoading';
import UserListItem from '../avatar/UserListItem';
import { getSender } from '../../../config/ChatLogics';
import NotificationBadge from 'react-notification-badge';
import { Effect } from 'react-notification-badge';


const SideDrower = () => {
  const backandUrl="";
  const [search,setSearch]=useState("");
  const [searachResult,setSearchResult]=useState([]);
  const [loading,setLoading]=useState(false);
  const [loadingChat,setLoadingChat]=useState(false);
  const {user, setSelectedChat,chats,setChats,notification, setNotfication} =ChatState();
  
  
  const {isOpen, onOpen,onClose}=useDisclosure();
  const history=useNavigate();
  const logOutHandler=()=>{
    localStorage.removeItem('userInfo');
    history("/") 
  }
  const toast=useToast();
const handleSearch= async ()=>{
  if(!search){
    toast({
     
     title:"plaese Enter Something in the search",
     status:"warning",
     duration:5000,
     isClosable:true,
     position: "top-left"


    })
    return;
  }

  try {
    setLoading(true);
    const config={
      headers:{
        Authorization:`Bearer ${user.token}`,
      }

    };
    const {data}= await axios.get(backandUrl+`/api/user?search=${search}`,config);
    
    setLoading(false);
    setSearchResult(data);

  } catch (error) {
    toast({
      title:"Error",
      status:"error",
      duration:5000,
      description:"Failed to load the search result",
      position:"bottom-left",
      isClosable:true
    });
  }
}

const accessChat= async (userId)=>{

  try {
    setLoadingChat(true);
    const config={
      headers:{
        "Content-type":"application/json",
        Authorization:`Bearer ${user.token}`,
      },
    }
    const {data}=await axios.post(backandUrl+`/api/chat`,{userId},config);
    if(!chats.find((c)=>c._id===data._id)){
      setChats([data,...chats]);
    }
    setSelectedChat(data);
    setLoadingChat(false);
    onClose();

  } catch (error) {
    toast({
      title:"Error",
      status:"error",
      duration:5000,
      description:"Failed to load the search result",
      position:"bottom-left",
      isClosable:true
    });
    
  }

}
  return (
    <div>
      <Box
       display={"flex"}
       justifyContent={"space-between"}
       alignItems={"center"}
       bg={"white"}
       w={"100%"}
       p={"5px 10px 5px 10px"}
       borderWidth={"5px"}
      
      >
        <Tooltip label="Search User to chat" hasArrow placement='bottom-end'>
          <Button variant={"ghost"} onClick={onOpen}>
          <i className="fa-solid fa-magnifying-glass"></i>
          <Text
      display={{ base: "none", md: "flex" }}
      px={'4'}
    >
      Search User
    </Text>

          </Button>

        </Tooltip>
        <Text fontSize={'2xl'} fontFamily={"work-sans"}>
          Let's Start Chat
        </Text>
        <div>
          <Menu>
            
            <MenuButton p={1}>
              <NotificationBadge 
              count={notification.length}
              effect={Effect.SCALE}
              />
              <BellIcon fontSize={"2xl"} m={1}/>
            
            </MenuButton>
            <MenuList pl={4}>
             { !notification.length && "No New Messages"}
             {notification.map(notif=>(
              <MenuItem key={notif._id} onClick={()=>{
                setSelectedChat(notif.chat);
                setNotfication(notification.filter((n)=>n!==notif))
                }}>
                {notif.chat.isGroupChat ? `New Message in ${notif.chat.chatName}`: `New Message from ${getSender(user,notif.chat.users)}`}
              
              </MenuItem>
             ))}

            </MenuList>
          </Menu>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>

            <Avatar size="sm" cursor={"pointer"} name={user.name} src={user.pic}></Avatar>

            </MenuButton>

            <MenuList>
            <ProfileModel user={user}>

              <MenuItem >My Profile</MenuItem>
             </ProfileModel> 
              <MenuDivider></MenuDivider>
              
              <MenuItem onClick={logOutHandler}>Logout</MenuItem>

            </MenuList>
          </Menu>
          
        </div>
      </Box>

      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>

          <DrawerHeader borderBottomWidth="1px" >Search Users</DrawerHeader>
          <DrawerBody>
          <Box
          display={"flex"}
          paddingBottom={2}
          >
            <Input placeholder="Search by name or email"
            margin={2}
            value={search}
            onChange={(e)=>setSearch(e.target.value)}
/>
            <Button 
            onClick={handleSearch}
            >Go</Button>
          </Box>
          {
            loading ? (
              <ChatLoading/>
            ):(
              searachResult?.map(user=>(
                <UserListItem key={user._id} user={user} 
                handleFunction={()=>accessChat(user._id)}
                />
              ))
            )
          }
          { loadingChat && <Spinner ml={"auto"} display={'flex'}/>}
        </DrawerBody>
        </DrawerContent>

        
        

      </Drawer>
    </div>
  )
}

export default SideDrower
