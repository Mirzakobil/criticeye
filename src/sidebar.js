import React from 'react';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GamesIcon from '@mui/icons-material/Games';
import CategoryIcon from '@mui/icons-material/Category';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ReviewsIcon from '@mui/icons-material/Reviews';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import TagIcon from '@mui/icons-material/Tag';

export default function Sidebar() {
  const navigate = useNavigate();
  const color = localStorage.getItem('mode') === 'dark' ? 'white' : '#2196f3';
  return (
    <Box my={2} mr={4} px={2}>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/');
        }}
      >
        <HomeIcon />
        Home Page
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/dashboard');
        }}
      >
        <DashboardIcon />
        Dashboard
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/resources');
        }}
      >
        <GamesIcon />
        Resources
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/categories');
        }}
      >
        <CategoryIcon />
        Categories
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/comments');
        }}
      >
        <ChatBubbleIcon />
        Comments
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/reviews');
        }}
      >
        <RateReviewIcon />
        Reviews
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/reviews/table');
        }}
      >
        <ReviewsIcon />
        Reviews T
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/users');
        }}
      >
        <PeopleAltIcon />
        Users
      </Button>
      <Button
        sx={{ color: color }}
        type="button"
        onClick={() => {
          navigate('/tags');
        }}
      >
        <TagIcon />
        Tags
      </Button>
    </Box>
  );
}
