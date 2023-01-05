import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Box from '@mui/material/Box';
import LocalePicker from './header/localePicker';

const Navbar = ({ user }) => {
  const logout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };
  return (
    <div className="navbar">
      <span className="logo">
        <Link to={'/'}>Main</Link>
      </span>
      {user ? (
        <ul className="list">
          <li className="listItem">{user.firstName}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
          <li>
            dsd
            <FormattedMessage id="header" />
          </li>
        </ul>
      ) : (
        <Link to={'/login'}>Login</Link>
      )}
      <Box textAlign="right">
        <LocalePicker />
      </Box>
    </div>
  );
};

export default Navbar;
