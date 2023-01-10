import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Autocomplete } from '@mui/material';
import axios from 'axios';
import Rating from '@mui/material/Rating';
import { Button } from '@mui/material';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import TextField from '@mui/material/TextField';

import { v4 } from 'uuid';
const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
};

const focusedStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function EditReview() {
  const params = useParams();
  const navigate = useNavigate();
  const reviewId = params.id;

  const [reviewName, setReviewName] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [grade, setGrade] = useState();
  const [reviewPhotoLink, setReviewPhotoLink] = useState('');
  const [error, setError] = useState('');

  const [imgUpload, setImgUpload] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/review/${reviewId}`)
        .then((response) => response.json())
        .then((json) => {
          setReviewName(json.name);
          setReviewBody(json.reviewBody);
          setGrade(json.grade);
          setReviewPhotoLink(json.reviewPhotoLink);
          setResourceId(json.resourceId);
        });
    }
    fetchData();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    setImgUpload(
      Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      })
    );
  }, []);

  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject,
    isDragActive,
  } = useDropzone({ onDrop, accept: { 'image/*': [] } });
  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const handleSubmit = async () => {
    if (imgUpload == null) return;
    const imageRef = ref(storage, `image/${imgUpload.name + v4()} `);
    await uploadBytes(imageRef, imgUpload);
    const downloadUrl = await getDownloadURL(imageRef);
    const user = JSON.parse(localStorage.getItem('user'));

    setImgUpload(null);
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/review/update`,
      data: {
        reviewId: reviewId,
        reviewName: reviewName,
        reviewBody: reviewBody,
        reviewPhotoLink: downloadUrl,
        grade: grade,
        resourceId: resourceId,
      },
    };
    axios(configuration)
      .then(() => {
        setReviewBody('');
        setReviewName('');
        setGrade('');
        setReviewPhotoLink('');
      })
      .then(() => {
        window.location.href = `/review/${reviewId}`;
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography component="h1" variant="h5">
              Update Review
            </Typography>
          </Box>
          <Box>
            <TextField
              id="title"
              value={reviewName}
              label="Review Title"
              onChange={(e) => setReviewName(e.target.value)}
              variant="outlined"
            />
          </Box>
          <Box>
            <img
              src={reviewPhotoLink}
              alt="revImage"
              width="300px"
              height="400px"
            />
          </Box>
          <Box>
            <div {...getRootProps({ style })}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop review photo here.</p>
              ) : (
                <p>Drag 'n' drop review photo here, or click to select photo</p>
              )}
            </div>
            {imgUpload && (
              <div>
                <img
                  src={imgUpload.preview}
                  style={{ width: '200px' }}
                  alt=""
                />
              </div>
            )}
          </Box>

          <Box>
            <TextField
              id="body"
              value={reviewBody}
              label="Review Body"
              onChange={(e) => setReviewBody(e.target.value)}
              variant="outlined"
            />
          </Box>

          <Box>
            <Box>
              <Typography>Grade resource</Typography>
              <Rating
                name="customized-10"
                value={grade}
                onChange={(event, newValue) => setGrade(newValue)}
                max={10}
              />
            </Box>
            <Button type="button" fullWidth onSubmit={handleSubmit}>
              UPDATE REVIEW
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default EditReview;
