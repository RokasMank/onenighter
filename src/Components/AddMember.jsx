import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  MenuItem,
  TextField,
  FormControl,
  Select,
  InputLabel,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { getUsers } from "../Utils/user-axios-utils";
import groupClient from "../Utils/group-axios";
import { User } from "../User/User";

const currentUserId = sessionStorage.getItem(User.userID);

export const AddMember = ({ group, open, onClose }) => {
  const [usersArray, setUsersArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedUsers, setSelectedUsers] = useState([]);

  const getAvailableUsers = async (id) => {
    try {
      const client = groupClient();
      const response = await client.get(`users/${id}`);
  
      // Assuming your API responds with the created group data
      const data = response.data;
  
      return data;
    } catch (error) {
      console.error("Error creating group:", error);
  
      throw new Error(`Error creating group: ${error.message}`);
    }
  };

  const addToGroup = async (userId, groupId) => {
    try {
      const client = groupClient();
      const response = await client.patch(`${userId}/${groupId}`);
    
      // Assuming your API responds with the created group data
      const data = response.data;
  
      return data;
    } catch (error) {
        if (error.response && error.response.status === 401) {
            alert("You have don't have rights to add members :(");
          } else {
            console.error("Error creating group:", error);
          }
        }
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleUserSelect = (user) => {
    // Check if the user is not already in the selectedUsers array
    if (!selectedUsers.find((selectedUser) => selectedUser.id === user.id)) {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, user]);
    }
  };

  const handleUserDeselect = (userId) => {
    setSelectedUsers((prevSelectedUsers) =>
      prevSelectedUsers.filter((user) => user.id !== userId)
    );
  };

  const handleClose = () => {
    onClose();
  };

  const handleSubmit = async () => {
    try {
      // Perform your HTTP request here
      const userIds = selectedUsers.map(user => user.id);
      console.log(userIds)
      userIds.forEach(id => {
            addToGroup(id, group.id)
        });
      // Add any additional logic you need after a successful submit
      handleClose();
    }
     catch (error) {
      console.error("Error submitting form:", error);
      // Handle error scenarios here
      // You might want to display an error message to the user
    }
  };
  

  useEffect(() => {
    const fetchUsers = async (groupId) => {
        try {
          const response = await getAvailableUsers(groupId);
        setUsersArray(response)
        } catch (error) {
          console.error("Error fetching user groups:", error);
        }
      };
  
    fetchUsers(group.id);
  }, []); // Empty dependency array to run the effect once on mount


  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add member</DialogTitle>        
        <DialogContent>
          <List>
            {usersArray.map((user) => (
              <ListItem key={user.id}>
                <ListItemText primary={user.email} />
                <Button
                  variant="outlined"
                  onClick={() => handleUserSelect(user)}
                >
                  Add
                </Button>
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogContent>
          <div>
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.email}
                onDelete={() => handleUserDeselect(user.id)}
                color="primary"
                variant="outlined"
              />
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
