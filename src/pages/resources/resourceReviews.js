import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Card from '../../components/card';
import Grid from '@mui/material/Grid';

function ResourceReviews() {
  const params = useParams();

  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [reviews, setReviews] = useState([]);

  const resourceId = params.id;
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(
        `http://localhost:4000/api/review/getall/resource/${resourceId}`
      )
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, [resourceId]);
  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  return (
    <>
      {reviews.length > 1 ? (
        <h1>{reviews[0]?.resourceName} resource Reviews</h1>
      ) : (
        <h1>No reviews for this resource</h1>
      )}
      <Grid container spacing={4}>
        {newReviews.map((review) => (
          <Grid item xs={12} sm={6} md={3} key={review._id}>
            {' '}
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

export default ResourceReviews;
