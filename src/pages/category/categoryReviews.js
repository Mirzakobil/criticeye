import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Card from '../../components/card';
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
  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  return (
    <>
      {reviews.length > 1 ? (
        <div>{reviews[0]?.category} Category Reviews</div>
      ) : (
        <div>No reviews for this category</div>
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

export default CategoryReviews;
