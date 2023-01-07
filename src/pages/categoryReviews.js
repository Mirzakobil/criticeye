import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
function CategoryReviews() {
  const params = useParams();

  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [reviews, setReviews] = useState([]);
  const categoryId = params.id;
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/category/getall/review/${categoryId}`)
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, [categoryId]);

  return (
    <>
      <div>CategoryReviews</div>
      {reviews.map((review) => (
        <div key={review._id}>
          <Link
            className="link"
            to={`/review/category/${review._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <span className="title">{review.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}

export default CategoryReviews;
