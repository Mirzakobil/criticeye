import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import axios from 'axios';

function AllResources() {
  const navigate = useNavigate();
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [resources, setResources] = useState([]);
  const [admin, setAdmin] = useState(false);
  const [checked, setChecked] = useState([]);
  const [update, setUpdate] = useState(true);
  setTimeout(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.role === 'admin' ? setAdmin(true) : setAdmin(false);
    }
  }, 100);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/resource/getall`)
        .then((response) => response.json())
        .then((json) => setResources(json));
    }
    fetchData();
  }, [update]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    const filterdValue = value.filter(
      (item) => checked.findIndex((o) => o._id === item._id) >= 0
    );

    let duplicatesRemoved = value.filter((item, itemIndex) =>
      value.findIndex((o, oIndex) => o._id === item._id && oIndex !== itemIndex)
    );
    let duplicateRemoved = [];

    value.forEach((item) => {
      if (duplicateRemoved.findIndex((o) => o._id === item._id) >= 0) {
        duplicateRemoved = duplicateRemoved.filter((x) => x._id === item._id);
      } else {
        duplicateRemoved.push(item);
      }
    });

    setChecked(duplicateRemoved);
  };

  const handleDelete = () => {
    let ids = [];
    checked.map((e) => {
      ids.push(e._id);
    });
    console.log(ids);
    const configuration = {
      method: 'delete',
      url: `https://criticeye-api.onrender.com/resource/delete`,
      data: { resourceIds: ids },
    };
    axios(configuration)
      .then(() => {
        update === true ? setUpdate(false) : setUpdate(true);
        setChecked([]);
        console.log('comments deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  return (
    <>
      <h1> All Resources</h1>
      {resources.map((resource) => (
        <div key={resource._id}>
          <Link
            className="link"
            to={`/resource/reviews/${resource._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <Button>{resource.name}</Button>
          </Link>
        </div>
      ))}
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Resources</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={checked}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.map((x) => x.name).join(', ')}
        >
          {resources.map((resource) => (
            <MenuItem key={resource._id} value={resource}>
              <Checkbox
                checked={
                  checked.findIndex((item) => item._id === resource._id) >= 0
                }
              />
              <ListItemText primary={resource.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box>
        {admin && (
          <Button
            variant="contained"
            sx={{ marginRight: '5px' }}
            color="error"
            onClick={handleDelete}
          >
            Delete
          </Button>
        )}

        {admin && (
          <Button
            variant="outlined"
            onClick={() => navigate('/resource/create')}
          >
            {' '}
            Create New
          </Button>
        )}
      </Box>
    </>
  );
}

export default AllResources;
