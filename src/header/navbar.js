import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LocalePicker from './localePicker';
import { useEffect, useState } from 'react';
import GlobalContext from '../constants/globalContext';
import ThemePicker from './themePicker';

import '../App.css';
import { Box, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
const apiLink1 = 'http://localhost:4000';

const Navbar = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`${apiLink1}/category/getall`)
        .then((response) => response.json())
        .then((json) => setCategories(json));
    }
    fetchData();
  }, []);

  const logout = () => {
    window.open('http://localhost:5000/auth/logout', '_self');
  };
  return (
    <div className="navbar" style={{ display: 'flex' }}>
      <span className="logo">
        <Link
          style={{
            textDecoration: 'none',
            color: linkColor,
          }}
          to={'/'}
        >
          Main
        </Link>
      </span>
      {categories.map((category) => (
        <div key={category._id}>
          <Link
            className="link"
            to={`/review/category/${category._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <span className="title">{category.name}</span>
          </Link>
        </div>
      ))}
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
        <Link
          style={{
            textDecoration: 'none',
            color: linkColor,
          }}
          to={'/login'}
        >
          Login
        </Link>
      )}
      <ThemePicker />
      <Box textAlign="right">
        <LocalePicker />
      </Box>
    </div>
  );
};

export default Navbar;
