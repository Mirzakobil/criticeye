import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Card from '../../components/card';
import Grid from '@mui/material/Grid';

function TagReviews() {
  const params = useParams();

  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [reviews, setReviews] = useState([]);
  const [tag, setTag] = useState('');
  const tagId = params.id;
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/api/review/getall/tag/${tagId}`)
        .then((response) => response.json())
        .then((json) => setReviews(json));
      await fetch(`http://localhost:4000/tag/${tagId}`)
        .then((response) => response.json())
        .then((json) => setTag(json.name));
    }
    fetchData();
  }, [tagId]);
  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  return (
    <>
      {newReviews.length > 0 ? (
        <h1>#{tag} Tag Reviews</h1>
      ) : (
        <h1>No reviews for this tag #{tag}</h1>
      )}
      <Grid container spacing={4}>
        {' '}
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

export default TagReviews;
