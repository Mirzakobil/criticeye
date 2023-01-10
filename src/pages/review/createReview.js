import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { storage } from '../../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import Form from 'react-bootstrap/Form';
import { v4 } from 'uuid';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { Autocomplete } from '@mui/material';
import axios from 'axios';
import Rating from '@mui/material/Rating';
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

function CreateReview() {
  const navigate = useNavigate();
  const [resources, setResources] = useState(['']);
  const [resource, setResource] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [allTags, setAllTags] = useState(['']);
  const [selectedTags, setSelectedTags] = useState(['']);
  const [tagsId, setTagsId] = useState([]);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewBody, setReviewBody] = useState('');
  const [imgUpload, setImgUpload] = useState([]);
  const [error, setError] = useState('');
  const [grade, setGrade] = useState('');
  let optionsResources = [];
  let optionsTags = [];
  const ids = [];
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/resource/getall`)
        .then((response) => response.json())
        .then((json) => setResources(json));
    }
    fetchData();
  }, []);

  resources.map((e) => optionsResources.push(e.name));

  useEffect(() => {
    const resourceData = resources.find((e) => e.name === resource);
    setResourceId(resourceData?._id);
  }, [resource]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`https://criticeye-api.onrender.com/tags/getall`)
        .then((response) => response.json())
        .then((json) => setAllTags(json));
    }
    fetchData();
  }, []);

  allTags.map((e) => optionsTags.push(e.name));

  useEffect(() => {
    selectedTags.map((tag) => {
      const tagData = allTags.find((e) => e.name === tag);
      if (tagData) ids.push(tagData._id);
      setTagsId(ids);
    });
  }, [selectedTags]);

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

    console.log(tagsId);

    setImgUpload(null);
    const configuration = {
      method: 'post',
      url: `https://criticeye-api.onrender.com/api/review/create`,
      data: {
        authorId: user._id,
        resourceId: resourceId,
        reviewPhotoLink: downloadUrl,
        name: reviewTitle,
        reviewBody: reviewBody,
        grade: grade,
        tags: tagsId,
      },
    };
    axios(configuration)
      .then(() => {
        setResource('');
        setSelectedTags(['']);
        setReviewTitle('');
        setReviewBody('');
        setGrade('');
      })
      .then(() => {
        window.location.href = '/';
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
          component="form"
          onSubmit={handleSubmit}
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Box>
            <Typography component="h1" variant="h5">
              Create Review
            </Typography>
          </Box>
          <Box>
            <Autocomplete
              sx={{ width: '400px', marginBottom: '15px', marginTop: '15px' }}
              options={optionsResources}
              renderInput={(params) => (
                <TextField {...params} label="Choose Resource" />
              )}
              value={resource}
              onChange={(e, data) => setResource(data)}
              autoSelect
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
            <Form>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Control
                  name="title"
                  value={reviewTitle}
                  onChange={(e) => setReviewTitle(e.target.value)}
                  size="lg"
                  type="text"
                  placeholder="Review Title"
                  style={{
                    width: '400px',
                    height: '50px',
                    padding: '12px 20px',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'inherit',
                    color: 'inherit',
                    fontSize: '16px',
                    resize: 'none',
                    marginBottom: '15px',
                    marginTop: '15px',
                  }}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Control
                  name="reviewBody"
                  value={reviewBody}
                  onChange={(e) => setReviewBody(e.target.value)}
                  as="textarea"
                  placeholder="Write your opinion..."
                  rows={3}
                  style={{
                    width: '100%',
                    height: '150px',
                    padding: '12px 20px',
                    boxSizing: 'border-box',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    backgroundColor: 'inherit',
                    color: 'inherit',
                    fontSize: '16px',
                    resize: 'none',
                  }}
                />
              </Form.Group>
            </Form>
            <Autocomplete
              multiple
              options={optionsTags}
              renderInput={(params) => <TextField {...params} label="Tags" />}
              onChange={(e, data) => setSelectedTags(data)}
              autoSelect
            />
            <Box>
              <Typography>Grade resource</Typography>
              <Rating
                name="customized-10"
                value={grade}
                onChange={(event, newValue) => setGrade(newValue)}
                max={10}
              />
            </Box>
            <Button type="button" fullWidth onClick={handleSubmit}>
              PUBLISH REVIEW
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default CreateReview;
