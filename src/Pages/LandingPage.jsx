import React from 'react';
import { Container, Typography, Button, useTheme, useMediaQuery, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { User } from '../User/User';
const LandingPage = () => {
  const backgroundImageUrl = '/images/pikb29.jpg';

  const backgroundStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    color: 'white', // Set text color to contrast with the background
  };

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Box sx={backgroundStyle}>
      <Container>
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          height="100%"
          overflowY="hidden"
        >
          {sessionStorage.getItem(User.userEmail) === null ? 
           <Button
           variant="contained"
           color="primary"

           component={Link}
           to="/login"
           style={{ marginTop: '20px', padding:'2rem' ,textDecoration: 'none' }}
           sx={{ fontSize: '1.2rem' }}
         >
           Get Started
         </Button>
          : 
            <Paper
            elevation={3}
            style={{
              width: '80%',
              padding: '20px',
              marginTop: '30px',
              textAlign: 'center',
            }}
          >
          <Typography
          variant={isLargeScreen ? 'h5' : 'body1'}
          align="center"
          paragraph
          sx={{ color: 'black', fontSize: '2rem' }} // Use a light gray color
        >
          New features are comming!
        </Typography>

          </Paper> }

         
        </Box>
      </Container>
    </Box>
  );
};

export default LandingPage;
