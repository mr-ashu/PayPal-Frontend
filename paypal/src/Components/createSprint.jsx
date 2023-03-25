import {
  Button,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from "axios"
export const CreateSprint = () => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
   const [title,settitle]=useState("")
   const [sdate ,setsdate] =useState("")
   const [edate, setedate] =useState("")   
 

  const handlecreate=(e)=>{
  const   payload={
       name:title,
       startDate:sdate,
       endDate:edate
    }

    axios.post(`http://localhost:8080/sprint`,payload)
    .then((res)=>{
       alert("sucess")
        onClose()
    })

  }
  return (
    <div>
      <Button
       height="100%"
       padding="10px"

        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        + <br /> New <br /> Sprint
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>New Sprint</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Title</FormLabel>
            <Input value={title} onChange={(e)=>settitle(e.target.value)} placeholder="Title" />
            <FormLabel mt="5px">Start Date</FormLabel>
            <Input value={sdate} onChange={(e)=>setsdate(e.target.value)} type="date" />
            <FormLabel mt="5px">End Date</FormLabel>
            <Input value={edate} onChange={(e)=>setedate(e.target.value)} type="date" />
          </ModalBody>
          <ModalFooter>
            <Button onClick={handlecreate}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
