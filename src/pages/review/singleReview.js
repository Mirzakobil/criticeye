import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function SingleReview() {
  const params = useParams();
  const navigate = useNavigate();

  const reviewId = params.id;
  const [review, setReview] = useState();
  const [tags, setTags] = useState([]);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/review/${reviewId}`)
        .then((response) => response.json())
        .then((json) => setReview(json));
    }
    fetchData();
  }, []);
  //const tags = review?.tags || [];
  //setTags(review?.tags);
  const localUser = JSON.parse(localStorage.getItem('user'));
  const userId = review?.authorId;
  return (
    <>
      <div>Single Review</div>
      {userId === localUser._id && (
        <Button variant="outlined">Edit Review</Button>
      )}

      <div>
        <h1>{review?.name}</h1>
      </div>
      <img
        src={review?.reviewPhotoLink}
        alt="reviewImage"
        style={{ width: '60%', height: '60vh' }}
      />
      <div>{review?.resourceName}</div>
      <div>{review?.category}</div>
      <div>{review?.grade}</div>
      <div>{review?.authorName}</div>
      <div>{review?.likes}</div>
      <div>{review?.views}</div>

      <div>{review?.createdAt}</div>
      <div>{review?.reviewBody}</div>
      <div>{review?.tags}</div>
    </>
  );
}

export default SingleReview;
