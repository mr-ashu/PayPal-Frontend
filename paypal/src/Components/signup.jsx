import { Avatar, Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

export const Signup = () => {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
    
     
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
      const [name,setname]=useState("")
      const [email,setemail]=useState("")
      const [password,setpassword]=useState("")
      const    store =useSelector((store)=>store.auth)
      const signup=()=>{
         const payload={
          name,
          email,
          password
         }

         axios.post(`https://paypal-u76c.onrender.com/user/signup`,payload)
         .then((res)=>{
          alert("sucess")
          onClose()
         })
      }
 
  return (
    <div>
      {
        store.isAuth?<Avatar size="md"  />:(
          <Button
          onClick={() => {
            setOverlay(<OverlayOne />)
            onOpen()
          }}
        >
          Sign up
        </Button>
        )
      }
     
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input value={name} onChange={(e)=>setname(e.target.value)} placeholder='Name'/>
             <Input value={email} onChange={(e)=>setemail(e.target.value)} mt="20px" placeholder='Email'/>
 
             <Input value={password} onChange={(e)=>setpassword(e.target.value)} mt="20px" placeholder='Password'/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={signup}>Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 
        
    </div>
  )
}
