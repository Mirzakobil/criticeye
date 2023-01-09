import React from 'react';
import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function UsersTable() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [checked, setChecked] = useState([]);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/user/getall`)
        .then((response) => response.json())
        .then((json) => setUsers(json));
    }
    fetchData();
  }, [checked]);
  const newUsers = [...users].sort(
    (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
  );
  const columns = [
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 160 },
    { field: 'role', headerName: 'Role', width: 100 },
    { field: 'status', headerName: 'Status', width: 100 },
    { field: 'githubId', headerName: 'Github ID', width: 100 },
    { field: 'createdAt', headerName: 'Created at', width: 200 },
  ];
  const handleDelete = (e) => {
    console.log(checked);
    const configuration = {
      method: 'delete',
      url: `http://localhost:4000/user/delete`,
      data: { ids: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('user deleted');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const handleBlock = (e) => {
    console.log(checked);
    const configuration = {
      method: 'put',
      url: `http://localhost:4000/user/block`,
      data: { ids: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('user blocked');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const handleUnBlock = (e) => {
    console.log(checked);
    const configuration = {
      method: 'put',
      url: `http://localhost:4000/user/unblock`,
      data: { ids: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('user unblocked');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const handleAdmin = (e) => {
    console.log(checked);
    const configuration = {
      method: 'put',
      url: `http://localhost:4000/user/makeAdmin`,
      data: { ids: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('user promoted to admin');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  const handleNonAdmin = (e) => {
    console.log(checked);
    const configuration = {
      method: 'put',
      url: `http://localhost:4000/user/makeUser`,
      data: { ids: checked },
    };
    axios(configuration)
      .then(() => {
        setChecked([]);
        console.log('admin demoted to user');
      })
      .catch((error) => {
        console.log(error.response.message);
      });
  };

  return (
    <>
      <div>usersTable</div>
      <Button
        variant="contained"
        sx={{ marginRight: '5px' }}
        color="error"
        onClick={handleDelete}
      >
        Delete
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="contained"
        disabled={
          checked.length === 2 || checked.length === 0 || checked.length > 2
        }
        onClick={() => navigate(`/userpage/${checked[0]}`)}
      >
        Open User Page
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="contained"
        color="error"
        onClick={handleBlock}
      >
        Block
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="contained"
        onClick={handleUnBlock}
      >
        Unblock
      </Button>
      <Button
        sx={{ marginRight: '5px' }}
        variant="contained"
        color="success"
        onClick={handleAdmin}
      >
        Admin
      </Button>
      <Button variant="contained" color="error" onClick={handleNonAdmin}>
        Non-admin
      </Button>
      <DataGrid
        sx={{ marginTop: '15px', height: '75vh' }}
        rows={newUsers}
        columns={columns}
        getRowId={(row) => row._id}
        checkboxSelection
        pageSize={pageSize}
        loading={!users.length}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        pagination
        selectionModel={checked}
        rowsPerPageOptions={[7, 10, 20]}
        onSelectionModelChange={(params) => setChecked(params)}
      />
    </>
  );
}

export default UsersTable;
