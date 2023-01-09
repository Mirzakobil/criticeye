import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../components/card';

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
      <div>Dashboard</div>
      <div>Categories {categories.length}</div>
      <div>Resources {resources.length}</div>
      <div>Reviews {reviews.length}</div>
      <div>Users {users.length}</div>
      <div>Comments {comments.length}</div>
      <div>
        <ol>
          Most Viewed Reviews
          {mostViewedReviews
            .filter((item, idx) => idx < 10)
            .map((review) => (
              <div key={review._id}>
                <Link
                  className="link"
                  to={`/review/category/${review._id}`}
                  style={{
                    textDecoration: 'none',
                    color: linkColor,
                  }}
                >
                  <li>
                    {review.name} {review.views}
                  </li>
                </Link>
              </div>
            ))}
        </ol>
        <ol>
          Most Rated Resources
          {mostRatedResources
            .filter((item, idx) => idx < 10)
            .map((resource) => (
              <div key={resource._id}>
                <Link
                  className="link"
                  to={`/resource/reviews/${resource._id}`}
                  style={{
                    textDecoration: 'none',
                    color: linkColor,
                  }}
                >
                  <li>
                    {resource.name} {resource.rating}
                  </li>
                </Link>
              </div>
            ))}
        </ol>
        <ol>
          Most Graded Resources
          {mostGradedResources
            .filter((item, idx) => idx < 10)
            .map((resource) => (
              <div key={resource._id}>
                <Link
                  className="link"
                  to={`/resource/reviews/${resource._id}`}
                  style={{
                    textDecoration: 'none',
                    color: linkColor,
                  }}
                >
                  <li>
                    {resource.name} {resource.grade}
                  </li>
                </Link>
              </div>
            ))}
        </ol>
      </div>
    </>
  );
}

export default Dashboard;
