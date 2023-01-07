import React from 'react';
import { FormattedMessage } from 'react-intl';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import { Button } from '@mui/material';
const google = () => {
  window.open('http://localhost:4000/google', '_self');
};
const github = () => {
  window.open('http://localhost:4000/github', '_self');
};
function login() {
  return (
    <>
      <div>login</div>
      <FormattedMessage id="header" />

      <Button className="loginButton google" onClick={google}>
        <GoogleIcon /> Google
      </Button>
      <Button className="loginButton google" onClick={github}>
        <GitHubIcon /> Github
      </Button>
    </>
  );
}

export default login;
