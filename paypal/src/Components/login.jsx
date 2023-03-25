import { Button, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, TagLabel, Text, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {login} from '../Redux/login.action';
import { SIGN_OUT } from '../Redux/login.type';

export const Login = () => {
    const OverlayOne = () => (
        <ModalOverlay
          bg='blackAlpha.300'
          backdropFilter='blur(10px) hue-rotate(90deg)'
        />
      )
      const [email,setemail]=useState("")
      const [password,setpassword]=useState("")
      const { isOpen, onOpen, onClose } = useDisclosure()
      const [overlay, setOverlay] = React.useState(<OverlayOne />)
      const dispatch = useDispatch();
      const {isAuth} =useSelector((store)=>store.auth)
  console.log(isAuth);

      const loginaction=()=>{
        const payload={
          email,
         password
        }
        dispatch(login(payload))
        .then((res)=>{
          
          onClose()
        })
      

     }

     const logoutclick=()=>{
      dispatch({ type:SIGN_OUT })
      alert("logout sucess")
     }
  return (
    <div>

      {
        isAuth?(<Button
          onClick={ 
          logoutclick
          }
        >
          Logout
        </Button>):(
            <Button
            onClick={() => {
              setOverlay(<OverlayOne />)
              onOpen()
            }}
          >
            Login
          </Button>
        )
      }
     
     
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <Input value={email} onChange={(e)=>setemail(e.target.value)} mt="20px" placeholder='Email'/>
 
           <Input value={password} onChange={(e)=>setpassword(e.target.value)} mt="20px" placeholder='Password'/>
          </ModalBody>
          <ModalFooter>
            <Button onClick={loginaction}>Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
 
        
    </div>
  )
}
