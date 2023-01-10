import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/card';
import Grid from '@mui/material/Grid';

function Dashboard() {
  const navigate = useNavigate();

  const linkColor = localStorage.getItem('mode') === 'dark' ? 'white' : 'black';

  const [categories, setCategories] = useState([]);
  const [resources, setResources] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/category/getall`)
        .then((response) => response.json())
        .then((json) => setCategories(json));

      await fetch(`http://localhost:4000/resource/getall`)
        .then((response) => response.json())
        .then((json) => setResources(json));

      await fetch(`http://localhost:4000/api/review/getall/`)
        .then((response) => response.json())
        .then((json) => setReviews(json));

      await fetch(`http://localhost:4000/user/getall`)
        .then((response) => response.json())
        .then((json) => setUsers(json));

      await fetch(`http://localhost:4000/api/comment/getall/`)
        .then((response) => response.json())
        .then((json) => setComments(json));
    }
    fetchData();
  }, []);
  const mostViewedReviews = [...reviews].sort((a, b) => b.views - a.views);
  const mostGradedResources = [...resources].sort((a, b) => b.grade - a.grade);
  const mostRatedResources = [...resources].sort((a, b) => b.rating - a.rating);

  return (
    <>
      <h1>Dashboard</h1>
      <Grid container spacing={1}>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/categories');
            }}
          >
            Categories {categories.length}
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/resources');
            }}
          >
            Resources {resources.length}
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/reviews/table');
            }}
          >
            Reviews {reviews.length}
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/users');
            }}
          >
            Users {users.length}
          </Button>
        </Grid>
        <Grid item xs={6} sm={4} md={2}>
          <Button
            variant="outlined"
            onClick={() => {
              navigate('/comments');
            }}
          >
            Comments {comments.length}
          </Button>
        </Grid>
      </Grid>

      <h2>Most Viewed Reviews</h2>
      <Grid container spacing={4}>
        {mostViewedReviews
          .filter((item, idx) => idx < 8)
          .map((review) => (
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
      <h2> Most Rated Resources</h2>
      <Grid container spacing={1}>
        {mostRatedResources
          .filter((item, idx) => idx < 10)
          .map((resource) => (
            <Grid item xs={6} sm={4} md={2}>
              <Button
                variant="outlined"
                key={resource._id}
                onClick={() => {
                  navigate(`/resource/reviews/${resource._id}`);
                }}
              >
                {resource.name} rating: {resource.rating}
              </Button>
            </Grid>
          ))}
      </Grid>

      <h2> Most Graded Resources</h2>
      <Grid container spacing={1}>
        {mostGradedResources
          .filter((item, idx) => idx < 10)
          .map((resource) => (
            <Grid item xs={6} sm={4} md={3}>
              <Button
                variant="outlined"
                key={resource._id}
                onClick={() => {
                  navigate(`/resource/reviews/${resource._id}`);
                }}
              >
                {resource.name} grade: {resource.grade}
              </Button>
            </Grid>
          ))}
      </Grid>
    </>
  );
}

export default Dashboard;
