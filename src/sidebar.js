import React from 'react';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';

export default function Sidebar() {
  const navigate = useNavigate();

  function handleClick() {
    navigate('/login');
  }
  return (
    <Box my={2} mr={4} px={2}>
      <Button
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        Home Page
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        Dashboard
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/resources');
        }}
      >
        Resources
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/categories');
        }}
      >
        Categories
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/comments');
        }}
      >
        Comments
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/reviews');
        }}
      >
        Reviews
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/reviews/table');
        }}
      >
        Reviews T
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/users');
        }}
      >
        Users
      </Button>
      <Button
        type="button"
        onClick={() => {
          navigate('/tags');
        }}
      >
        Tags
      </Button>
    </Box>
  );
}
