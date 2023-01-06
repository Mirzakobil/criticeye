import React from 'react';
import { useState, useEffect } from 'react';
import { Route, Link, Routes, useParams } from 'react-router-dom';
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
  //   useEffect(() => {

  //     const getReviews = () => {
  //       fetch(`http://localhost:4000/category/getall/review/${params.id}`, {
  //         method: 'GET',
  //         credentials: 'include',
  //         headers: {
  //           Accept: 'application/json',
  //           'Content-Type': 'application/json',
  //           'Access-Control-Allow-Credentials': true,
  //         },
  //       })
  //         .then((response) => {
  //           if (response.status === 200) return response.json();
  //           throw new Error('authentication has been failed!');
  //         })
  //         .then((resObject) => {
  //           console.log(resObject);
  //           setReviews(resObject.user);
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //         });
  //     };
  //     getReviews();
  //   }, []);
  return (
    <>
      <div>CategoryReviews</div>
      {/* {reviews[0].name} */}
      {reviews.map((review) => (
        <div key={review._id}>
          <Link
            className="link"
            to={`/review/category/${review._id}`}
            style={{
              textDecoration: 'none',
              color: linkColor,
            }}
          >
            <span className="title">{review.name}</span>
          </Link>
        </div>
      ))}
    </>
  );
}

export default CategoryReviews;
