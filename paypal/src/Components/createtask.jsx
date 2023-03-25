import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  TagLabel,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";

export const Create = (id) => {
  const OverlayOne = () => (
    <ModalOverlay
      bg="blackAlpha.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = React.useState(<OverlayOne />);
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [assignee, setassignee] = useState("");
  const [status, setstatus] = useState("");
  const [type, settype] = useState("");
 
  const createtask = () => {
    const i=id.id
    const payload = {
      name: title,
      description: desc,
      assignee: assignee,
      status: status,
      type: type,
    };
    console.log(payload);
    axios
      .post(`http://localhost:8080/sprint/${id}/tasks`, payload)
      .then((res) => {
        alert("sucess");
      });
  };
  return (
    <div>
      <Button
        position="fixed"
        bottom="20px"
        right="30px"
        onClick={() => {
          setOverlay(<OverlayOne />);
          onOpen();
        }}
      >
        Create Task
      </Button>

      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Create Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title"
              value={title}
              onChange={(e) => settitle(e.target.value)}
            />
            <Input
              mt="10px"
              placeholder="Description"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
            />
            <Input
              mt="10px"
              placeholder="Assignee"
              value={assignee}
              onChange={(e) => setassignee(e.target.value)}
            />
            <Input
              mt="10px"
              placeholder="Status"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
            />
            <Select
              mt="10px"
              placeholder="Type"
              value={type}
              onChange={(e) => settype(e.target.value)}
            >
              <option value="Bug">Bug</option>
              <option value="Feature">Feature</option>
              <option value="Story">Story</option>
            </Select>
          </ModalBody>
          <ModalFooter>
            <Button onClick={createtask}>Enter</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
