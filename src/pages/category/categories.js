import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { Route, Link, Routes, useParams } from 'react-router-dom';

function Categories() {
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/category/getall`)
        .then((response) => response.json())
        .then((json) => setCategories(json));
    }
    fetchData();
  }, []);
  return (
    <>
      <div>All categories</div>
      {categories.map((category) => (
        <div key={category._id}>
          <Link
            className="link"
            to={`/category/reviews/${category._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <div>{category.name}</div>
          </Link>
        </div>
      ))}
    </>
  );
}

export default Categories;
