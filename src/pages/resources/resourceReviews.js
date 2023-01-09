import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Card from '../../components/card';

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
        <div>{reviews[0]?.resourceName} resource Reviews</div>
      ) : (
        <div>No reviews for this resource</div>
      )}
      {newReviews.map((review) => (
        <div key={review._id}>
          <Link
            className="link"
            to={`/review/category/${review._id}`}
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

export default ResourceReviews;
