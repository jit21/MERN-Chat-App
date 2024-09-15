import React, { useState } from 'react'
import { VStack , FormControl,FormLabel} from '@chakra-ui/react'
import { Input,InputGroup,InputRightElement ,Button} from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const backendUrl="";
  const toast=useToast();
  const [show,setShow]=useState(false);
  const [loading,setLoading]=useState(false)
  
  const [email,setEmail]=useState();
  const [password,setPassword]=useState();
  const navigate=useNavigate();
  
  function handleClick(){
    setShow(!show);
  }
  
  const submitHandler= async()=>{
    setLoading(true);
    if(!email || !password){
        toast({
          title:"Please Fill all the fields",
          status:"warning",
          duration:5000,
          isClosable:true,
          position:"bottom"

        });
        setLoading(false);
        return;
    }

    console.log(email,password);

    try {
       const config={
        headers:{
          "Content-Type":"application/json",
        }
       };
       const {data}=await axios.post(`${backendUrl}/api/user/login`,{email,password},config);
       toast({
        title: 'Login success',  // Corrected here
        status: 'success',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");  // Updated here

    } catch (error) {
      toast({
        title: 'Error occurred.',
        description: 'Wrong cardential',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      setLoading(false);
    
    }
    
  }
  return (
    <VStack spacing={'5px'}>

   {/* Email */}
    <FormControl id='email' isRequired>
      <FormLabel>Email</FormLabel>
    
    <Input
    placeholder='Enter Your Email'
    value={email}
    onChange={(e)=>setEmail(e.target.value)}
    />
    </FormControl>

    {/* password */}
    <FormControl id='password' isRequired>
      <FormLabel>Password</FormLabel>
    
    <InputGroup>
    <Input
    type={show ? 'text':'password'}
    placeholder='Enter Your Password'
    value={password}

    onChange={(e)=>setPassword(e.target.value)}
    />
    <InputRightElement width={"4.5rem"}>
    <Button h='1.75rem' size='5m'onClick={handleClick}>
      {
        show ? 'Hide' : 'Show'
      }

    </Button>
    
    
    </InputRightElement>

    </InputGroup>
    
    </FormControl>

     {/* Submit button  */}
    <Button 
    colorScheme='blue'
    width="100%"
    style={{marginTop:15}}
    onClick={submitHandler}
    isLoading={loading}
    >
    Login
    </Button>

    {/* Guest user */}
    <Button 
    variant={'solid'}
    colorScheme='red'
    width="100%"
    style={{marginTop:15}}
    onClick={()=>{
      setEmail('guest@example.com');
      setPassword('123456');
    }}
    >
    Get Guest User Creadentials
    </Button>
  </VStack>
    
  )
}

export default Login
