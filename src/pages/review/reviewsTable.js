import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function ReviewsTable() {
  const navigate = useNavigate();
  const [reviews, setReviews] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/api/review/getall/`)
        .then((response) => response.json())
        .then((json) => setReviews(json));
    }
    fetchData();
  }, [checked]);
  const newReviews = [...reviews].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  const columns = [
    { field: 'authorName', headerName: 'User', width: 120 },
    { field: 'resourceName', headerName: 'Resource', width: 120 },
    { field: 'name', headerName: 'Review Name', width: 160 },
    { field: 'reviewBody', headerName: 'Review Body', width: 250 },
    { field: 'grade', headerName: 'Author Grade', width: 100 },
    { field: 'likes', headerName: 'Likes', width: 100 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
  ];
  const handleDelete = (e) => {
    console.log(checked);
    const configuration = {
      method: 'delete',
      url: `http://localhost:4000/review/delete`,
      data: { reviewIds: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('review deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };
  return (
    <>
      <h1>List of all reviews</h1>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
      <DataGrid
        sx={{ marginTop: '15px', height: '75vh' }}
        rows={newReviews}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={pageSize}
        loading={!reviews.length === 0}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        rowsPerPageOptions={[7, 10, 20]}
        onSelectionModelChange={(params) => setChecked(params)}
        selectionModel={checked}
      />
    </>
  );
}

export default ReviewsTable;
