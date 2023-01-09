import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Route, Link, Routes, useParams } from 'react-router-dom';

function Tags() {
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/tags/getall`)
        .then((response) => response.json())
        .then((json) => setTags(json));
    }
    fetchData();
  }, []);
  return (
    <>
      <div>All tags</div>
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
            <div>#{tag.name}</div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Tags;
