import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
function UserPage() {
  const params = useParams();
  const navigate = useNavigate();

  const userId = params.id;
  const localUser = JSON.parse(localStorage.getItem('user'));

  const [user, setUser] = useState();
  const [reviews, setReviews] = useState([]);
  const [comments, setComments] = useState([]);
  const [reviewId, setReviewId] = useState();

  const [checkedReviews, setCheckedReviews] = useState([]);
  const [checkedComments, setCheckedComments] = useState([]);

  const [pageSize, setPageSize] = useState(10);

  const commentColumns = [
    { field: 'authorName', headerName: 'User', width: 150 },
    { field: 'resourceName', headerName: 'Resource', width: 150 },
    { field: 'reviewId', headerName: 'Review', width: 250 },
    { field: 'comment', headerName: 'Comment', width: 300 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
  ];

  const reviewColumns = [
    { field: 'authorName', headerName: 'User', width: 120 },
    { field: 'resourceName', headerName: 'Resource', width: 120 },
    { field: 'name', headerName: 'Review Name', width: 160 },
    { field: 'reviewBody', headerName: 'Review Body', width: 250 },
    { field: 'grade', headerName: 'Author Grade', width: 100 },
    { field: 'likes', headerName: 'Likes', width: 100 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
  ];

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(
        `https://criticeye-api.onrender.com/api/review/getall/user/${userId}`
      )
        .then((response) => response.json())
        .then((json) => setReviews(json));
      await fetch(`https://criticeye-api.onrender.com/user/getOne/${userId}`)
        .then((response) => response.json())
        .then((json) => setUser(json));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(
        `https://criticeye-api.onrender.com/api/review/getall/user/${userId}`
      )
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, [checkedReviews]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(
        `https://criticeye-api.onrender.com/api/comment/getall/user/${userId}`
      )
        .then((response) => response.json())
        .then((json) => setComments(json));
    }
    fetchData();
  }, [checkedComments]);

  useEffect(() => {
    const reviewData = comments.find((e) => e._id === checkedComments[0]);
    setReviewId(reviewData?._id);
  }, [checkedComments]);

  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  let newComments = [];

  if (comments) {
    newComments = [...comments].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }
  // const newComments = [...comments].sort(
  //   (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  // );
  const handleDeleteReview = (e) => {
    const configuration = {
      method: 'delete',
      url: `https://criticeye-api.onrender.com/review/delete`,
      data: { reviewIds: checkedReviews },
    };
    axios(configuration)
      .then(() => {
        setCheckedReviews([]);
        console.log('review deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const handleDeleteComment = (e) => {
    console.log(checkedComments);
    const configuration = {
      method: 'delete',
      url: `https://criticeye-api.onrender.com/comment/delete`,
      data: { commentIds: checkedComments },
    };
    axios(configuration)
      .then(() => {
        setCheckedComments([]);
        console.log('comments deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  return (
    <>
      <div>User Page</div>
      <img
        alt="ProfileImage"
        style={{ width: '70px', height: '60px' }}
        src={user?.profilePhotoLink}
      />
      {user?.email ? (
        <div>E-mail: {user?.email} </div>
      ) : (
        <div>GitHub ID {user?.githubId}</div>
      )}
      {user?.email ? (
        <div>
          <div>First Name: {user?.firstName}</div>
          <div>Last Name: {user?.lastName}</div>
        </div>
      ) : (
        <div>Username: {user?.firstName}</div>
      )}
      <div>Role: {user?.role}</div>
      {userId === localUser._id && (
        <Button variant="outlined">Edit profile</Button>
      )}
      <div>User reviews</div>
      <Button
        sx={{ marginRight: '5px' }}
        variant="contained"
        disabled={
          checkedReviews.length === 2 ||
          checkedReviews.length === 0 ||
          checkedReviews.length > 2
        }
        onClick={() => navigate(`/review/${checkedReviews[0]}`)}
      >
        Open Review Page
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="outlined"
        disabled={
          checkedReviews.length === 2 ||
          checkedReviews.length === 0 ||
          checkedReviews.length > 2
        }
      >
        Edit Review
      </Button>
      <Button
        variant="contained"
        sx={{ marginRight: '5px' }}
        color="error"
        onClick={handleDeleteReview}
      >
        Delete
      </Button>
      <Button
        variant="outlined"
        onClick={() => navigate(`/userpage/creatreview/${userId}`)}
      >
        New Review
      </Button>
      <DataGrid
        sx={{ marginTop: '15px', height: '75vh' }}
        rows={newReviews}
        columns={reviewColumns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={pageSize}
        loading={!reviews.length === 0}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        rowsPerPageOptions={[7, 10, 20]}
        onSelectionModelChange={(params) => setCheckedReviews(params)}
        selectionModel={checkedReviews}
      />
      <div>User comments</div>
      <Button
        variant="contained"
        sx={{ marginRight: '5px' }}
        color="error"
        onClick={handleDeleteComment}
      >
        Delete
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="outlined"
        disabled={
          checkedComments.length === 2 ||
          checkedComments.length === 0 ||
          checkedComments.length > 2
        }
        onClick={() => navigate(`/review/${reviewId}`)}
      >
        View Review
      </Button>
      <DataGrid
        sx={{ marginTop: '15px', height: '75vh' }}
        rows={newComments}
        columns={commentColumns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={pageSize}
        loading={!comments.length === 0}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        selectionModel={checkedComments}
        rowsPerPageOptions={[7, 10, 20]}
        onSelectionModelChange={(params) => setCheckedComments(params)}
      />
    </>
  );
}

export default UserPage;
