import * as React from 'react';
import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useNavigate } from 'react-router-dom';
import { User } from '../User/User';
const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Logout'];

function AppMenu() {
  sessionStorage.getItem(User.userEmail)
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleHomeClick = () =>{
    handleCloseNavMenu()
    navigateToLandingPage();
  } 

  const handleProfileClick = () =>{
    handleCloseUserMenu()
    navigateToProfile();
  } 
  const handleLogoutClick = () =>{
    
      handleCloseUserMenu()
      sessionStorage.clear()
      navigateToLandingPage()

  }
  
  const handleChatsClick = () =>{
    handleCloseNavMenu()
    navigateToChatPage();
  } 
  const handleGroupClick = () =>{
    handleCloseNavMenu()
    navigateToChatPage();
  } 
  const handleRegisterClick = () =>{
    handleCloseNavMenu()
    navigateToRegister();
  } 
  const handleLoginClick = () =>{
    handleCloseNavMenu()
    navigateToLogin();
  } 
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const navigator = useNavigate();
  const navigateToLandingPage = () => {
    navigator("/");
  };
  const navigateToProfile = () => {
    navigator("/profile");
  };
  const navigateToChatPage = () => {
    navigator("/group");
  };
  const navigateToRegister = () => {
    navigator("/register");
  };
  const navigateToLogin = () => {
    navigator("/login");
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            oneNighter
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem key={"Home"} onClick={handleHomeClick}>
                  <Typography textAlign="center">{"Home"}</Typography>
                </MenuItem>
                {sessionStorage.getItem(User.userEmail) === null 
             ? 
             <MenuItem key={"Register"} onClick={handleRegisterClick}>
             <Typography textAlign="center">{"Register"}</Typography>
           </MenuItem>
            :<></>}
             {sessionStorage.getItem(User.userEmail) === null 
             ? 
             <MenuItem key={"Login"} onClick={handleLoginClick}>
             <Typography textAlign="center">{"Login"}</Typography>
           </MenuItem>
            :<></>}
             {sessionStorage.getItem(User.userEmail) !== null 
             ? 
             <MenuItem key={"Groups"} onClick={navigateToChatPage}>
                  <Typography textAlign="center">{"Groups"}</Typography>
                </MenuItem>
            :<></>}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              <Button
                key={"Home"}
                onClick={navigateToLandingPage}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {"Home"}
              </Button>
              {sessionStorage.getItem(User.userEmail) !== null 
              ? <Button
              key={"Groups"}
              onClick={navigateToChatPage}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
                {"Groups"}
            </Button>
            : <></>}
             
             {sessionStorage.getItem(User.userEmail) === null 
             ?
              <Button
                key={"Register"}
                onClick={navigateToRegister}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {"Register"}
              </Button>
              : <></>
              }

            {sessionStorage.getItem(User.userEmail) === null 
             ?
              <Button
                key={"Login"}
                onClick={navigateToLogin}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                  {"Login"}
              </Button>
              : <></>
              }
          </Box>
          {sessionStorage.getItem(User.userEmail) !== null 
             ?   
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={sessionStorage.getItem(User.userEmail)} src="%PUBLIC_URL%/images/astronaut.png" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key={'Profile'} onClick={handleProfileClick}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
              <MenuItem key={'Logout'} onClick={handleLogoutClick}>
                  <Typography textAlign="center">Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
          : <></>}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default AppMenu;