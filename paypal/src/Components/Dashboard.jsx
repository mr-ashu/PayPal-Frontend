import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Avatar, Badge, Box, Button, Flex, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Create } from "./createtask";
import "./dashboard.css";

import { Sprint } from "./sprint";
import { Update } from "./update";
export const Dashboard = (id) => {
  const [sprint, setSprint] = useState([]);

  const { token, isAuth } = useSelector((store) => store.auth);

  const getdata = (id) => {
    axios
      .get(`https://paypal-u76c.onrender.com/v/sprint/task/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        setSprint(res.data);
      });
  };
  useEffect(() => {
    if (id !== "") {
      getdata(id);
    }
  }, [id]);

  const deleteitem = (tid) => {
    axios
      .delete(`https://paypal-u76c.onrender.com/v/sprint/task/${tid}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        getdata();
        alert("Delete sucess");
      });
  };

  return (
    <div>
      <div className="dashboard">
        <div>
          <Flex alignItems="center" gap="7px" className="heading">
            <Badge
              width="15px"
              height="15px"
              borderRadius="100%"
              colorScheme="purple"
            ></Badge>
            To Do
          </Flex>
          {isAuth
            ? sprint
                .filter((e) => e.status == "todo")
                .map((el) => (
                  <div className="inner">
                    <div>
                      <span>{el.name}</span>
                      <h3>{el.description}</h3>
                      <h3>{el.type}</h3>
                      <Flex gap="10px" alignItems="center" mt="7px">
                        <Avatar size="sm" name={el.assignee} />
                        <Text>{el.assignee}</Text>
                      </Flex>
                    </div>

                    <div className="icon">
                      <DeleteIcon onClick={() => deleteitem(el._id)} />
                      <Update id={el._id} update={getdata()} />
                    </div>
                  </div>
                ))
            : ""}
        </div>
        <div>
          <Flex alignItems="center" gap="7px" className="heading">
            <Badge
              width="15px"
              height="15px"
              borderRadius="100%"
              colorScheme="green"
            ></Badge>
            In Progress
          </Flex>
          {isAuth
            ? sprint
                .filter((e) => e.status == "progress")
                .map((el) => (
                  <div className="inner">
                    <div>
                      <span>{el.name}</span>
                      <h3>{el.description}</h3>
                      <h3>{el.type}</h3>
                      <Flex gap="10px" alignItems="center" mt="7px">
                        <Avatar size="sm" name={el.assignee} />
                        <Text>{el.assignee}</Text>
                      </Flex>
                    </div>

                    <div className="icon">
                      <DeleteIcon onClick={() => deleteitem(el._id)} />
                      <Update id={el._id} update={getdata()} />
                    </div>
                  </div>
                ))
            : ""}
        </div>
        <div>
          <Flex alignItems="center" gap="7px" className="heading">
            <Badge
              width="15px"
              height="15px"
              borderRadius="100%"
              colorScheme="red"
            ></Badge>
            Done
          </Flex>

          {isAuth
            ? sprint
                .filter((e) => e.status == "done")
                .map((el) => (
                  <div className="inner">
                    <div>
                      <span>{el.name}</span>
                      <h3>{el.description}</h3>
                      <h3>{el.type}</h3>
                      <Flex alignItems="center" mt="7px" gap="10px">
                        <Avatar size="sm" name={el.assignee} />
                        <Text>{el.assignee}</Text>
                      </Flex>
                    </div>

                    <div className="icon">
                      <DeleteIcon onClick={() => deleteitem(el._id)} />
                      <Update id={el._id} update={getdata()} />
                    </div>
                  </div>
                ))
            : ""}
        </div>
      </div>
    </div>
  );
};
