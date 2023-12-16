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
import { getThemes } from "../Utils/theme-axios";
import { getUsers } from "../Utils/user-axios-utils";

export const CreateGroup = ({ open, onClose, onSubmit }) => {
  const [email, setGroupName] = useState("");
  const [selectedTheme, setSelectedTheme] = useState('');
  const [themesArray, setThemesArray] = useState([]);
  const [usersArray, setUsersArray] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [filteredThemes, setFilteredThemes] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleThemeChange = (event) => {
    setSelectedTheme(event.target.value);
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

  const handleSubmit = () => {
    // You can perform any necessary validation here before submitting
    onSubmit({ email, selectedTheme, selectedUsers });
    handleClose();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await getUsers();
        if (response !== null) {
          const users = response.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
          }));
          setUsersArray(users);
          setFilteredUsers(users);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchThemes = async () => {
      try {
        const response = await getThemes();
        if (response !== null) {
          const themes = response.map((theme) => ({
            id: theme.id,
            name: theme.name,
          }));
          setThemesArray(themes);
          setFilteredThemes(themes);
        }
      } catch (error) {
        console.error('Error fetching themes:', error);
      }
    };

    fetchThemes();
    fetchUsers();
  }, []); // Empty dependency array to run the effect once on mount

  useEffect(() => {
    // Filter themes based on searchValue
    const filteredThemes = themesArray.filter((theme) =>
      theme.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredThemes(filteredThemes);

    // Filter users based on searchValue
    const filteredUsers = usersArray.filter((user) =>
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredUsers(filteredUsers);
  }, [searchValue, themesArray, usersArray]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new group</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="groupName"
            label="Group name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setGroupName(e.target.value)}
          />
        </DialogContent>
        <DialogContent>
          <FormControl fullWidth variant="standard">
            <InputLabel id="theme-label">Select theme</InputLabel>
            <Select
              labelId="theme-label"
              id="theme"
              value={selectedTheme}
              onChange={handleThemeChange}
            >
              {filteredThemes.map((theme) => (
                <MenuItem key={theme.id} value={theme.id}>
                  {theme.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogContent>
        <InputLabel id="friend-label">Add your friends</InputLabel>

          <List>
            {filteredUsers.map((user) => (
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
