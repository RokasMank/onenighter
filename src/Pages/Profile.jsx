import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Avatar,
} from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';
import { updateUserProfile } from '../Utils/user-axios';
import { User } from '../User/User';

const Profile = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  const [userProfile, setUserProfile] = useState({
    id: sessionStorage.getItem(User.userID),
    name: sessionStorage.getItem(User.userName),
    lastName: sessionStorage.getItem(User.userLastname),
    email: sessionStorage.getItem(User.userEmail),
  });

  const handleInputChange = (field, value) => {
    setUserProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Validate that required fields are not empty before submitting
      if (!userProfile.name || !userProfile.lastName || !userProfile.email) {
        alert('Please fill in all required fields.');
        return;
      }

      // Call your API function to update the user profile
      await updateUserProfile(userProfile);

      // Optionally, you can update sessionStorage with the new profile information
      sessionStorage.setItem(User.userName, userProfile.name);
      sessionStorage.setItem(User.userLastname, userProfile.lastName);
      sessionStorage.setItem(User.userEmail, userProfile.email);

      // Optionally, you can show a success message or navigate the user to another page
      console.log('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  useEffect(() => {
    // Fetch user profile from sessionStorage when the component mounts
    const storedUserProfile = {
      id: sessionStorage.getItem(User.userID),
      name: sessionStorage.getItem(User.userName),
      lastName: sessionStorage.getItem(User.userLastname),
      email: sessionStorage.getItem(User.userEmail),
    };
    setUserProfile(storedUserProfile);
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        marginTop="30px"
      >
        <Avatar
          alt="User Avatar"
          src="/images/astronaut.png"
          sx={{ width: '120px', height: '120px' }} // Adjust the size as needed
        />

        <Typography variant={isLargeScreen ? 'h5' : 'body1'} gutterBottom>
          Edit your profile information
        </Typography>

        <Paper
          elevation={3}
          style={{
            width: '80%',
            padding: '20px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={userProfile.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />

          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={userProfile.lastName}
            onChange={(e) => handleInputChange('lastName', e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={userProfile.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            style={{ marginBottom: '20px' }}
            required
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            style={{ marginTop: '20px' }}
          >
            Save Changes
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
