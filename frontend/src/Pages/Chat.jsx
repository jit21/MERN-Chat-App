import React, { useEffect, useState } from 'react'
import axios from "axios"
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react'
import SideDrower from '../Component/Authentication/misslanius/SideDrower'
import ChatBox from "../Component/Authentication/misslanius/ChatBox"
import MyChats from "../Component/Authentication/misslanius/MyChats"

const Chat = () => {
  const {user} =ChatState();
  const [fetchAgain,setFetchAgain]=useState(false)


  return (
    <div style= {{width:"100%"}}>
     {user && <SideDrower/>}
     <Box
      display="flex"
      justifyContent='space-between'
      w='100%'
      h='91.5vh'
      p='10px'
     >
      {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
      {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>}
     </Box>
    </div>
  )
}

export default Chat
