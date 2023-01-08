import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
function Main() {
  const navigate = useNavigate();
  return (
    <>
      <Button
        onClick={() => {
          navigate('/review/create');
        }}
      >
        CreateReview
      </Button>
    </>
  );
}

export default Main;
