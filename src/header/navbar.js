import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import LocalePicker from './localePicker';
import { useEffect, useState } from 'react';

import ThemePicker from './themePicker';

import '../App.css';
import {
  Box,
  MenuItem,
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Typography,
  Menu,
  Tooltip,
  Avatar,
  Button,
} from '@mui/material';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';

const Navbar = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/category/getall`)
        .then((response) => response.json())
        .then((json) => setCategories(json));
    }
    fetchData();
  }, []);

  const logout = () => {
    window.open('http://localhost:4000/logout', '_self');
  };
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const altAvatar = 'P';
  const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
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
              CriticEye
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
                {categories.map((category) => (
                  <Button
                    key={category._id}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    <Link
                      className="link"
                      to={`/category/reviews/${category._id}`}
                      style={{
                        textDecoration: 'none',
                        color: linkColor,
                      }}
                    >
                      <span className="title">{category.name}</span>
                    </Link>
                  </Button>
                ))}
              </Menu>
            </Box>

            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
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
              CriticEye
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {categories.map((category) => (
                <Button
                  key={category._id}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block', hover: 'b' }}
                >
                  <Link
                    className="link"
                    to={`/category/reviews/${category._id}`}
                    style={{
                      textDecoration: 'none',
                      color: 'white',
                    }}
                  >
                    <span className="title">{category.name}</span>
                  </Link>
                </Button>
              ))}
            </Box>
            <ThemePicker />
            <LocalePicker />
            {user ? (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt={altAvatar} src="/static/images/avatar/2.jpg" />
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
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">Profile</Typography>
                  </MenuItem>
                  <MenuItem onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={logout}>
                      Log out
                    </Typography>
                  </MenuItem>
                </Menu>
              </Box>
            ) : (
              <Button
                sx={{ my: 2, color: 'white', display: 'block', hover: 'b' }}
              >
                <Link
                  className="link"
                  to={`/login`}
                  style={{
                    textDecoration: 'none',
                    color: 'white',
                  }}
                >
                  Login
                </Link>
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
