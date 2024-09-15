import React from 'react'

import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import { ViewIcon } from '@chakra-ui/icons';
import { Image,Text } from '@chakra-ui/react';


const ProfileModel = ({user,children}) => {
    const {isOpen, onOpen,onClose}=useDisclosure();
  return (
    <div>
      {children ? <span onClick={onOpen}>{children}</span>: (<IconButton
      display={"flex"}
      icon={<ViewIcon></ViewIcon>}
      onClick={onOpen}
      />)}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent height={"410px"}>
          <ModalHeader
          fontSize={"40px"}
          fontFamily={"Work sans"}
          display={"flex"}
          justifyContent={"center"}
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          >
            <Image borderRadius={"full"}
            boxSize={"150px"}
            src={user.pic}
            alt={user.name}
            ></Image>
            <Text
            fontSize={{base:"28px",md:"30px"}}
            fontFamily={"Work sans"}
            
            >
                Email : {user.email}

            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            
          </ModalFooter>
        </ModalContent>
      </Modal>

    </div>
  )
}

export default ProfileModel
