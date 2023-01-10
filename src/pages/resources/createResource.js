import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Autocomplete } from '@mui/material';
import axios from 'axios';

function CreateResource() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState(['']);
  const [categoryId, setCategoryId] = useState('');
  const [category, setCategory] = useState('');
  const [error, setError] = useState('');
  let optionsCategories = [];
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/category/getall`)
        .then((response) => response.json())
        .then((json) => setCategories(json));
    }
    fetchData();
  }, []);
  useEffect(() => {
    const resourceData = categories.find((e) => e.name === category);
    setCategoryId(resourceData?._id);
  }, [category]);

  categories.map((e) => optionsCategories.push(e.name));

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(categoryId);
    const data = new FormData(event.currentTarget);

    const name = data.get('name');
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/api/resource/create`,
      data: {
        name: name,
        categoryId: categoryId,
      },
    };
    axios(configuration)
      .then(() => {
        setCategory('');
        setCategories();
        navigate('/resources');
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Create Resource
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <Autocomplete
              sx={{ width: '400px', marginBottom: '15px', marginTop: '15px' }}
              options={optionsCategories}
              renderInput={(params) => (
                <TextField {...params} label="Choose Resource Category" />
              )}
              value={category}
              onChange={(e, data) => setCategory(data)}
              autoSelect
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="name"
              label="Resource Name"
              name="name"
              autoComplete="name"
              autoFocus
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CreateResource;
