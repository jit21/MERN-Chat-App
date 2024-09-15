import React from 'react'
import { IconButton, Spinner, useDisclosure, useToast } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react';
import UserBatchItem from '../avatar/UserBatchItem'
import { FormControl } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { ChatState } from '../../../Context/ChatProvider';
import { useState } from 'react';
import { Box } from '@chakra-ui/react';
import axios from "axios"
import UserListItem from '../avatar/UserListItem';

const UpdatedGroupChatModal = ({fetchAgain,setFetchAgain,fetchMessages}) => {
    const backandUrl="";
    const {selectedChat,setSelectedChat,user}=ChatState();
    const [groupChatName,setGroupChatName]=useState();
    const [searchResult,setSearchResult]=useState([]);
    const [search,setSearch]=useState("");
    const [loading,setLoading]=useState(false)
    const [renameLoading,setRenameLoading]=useState(false);
    const toast=useToast()

    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleRemove= async(user1)=>{
      if(selectedChat.groupAdmin._id!==user._id){
        toast({
          title:"only admins can remove someone!",
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom"
        });
        return;
      }

      try {
        setLoading(true);
        const config={
          headers:{
            Authorization:`Bearer ${user.token}`
          }
        };
        const {data}=await axios.put(backandUrl+`/api/chat/groupremove`,{
          chatId:selectedChat._id,
          userId:user1._id
        },config);

        user1._id===user._id ? setSelectedChat():setSelectedChat(data);
        fetchMessages();
        setFetchAgain(!fetchAgain);
        setLoading(false)
        
      } catch (error) {
        toast({
          title:"Failed to remove user!",
          description:error.response.data.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"bottom"
        });
        setLoading(false);
        
      }


    }
    const handleRename= async ()=>{
      if(!groupChatName){
        return;
      }
      try {
        setRenameLoading(true);
        const config={
          headers:{
            Authorization: `Bearer ${user.token}`,
          }
        }
        const {data}=await axios.put(backandUrl+`/api/chat/rename`,{
          chatId:selectedChat._id,
          chatName:groupChatName
        },config);
        setSelectedChat(data);
        setFetchAgain(!fetchAgain);
        setRenameLoading(false);
      } catch (error) {
        toast({
          title: "Failed to rename the group",
          description: error.response.data.message,
          status: "error",
          duration: 5000,
          isClosable: true,
          position:"buttom"
        })
        setRenameLoading(false);

      }
      setGroupChatName("");

    }

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
          const {data}=await axios.get(backandUrl+`/api/user?search=${search}`,config);
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
  const handleAddUser= async(user1)=>{
    if(selectedChat.users.find((u)=>u._id===user1._id)){
      toast({
        title:"User Alredy in group!",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
      return;
    }

    if(selectedChat.groupAdmin._id!==user._id){
      toast({
        title:"only admins can add someone",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      });
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data}=await axios.put(backandUrl+'/api/chat/groupadd',{
        chatId:selectedChat._id,
        userId:user1._id
      },config);


      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      toast({
        title:"Failed to add user",
        status:"error",
        duration:5000,
        isClosable:true,
        position:"bottom"
      })
      setLoading(false);
      
    }


  }
  return (
    <>
      <IconButton display={{base:"flex"}} onClick={onOpen} icon={<ViewIcon/>}/>

      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
           fontSize={"25px"}
           fontFamily={"work sans"}
           justifyContent={"center"}

          
          >{selectedChat.chatName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box w={"100%"} display={"flex"} flexWrap={"wrap"} pb={3}>
                {
                    selectedChat.users.map(u=>(
                        <UserBatchItem key={user._id} user={u} handleFunction={()=>handleRemove(u)}/>
                    ))
                }
            </Box>
            <FormControl display={"flex"}>
              <Input placeholder='Chat Name'
              mb={3}
              value={groupChatName}
              onChange={(e)=>setGroupChatName(e.target.value)}
              />
              <Button 
              variant={"solid"}
              colorScheme='teal'
              ml={1}
              isLoading={renameLoading}
              onClick={handleRename}
              >
                Update
              </Button>
              
         

            </FormControl>
            <FormControl>
              <Input placeholder='Add user to the group'
              mb={1}
              onChange={(e)=>handleSearch(e.target.value)}
              />
              
            </FormControl>
            {
              loading ?(
                <Spinner size={"lg"}/>
              ):(
                searchResult?.map((user)=>(
                  <UserListItem 
                   key={user._id}
                   user={user}
                   handleFunction={()=>handleAddUser(user)}/>
                  
                ))
              )
            }
            

           
          </ModalBody>

          <ModalFooter>
            <Button onClick={()=>handleRemove(user)} colorScheme='red'>
              Leave Group
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default UpdatedGroupChatModal
