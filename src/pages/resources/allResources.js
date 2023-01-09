import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Route, Link, Routes, useParams } from 'react-router-dom';

function AllResources() {
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [resources, setResources] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/resource/getall`)
        .then((response) => response.json())
        .then((json) => setResources(json));
    }
    fetchData();
  }, []);
  return (
    <>
      <div>allResources</div>
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
            <div>{resource.name}</div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default AllResources;
