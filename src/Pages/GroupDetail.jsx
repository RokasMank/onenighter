import React, { useState, useEffect, useRef } from 'react';
import { Container, Typography, TextField, Button, Paper, Box, useMediaQuery, useTheme } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { sendMessage } from '../Utils/message-axios';
import { getMessages } from '../Utils/group-axios';
import { User } from '../User/User';

const GroupDetail = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const { state } = useLocation();
  const selectedGroup = state.group;

  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesContainerRef = useRef(null);

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

  const handleEditClick = async () =>{

  }
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
      <Typography variant="h4" style={{ display: 'inline' }}>{selectedGroup.groupName}</Typography>
    <Typography variant="subtitle1" style={{ display: 'inline', marginLeft: '10px' }}>Theme: {selectedGroup.theme.name}</Typography>
    <Button
    variant="outlined"
    color="primary"
    style={{ marginLeft: 'auto' }}  // Add this line
    onClick={handleEditClick}
    >
    Add
    </Button>
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
        <Typography variant="h6">Messages:</Typography>
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
        />
        <Button variant="contained" color="primary" onClick={handleSendMessage} style={{ marginTop: '10px' }}>
          Send
        </Button>
      </Box>
    </Container>
  );
};

export default GroupDetail;
