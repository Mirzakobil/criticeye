import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/card';
function Main() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [tags, setTags] = useState([]);
  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/tags/getall`)
        .then((response) => response.json())
        .then((json) => setTags(json));
    }
    fetchData();
  }, []);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/api/review/getall/`)
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, []);

  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  const gradedReviews = [...reviews].sort((a, b) => b.grade - a.grade);

  return (
    <>
      <h1>Newest Reviews</h1>
      <Grid container spacing={4}>
        {newReviews
          .filter((item, idx) => idx < 8)
          .map((review) => (
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
      <h1> Reviews with highest grade</h1>
      <Grid container spacing={4}>
        {gradedReviews
          .filter((item, idx) => idx < 8)
          .map((review) => (
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
      <h1>Tags</h1>
      <Grid container spacing={4}>
        {tags.map((tag) => (
          <Grid item xs={3} sm={3} md={1.5} key={tag._id}>
            <Button
              onClick={() => {
                navigate(`/tag/reviews/${tag._id}`);
              }}
            >
              #{tag.name}
            </Button>
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default Main;
