import * as React from 'react';
import { useState } from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import Alert from '@mui/material/Alert';
export default function SignIn() {
  const navigate = useNavigate();
  const google = () => {
    window.open('http://localhost:4000/google', '_self');
  };
  const github = () => {
    window.open('http://localhost:4000/github', '_self');
  };
  const [error, setError] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    console.log(email, password);
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/api/login`,
      data: {
        email,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        localStorage.setItem('role', result.data.role);
        navigate('/');
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {error && (
            <Alert severity="error">
              Incorrect credentials or blocked user
            </Alert>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link
                onClick={() => {
                  navigate('/register');
                }}
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Divider>OR USE TO SIGN IN</Divider>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button className="loginButton google" onClick={google}>
              <GoogleIcon /> Google
            </Button>
            <Button className="loginButton google" onClick={github}>
              <GitHubIcon /> Github
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}
