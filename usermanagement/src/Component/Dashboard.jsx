import {
  Box,
  Button,
  Flex,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import './mediaquery.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { wrap } from "framer-motion";

const Dashboard = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();
  let [data, setdata] = useState([]);
  let [id, setId] = useState(0);
  let toast = useToast();
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  let getData = async () => {
    try {
      let response = await axios.get(
        "https://my-json-server.typicode.com/s17200/s17200-userapi/users"
      );
      setdata(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch data. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  let [newData, setNewData] = useState({
    firstName: "",
    surName: "",
    email: "",
    department: "",
  });

  let [updated, setUpdated] = useState({
    firstName: "",
    surName: "",
    email: "",
    department: "",
  });

  let deleteFunction = async (id) => {
    try {
      await axios.delete(
        `https://my-json-server.typicode.com/s17200/s17200-userapi/users/${id}`
      );
      toast({
        title: `ID : ${id} Deleted Successfully.`,
        description: "We've Deleted User for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  let editFunction = async (id) => {
    try {
      let response = await axios.get(
        `https://my-json-server.typicode.com/s17200/s17200-userapi/users/${id}`
      );
      setUpdated(response.data);
      setId(id);
    } catch (error) {
      console.error("Error fetching user for editing:", error);
      toast({
        title: "Error",
        description: "Failed to fetch user for editing. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  let addFunction = async () => {
    try {
      await axios.post(
        "https://my-json-server.typicode.com/s17200/s17200-userapi/users",
        newData
      );
      toast({
        title: "User Added.",
        description: "We've Added New User For You",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error adding user:", error);
      toast({
        title: "Error",
        description: "Failed to add user. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  let handlechange = (e) => {
    let { name, value } = e.target;
    setNewData({
      ...newData,
      [name]: value,
    });
  };

  let handlechangeEdit = async (e) => {
    let { name, value } = e.target;
    setUpdated({
      ...updated,
      [name]: value,
    });
  };

  let handleEditsave = async () => {
    try {
      await axios.patch(
        `https://my-json-server.typicode.com/s17200/s17200-userapi/users/${id}`,
        {
          ...updated,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast({
        title: "User Edited.",
        description: "We've Edited your Details for you.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      onClose1();
    } catch (error) {
      console.error("Error updating user:", error);
      toast({
        title: "Error",
        description: "Failed to update user. Please try again later.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Button onClick={() => onOpen()}>
        <AddIcon />
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="firstName"
                onChange={handlechange}
                placeholder="First Name"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="surName"
                onChange={handlechange}
                placeholder="Last Name"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                onChange={handlechange}
                type="email"
                placeholder="Email"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Department</FormLabel>
              <Input
                name="department"
                onChange={handlechange}
                placeholder="Department"
              ></Input>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                addFunction();
                onClose();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit user</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>First Name</FormLabel>
              <Input
                name="name"
                value={updated.name}
                onChange={handlechangeEdit}
                placeholder="First Name"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Last Name</FormLabel>
              <Input
                name="surname"
                value={updated.surname}
                onChange={handlechangeEdit}
                placeholder="Last Name"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={updated.email}
                onChange={handlechangeEdit}
                type="email"
                placeholder="Email"
              ></Input>
            </Flex>
            <Flex direction={"column"} gap={3} p={2}>
              <FormLabel>Department</FormLabel>
              <Input
                name="department"
                value={updated.department}
                onChange={handlechangeEdit}
                placeholder="Department"
              ></Input>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={() => {
                handleEditsave();
                onClose1();
              }}
            >
              Save
            </Button>
            <Button variant="ghost" onClick={onClose1}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Flex flexWrap={wrap}>
      <Table border={"2px solid gray"}  className="chakra-table">
        <Thead>
          <Th>Id</Th>
          <Th>First Name</Th>
          <Th>Last Name</Th>
          <Th>Email</Th>
          <Th>Department</Th>
          <Th>Edit</Th>
          <Th>Delete</Th>
        </Thead>
        <Tbody>
          {currentItems.map((item, i) => {
            return (
              <Tr key={item.id}>
                <Td>{item.id}</Td>
                <Td>{item.name}</Td>
                <Td>{item.surname}</Td>
                <Td>{item.email}</Td>
                <Td>{item.department}</Td>
                <Td>
                  <Button
                    onClick={() => {
                      onOpen1();
                      editFunction(item.id);
                    }}
                  >
                    <EditIcon />
                  </Button>
                </Td>
                <Td>
                  <Button
                    onClick={() => {
                      deleteFunction(item.id);
                    }}
                  >
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      </Flex> 
      <Flex mt={5} justify="center">
        {Array.from({ length: Math.ceil(data.length / itemsPerPage) }).map(
          (_, index) => (
            <Button
              key={index}
              size="md"
              borderRadius={0}
              mx={1}
              onClick={() => paginate(index + 1)}
              colorScheme={
                currentPage === index + 1 ? "green" : "gray"
              }
            >
              {index + 1}
            </Button>
          )
        )}
      </Flex>

     
    </>
  );
};

export default Dashboard;
