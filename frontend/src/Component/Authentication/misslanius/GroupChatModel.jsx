import React, { useState } from 'react'
import { useDisclosure, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { FormControl,Input } from '@chakra-ui/react'
import UserBatchItem from '../avatar/UserBatchItem'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ChatState } from '../../../Context/ChatProvider'
import axios from 'axios'
import UserListItem from '../avatar/UserListItem'
import { Box } from '@chakra-ui/react'

const GroupChatModel = ({children}) => {
    const backendUrl="";
    const {isOpen,onOpen,onClose}=useDisclosure();
    const [groupChatName,setGroupChatName]=useState();
    const [selectedUsers,setSelectedUsers]=useState([]);
    const [search,setSearch]=useState("");
    const[searchResult,setSearchResult]=useState([]);
    const [loading,setLoading]=useState(false);
    const toast=useToast()
    const {user,chats,setChats}=ChatState();
    const handleSearch=async(query)=>{
        setSearch(query);
        if(!query){
            return;
        }

        try {
            setLoading(true);
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            };
            const {data}=await axios.get(backendUrl+`/api/user?search=${search}`,config);
            console.log(data);
            
            setLoading(false);
            setSearchResult(data);
            
        } catch (error) {
            toast({
                title:"Error",
                description:"Failed to load the search result",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom-left"
            })
            
        }

    }
    const handleSubmit=async()=>{
        if(!groupChatName||selectedUsers.length<2){
            toast({

                title:"Please Fill all the field and selaect at least two memeber",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top"

            })
            return;
        }
        try {
            const config={
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            };
            const {data}=await axios.post(backendUrl+`/api/chat/group`,
                {name:groupChatName,
                 users:JSON.stringify(selectedUsers.map(u=>u._id)),   
                },config
            )
            setChats([data,...chats])
            onClose();
            toast({
                title:"New Group chat is created!",
                status:"success",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
            
        } catch (error) {
            toast({
                title:"Error",
                status:"error",
                duration:5000,
                isClosable:true,
                position:"bottom"
            })
        }

    }
    const handleGroup=(userToAdd)=>{
        if(selectedUsers.includes(userToAdd)){
            toast({
                title:"User Alredy added",
                status:"warning",
                duration:5000,
                isClosable:true,
                position:"top"

            });
            return
        }
        setSelectedUsers([...selectedUsers,userToAdd])

    }
    const handleDelete=(delUser)=>{
        setSelectedUsers(selectedUsers.filter(sel=>sel._id!==delUser._id))

    }
    return (
        <>
        <Button onClick={onOpen}>{children}</Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader 
            fontSize={"35px"}
            display={"flex"}
            justifyContent={"center"}
            >Create Group Chat</ModalHeader>
            <ModalCloseButton />
            <ModalBody
            display={"flex"}
            flexDir={"column"}
            alignItems={"center"}
            >
                <FormControl>
                    <Input placeholder={"Chat Name"}
                    mb={3}
                    onChange={(e)=>setGroupChatName(e.target.value)}
                    
                    />

                </FormControl>

                <FormControl>
                    <Input placeholder={"Add user eg: Jhon,Dip,Sakil"}
                    mb={1}
                    onChange={(e)=>handleSearch(e.target.value)}
                    
                    />

                </FormControl>
                {/* selected user */}
                {/* rendered Serach user  */}
                <Box w={"100%"} display={"flex"} flexWrap={"wrap"}>
                {
                    selectedUsers.map(u=>(
                        <UserBatchItem key={user._id} user={u} handleFunction={()=>handleDelete(u)}/>
                    ))
                }
                </Box>

                {loading ? <div> loading</div>:(
                    searchResult?.slice(0,4).map(user=>(
                        <UserListItem key={user._id} user={user} 
                        handleFunction={()=>handleGroup(user)}
                        />
                    ))
                )
                
                
                
                }
             
            </ModalBody>
  
            <ModalFooter>
              <Button colorScheme='blue' onClick={handleSubmit}>
                Create Chat
              </Button>
              
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
      )
    }
  


export default GroupChatModel
