import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
import Card from '../../components/card';

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
        <div>#{tag} Tag Reviews</div>
      ) : (
        <div>No reviews for this tag #{tag}</div>
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

export default TagReviews;
