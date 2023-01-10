import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import axios from 'axios';

function AllComments() {
  const [comments, setComments] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    fetch(`http://localhost:4000/api/comment/getall/`)
      .then((response) => response.json())
      .then((json) => setComments(json));
  }, [checked]);

  const columns = [
    { field: 'authorName', headerName: 'User', width: 150 },
    { field: 'resourceName', headerName: 'Resource', width: 150 },
    { field: 'reviewId', headerName: 'Review', width: 250 },
    { field: 'comment', headerName: 'Comment', width: 335 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
  ];
  const handleDelete = (e) => {
    console.log(checked);
    const configuration = {
      method: 'delete',
      url: `http://localhost:4000/comment/delete`,
      data: { commentIds: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('comments deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };
  let newComments = [];
  if (comments) {
    newComments = [...comments].sort(
      (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
    );
  }

  return (
    <>
      <h1>List of all comments</h1>
      <Button variant="contained" color="error" onClick={handleDelete}>
        Delete
      </Button>
      <DataGrid
        sx={{ marginTop: '15px', height: '75vh' }}
        rows={newComments}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={pageSize}
        loading={!comments.length === 0}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        selectionModel={checked}
        rowsPerPageOptions={[7, 10, 20]}
        onSelectionModelChange={(params) => setChecked(params)}
      />
    </>
  );
}

export default AllComments;
