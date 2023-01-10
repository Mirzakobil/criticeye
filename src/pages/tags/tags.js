import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

function Tags() {
  const navigate = useNavigate();
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [tags, setTags] = useState([]);
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/tags/getall`)
        .then((response) => response.json())
        .then((json) => setTags(json));
    }
    fetchData();
  }, []);

  setTimeout(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      return user.role === 'admin' ? setAdmin(true) : setAdmin(false);
    }
  }, 100);

  return (
    <>
      <h1>All tags</h1>
      {tags.map((tag) => (
        <div key={tag._id}>
          <Link
            className="link"
            to={`/tag/reviews/${tag._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <Button>#{tag.name}</Button>
          </Link>
        </div>
      ))}
      <Box>
        {admin && (
          <Button variant="outlined" onClick={() => navigate('/tag/create')}>
            {' '}
            Create New
          </Button>
        )}
      </Box>
    </>
  );
}

export default Tags;
