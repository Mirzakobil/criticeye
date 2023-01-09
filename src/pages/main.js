import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
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
      await fetch(`http://localhost:4000/tags/getall`)
        .then((response) => response.json())
        .then((json) => setTags(json));
    }
    fetchData();
  }, []);
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
  const gradedReviews = [...reviews].sort((a, b) => b.grade - a.grade);

  return (
    <>
      <Button
        onClick={() => {
          navigate('/review/create');
        }}
      >
        CreateReview
      </Button>
      <div>Newest Reviews</div>
      {newReviews
        .filter((item, idx) => idx < 5)
        .map((review) => (
          <div key={review._id}>
            <Link
              className="link"
              to={`/review/${review._id}`}
              style={{
                textDecoration: 'none',
                color: linkColor,
              }}
            >
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
              />
            </Link>
          </div>
        ))}
      <div> Reviews with highest grade</div>
      {gradedReviews
        .filter((item, idx) => idx < 5)
        .map((review) => (
          <div key={review._id}>
            <Link
              className="link"
              to={`/review/${review._id}`}
              style={{
                textDecoration: 'none',
                color: linkColor,
              }}
            >
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
              />
            </Link>
          </div>
        ))}
      <div>
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
              #{tag.name}
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}

export default Main;
