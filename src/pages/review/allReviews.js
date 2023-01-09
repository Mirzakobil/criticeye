import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import Card from '../../components/card';

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
      <div>A</div>
      {newReviews.map((review) => (
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
    </>
  );
}

export default AllReviews;
