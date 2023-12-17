import React, { useState, useEffect } from 'react';
import { Container, Grid, List, ListItem, Button } from '@mui/material';
import { CreateGroup } from '../Components/CreateGroup';
import { getUserGroups } from '../Utils/group-axios';
import { User } from '../User/User';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

const GroupsPage = () => {
  const theme = useTheme();
  const navigator = useNavigate();


  const [groups, setGroups] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserGroups = async (userId) => {
      try {
        const response = await getUserGroups(userId);
        console.log(response);
        if (response.length > 0) {
          setGroups(response);
          setLoading(false); // Set loading to false when data is available

        }
      } catch (error) {
        console.error("Error fetching user groups:", error);
        setLoading(false); // Set loading to false on error as well
        // Handle error scenarios here
      }
    };

    fetchUserGroups(sessionStorage.getItem(User.userID));
  }, []);

  const handleGroupClick = (group) => {
    setSelectedChat(group);
    navigator(`/group/${group.id}`, { state: { group } }); // Adjust the route structure as needed
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleFormSubmit = (email) => {
    // Perform actions with the submitted email
    console.log('Submitted email:', email);
  };

  console.log(groups);

  if (loading) {
    return <p>Loading groups...</p>;
  }

  return (
    <Container>
      <Grid container>
        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" onClick={handleOpenDialog}>
            Create Group
          </Button>
        </Grid>
        {/* Chat List */}
        <Grid item xs={12} sm={6} md={8} lg={12}>
          {groups && groups.length > 0 ? (
            <List>
              {groups.map((group, index) => (
                <ListItem
                  key={group.id}
                  sx={{
                    borderBottom: index !== groups.length - 1 ? '2px solid #ccc' : 'none',
                    padding: '8px 0', // Adjust the padding as needed
                    [theme.breakpoints.down('xs')]: {
                      borderBottom: '2px solid #ccc',
                    },
                  }}
                >
                  <div>
                    <p style={{ margin: 2 }}>Group: {group.groupName}</p>
                    <p style={{ margin: 2 }}>Theme: {group.theme.name}</p>
                    <Button onClick={() => handleGroupClick(group)}>
                      Open group
                    </Button>
                  </div>
                </ListItem>
              ))}
            </List>
          ) : (
            <p>No groups available.</p>
          )}
        </Grid>

        {/* Chat Content */}
        <Grid item xs={9}>
          {selectedChat && (
            <div>
              <h2>{selectedChat.name}</h2>
              <p>{selectedChat.content}</p>
            </div>
          )}
        </Grid>
      </Grid>

      {/* Create Chat Dialog */}
      <CreateGroup open={openDialog} onClose={handleCloseDialog} />
    </Container>
  );
};

export default GroupsPage;