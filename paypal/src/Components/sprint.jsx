import axios from "axios";
import React, { useEffect, useState } from "react";
import { CreateSprint } from "./createSprint";
import "./dashboard.css";
import {
  PhoneIcon,
  AddIcon,
  WarningIcon,
  ArrowUpDownIcon,
  DeleteIcon,
} from "@chakra-ui/icons";
import { Dashboard } from "./Dashboard";
import { Create } from "./createtask";
import { useSelector } from "react-redux";
import { Flex, Text } from "@chakra-ui/react";
export const Sprint = () => {
  const { token, isAuth } = useSelector((store) => store.auth);
  const [sprint, setsprint] = useState([]);
  const [sprinttask, setsprinttask] = useState([]);
  const [sprintid, setid] = useState("");

  const getsprint = () => {
    if (token) {
      axios
        .get(`http://localhost:8080/v/sprint`, {
          headers: {
            token: token,
          },
        })
        .then((res) => {
          setsprint(res.data);
        });
    }
  };

  useEffect(() => {
    getsprint();
  }, []);

  const handletask = (id) => {
    setid(id);
  };
  const deleteitem = (id) => {
    axios
      .delete(`https://paypal-u76c.onrender.com/v/sprint/${id}`, {
        headers: {
          token: token,
        },
      })
      .then((res) => {
        getsprint();
        alert("Delete sucess");
      });
  };

  return (
    <>
      <div className="sprint">
        {isAuth ? (
          sprint?.map((el) => (
            <div
              key={el._id}
              className="sprintbox"
              onClick={() => handletask(el._id)}
            >
              <Flex
                alignItems="center"
                justifyContent="space-evenly"
                gap="10px"
              >
                {" "}
                <Text color="teal" fontWeight="500" textTransform="uppercase">
                  {el.name}{" "}
                </Text>
                <DeleteIcon onClick={() => deleteitem(el._id)} />
              </Flex>
              <h5> {el.startDate}</h5>
              <ArrowUpDownIcon />
              <h5>{el.endDate}</h5>
            </div>
          ))
        ) : (
          <div>Please Login....</div>
        )}

        <CreateSprint data={getsprint} refresh={getsprint()} />
      </div>

      <Dashboard id={sprintid} />
      {isAuth ? <Create id={sprintid} /> : ""}
    </>
  );
};
