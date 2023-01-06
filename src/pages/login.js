import React from 'react';
import { FormattedMessage } from 'react-intl';
import Navbar from '../header/navbar';
const google = () => {
  window.open('http://localhost:4000/google', '_self');
};
const github = () => {
  window.open('http://localhost:4000/github', '_self');
};
function login() {
  return (
    <>
      <Navbar />
      <div sx={{ color: 'primary.main' }}>login</div>
      <FormattedMessage id="header" />

      <div className="loginButton google" onClick={google}>
        <img src="" alt="icon" className="icon" />
        Google
      </div>
      <div className="loginButton google" onClick={github}>
        <img src="" alt="icon" className="icon" />
        Github
      </div>
    </>
  );
}

export default login;
