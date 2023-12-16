import "../Styles/Register.css"
import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import {registerUser} from "../Utils/user-axios-utils"
import { User } from "../User/User";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';


function Register() {

    const navigator = useNavigate();
    const navigateToMain = () => {
      navigator("/");
    };
    const [email, setEmail] = useState(User);
    const [password, setPassword] = useState("");
    const [passwordRepeat, setPasswordRepeat] = useState("");
    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");

    console.log(passwordRepeat)
    const onSubmit = (event) => {
        event.preventDefault(); // prevent default form submit behavior
        if (password === passwordRepeat){
        
        const user ={
            "Name": name,
            "Lastname":lastname ,
            "Email": email,
            "Password": password
        };
        const response = registerUser(user);
        response.then((result) => {
            if (result !== null){
                sessionStorage.setItem(User.userEmail, email);
                sessionStorage.setItem(User.userID, result.id);
                navigateToMain();
            }
            else{
                window.alert("Couldn't log you in")
            }
        });
    }
    else{
        window.alert("Passwords are incorrect")
    }
      };

    return(
        <Grid container component="main" sx={{ height: '50vh', justifyContent:'center', marginTop:'4rem' }}>
        <CssBaseline />
        <Grid item xs={12} sm={6} md={3} component={Paper} elevation={false}  square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#7F00FF' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Registration
            </Typography>
            <Box component="form" noValidate onSubmit={(e) => onSubmit(e)}  sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="EMAIL"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="name"
                label="NAME"
                type="name"
                id="name"
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="surname"
                label="LASTNAME"
                name="surname"
                autoComplete="name"
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="PASSWORD"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
               <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="REPEAT PASSWORD"
                type="password"
                id="password"
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                style={{backgroundColor:'#7F00FF'}}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Register
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    )
}
export default Register;