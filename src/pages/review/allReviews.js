import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/card';
import Grid from '@mui/material/Grid';

function AllReviews() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/api/review/getall/`)
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, []);
  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  return (
    <>
      <h1>All Reviews</h1>
      <Grid container spacing={4}>
        {newReviews.map((review) => (
          <Grid item xs={12} sm={6} md={3} key={review._id}>
            <Card
              img={review.reviewPhotoLink}
              title={review.name}
              body={review.reviewBody}
              date={review.createdAt}
              author={review.authorName}
              grade={review.grade}
              category={review.category}
              likes={review.likes}
              views={review.views}
              reviewId={review._id}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default AllReviews;
