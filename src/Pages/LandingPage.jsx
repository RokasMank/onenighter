import React from 'react';
import { Container, Typography, Button, useTheme, useMediaQuery, Box, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('lg'));

  return (
    <Container style={{ height: '100vh' }}>

      <Paper
        elevation={3}
        style={{
          width: '100%',
          marginTop: '30px',
          paddingTop: '40px',
          backgroundColor: theme.palette.primary.main,
          color: '#fff',
        }}
      >
      </Paper>

      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100%"
        overflowY="hidden"
      >
        <Typography variant={isLargeScreen ? 'h5' : 'body1'} align="center" paragraph>
          Explore amazing features and connect with others!
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/login"
          style={{ marginTop: '20px', textDecoration: 'none' }}
        >
          Get Started
        </Button>

        {/* Text box about the app */}
        <Paper
          elevation={3}
          style={{
            width: '80%',
            padding: '20px',
            marginTop: '30px',
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" gutterBottom>
            About oneNighter
          </Typography>
          <Typography variant="body1">
            Create groups, decide where to go out, and more! Connect with others and make your
            experiences memorable.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default LandingPage;
