import React, { useState } from 'react';
import { VStack, FormControl, FormLabel } from '@chakra-ui/react';
import { Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react';
import { useToast } from '@chakra-ui/react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';




const SignUp = () => {
  const backendUrl = "";
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [confirmpassword, setConfirmpassword] = useState();
  const [password, setPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();  // Updated here

  function handleClick() {
    setShow(!show);
  }

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: 'Please select an image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      setLoading(false);
      return;
    }

    if (pics.type === "image/jpeg" || pics.type === 'image/png') {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chatt-app");
      data.append("cloud_name", "coderjit");
      fetch("https://api.cloudinary.com/v1_1/coderjit/image/upload", {
        method: "post",
        body: data
      }).then((res) => res.json()).then((data) => {
        setPic(data.url.toString());
        setLoading(false);
      }).catch((err) => {
        console.log(err);
        setLoading(false);
      });
    } else {
      toast({
        title: 'Please select an image.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      setLoading(false);
      return;
    }
  }

  const submitHandler = async () => {
    setLoading(true);

    if (!name || !email || !password || !confirmpassword) {
      toast({
        title: 'Please fill all the fields.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: 'Passwords do not match.',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: "bottom"  // Corrected here
      });
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        },
      };
      
      
      const { data } = await axios.post(backendUrl+"/api/user", { name, email, password, pic }, config);

      toast({
        title: 'Registration success',  // Corrected here
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
        description: 'An error occurred during registration.',
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
      {/* Name */}
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder='Enter Your Name'
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      {/* Email */}
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder='Enter Your Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      {/* Password */}
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h='1.75rem' size='sm' onClick={handleClick}>  {/* Corrected here */}
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Confirm Password */}
      <FormControl id='confirm-password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            placeholder='Enter Your Password'
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width={"4.5rem"}>
            <Button h='1.75rem' size='sm' onClick={handleClick}>  {/* Corrected here */}
              {show ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      {/* Picture Upload */}
      <FormControl id='pic'>
        <FormLabel>Upload your picture</FormLabel>
        <Input
          type='file'
          p={1.5}
          accept='image/*'
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      {/* Submit Button */}
      <Button
        colorScheme='blue'
        width="100%"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp;
