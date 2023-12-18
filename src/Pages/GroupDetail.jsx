import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { sendMessage } from '../Utils/message-axios';

import { User } from '../User/User';
import { AddMember } from '../Components/AddMember';
import groupClient from '../Utils/group-axios';

const GroupDetail = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { state } = useLocation();
  const selectedGroup = state.group;

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  console.log(selectedGroup)
  const messagesContainerRef = useRef(null);

  const getMessages = async (id) => {
    try {
      const client = groupClient();
      const response = await client.get(`messages/${id}`);
  
      // Log the API response
      console.log('API response:', response.data);
  
      // Assuming your API responds with the created group data
      const data = response.data;
  
      // Log the updated state
      console.log('Updated messages state:', data);
  
      return data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw new Error(`Error fetching messages: ${error.message}`);
    }
  }
  useEffect(() => {
    const fetchGroupMessages = async (groupId) => {
      try {
        const response = await getMessages(groupId);
        if (response.length > 0) {
          setMessages(response);
          scrollMessagesToBottom();
        }
      } catch (error) {
        console.error("Error fetching user groups:", error);
      }
    };

    fetchGroupMessages(selectedGroup.id);
  }, [selectedGroup.id]);

  const handleAddClick = async () =>{
    setOpenDialog(true);
  }
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleSendMessage = async () => {
    try {
      const message = {
        Text: newMessage,
        UserId: sessionStorage.getItem(User.userID),
        GroupId: selectedGroup.id,
      };

      const response = await sendMessage(message);
      setMessages([...messages, response]); // Update messages with the new message
      setNewMessage(''); // Clear the input field
      console.log(response)
      scrollMessagesToBottom();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const scrollMessagesToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  if (!selectedGroup) {
    return <Typography variant="h6">No group selected.</Typography>;
  }

  return (
    <Container>
<div style={{ display: 'flex', marginTop:'5px', marginBottom: '10px' }}>
  <Typography variant="h6" style={{ marginRight: '10px' }}>{selectedGroup.groupName}</Typography>
  <Typography variant="h6">{selectedGroup.theme.name}</Typography>
  <Button
    variant="outlined"
    color="primary"
    style={{ marginLeft: 'auto' }}
    onClick={handleAddClick}
  >
    Add members
  </Button>
</div>


      <Box
        style={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px',
          width: isLargeScreen ? '80%' : '90%',
          background: '#fff',
          boxSizing: 'border-box',
        }}
      >
        <div
          ref={messagesContainerRef}
          style={{
            maxHeight: '70vh',
            overflowY: 'auto',
          }}
        >
          <ul>
            {messages.map((message, index) => (
              <Paper key={index} elevation={3} style={{ padding: '10px', marginBottom: '10px' }}>
                <Typography variant="body1">
                  <strong>Sender:</strong> {message.senderName}
                </Typography>
                <Typography variant="body2">
                  <strong>Text:</strong> {message.text}
                </Typography>
              </Paper>
            ))}
          </ul>
        </div>
        <TextField
          fullWidth
          variant="outlined"
          label="Type your message"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault(); // Prevents the newline character
              handleSendMessage();
            }
          }}
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
         Send
        </Button>
      </Box>
      <AddMember group={selectedGroup} open={openDialog} onClose={handleCloseDialog}/>

    </Container>
  );
};

export default GroupDetail;
