import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TagLabel, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

export const Login = () => {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
    
     
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
  return (
    <div>
       <Button
        onClick={() => {
          setOverlay(<OverlayOne />)
          onOpen()
        }}
      >
        Login
      </Button>
     
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <Input placeholder='Email'/>
             <Input mt="20px" placeholder='Password'/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 
        
    </div>
  )
}