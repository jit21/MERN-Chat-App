import React, { useEffect } from 'react';
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Login from '../Component/Authentication/Login';
import SignUp from '../Component/Authentication/SignUp';
import { useNavigate } from 'react-router-dom';
import { ChatState } from '../Context/ChatProvider'; // Import ChatState to access user context

const HomePage = () => {
  const history = useNavigate();
  const { user } = ChatState(); // Access user from the context

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    if (userInfo) {
      history("/chats");
    }
  }, [history]);

  return (
    <Container maxW={'xl'} centerContent>
      <Box
        d='flex'
        justifyContent='center'
        p={3}
        bg={'gray'}
        textColor={"white"}
        w="100%"
        m={"40px 0 15px 0"}
        borderRadius={'30px'}
        textAlign={'center'}
      >
        <Text>Let's Start Chat</Text>
      </Box>
      <Box
        bg={'white'}
        w={'100%'}
        p={4}
        borderRadius={'10px'}
        borderWidth={'1px'}
      >
        <Tabs variant='soft-rounded'>
          <TabList mb={'1em'}>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {/* Login Page */}
              <Login />
            </TabPanel>
            <TabPanel>
              {/* Sign Up Page */}
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
