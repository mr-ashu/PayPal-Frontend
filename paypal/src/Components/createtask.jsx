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
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

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
  const { token } = useSelector((store) => store.auth);
  const [user, setuser] = useState([]);
  const getuser = () => {
    axios.get(`https://paypal-u76c.onrender.com/user`).then((res) => {
      setuser(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    getuser();
  }, []);
  const createtask = () => {
    const payload = {
      name: title,
      description: desc,
      assignee: assignee,
      status: status,
      type: type,
    };

    if (id != "") {
      axios
        .post(`https://paypal-u76c.onrender.com/v/sprint/task/${id}`, payload, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          alert("sucess");
          onClose();
        });
    }
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
            <Select
              mt="10px"
              placeholder="Assignee"
              value={assignee}
              onChange={(e) => setassignee(e.target.value)}
            >
              {user?.map((el) => (
                <option value={el.name}>{el.name}</option>
              ))}
            </Select>
            <Select
              mt="10px"
              placeholder="Status"
              value={status}
              onChange={(e) => setstatus(e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="progress">Progress</option>
              <option value="done">Done</option>
            </Select>
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
