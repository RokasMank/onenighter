import React, { useState } from 'react';
import { Container, Grid, List, ListItem, Button } from '@mui/material';
import { CreateGroup } from '../Components/CreateGroup';

const GroupPage = () => {
  const [chats, setChats] = useState([
    { id: 1, name: 'Chat 1', content: 'This is Chat 1 content.' },
    { id: 2, name: 'Chat 2', content: 'This is Chat 2 content.' },
    // Add more chats as needed
  ]);

  const [selectedChat, setSelectedChat] = useState(null);

  const handleChatClick = (chat) => {
    setSelectedChat(chat);
  };

  const handleNewChat = () => {
    const newChat = { id: chats.length + 1, name: `Chat ${chats.length + 1}`, content: '' };
    setChats([...chats, newChat]);
    setSelectedChat(newChat);
  };

  const [openDialog, setOpenDialog] = useState(false);

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

  return (
    <Container>
      <Grid container>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="contained" onClick={handleOpenDialog}>
            Create Group
          </Button>
        </Grid>
        {/* Chat List */}
        <Grid item xs={3}>
          <List>
            {chats.map((chat) => (
              <ListItem button key={chat.id} onClick={() => handleChatClick(chat)}>
                {chat.name}
              </ListItem>
            ))}
          </List>
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
      <CreateGroup open={openDialog} onClose={handleCloseDialog} onSubmit={handleFormSubmit} />
    </Container>
  );
};

export default GroupPage;
