import React from 'react';
import Button from '@mui/material/Button';
import { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Route, Link, Routes, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Checkbox from '@mui/material/Checkbox';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

function SingleReview() {
  const params = useParams();
  const navigate = useNavigate();

  const reviewId = params.id;
  const [review, setReview] = useState();
  const [tags, setTags] = useState([]);
  // const [grade, setGrade] = useState('');
  const [resourceId, setResourceId] = useState('');
  const [resource, setResource] = useState('');
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [likedBefore, setLikedBefore] = useState(false);
  const [likesNumber, setLikesNumber] = useState(0);
  const [rating, setRating] = useState();
  const [ratedBefore, setRatedBefore] = useState(false);

  const [error, setError] = useState(false);
  const localUser = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/review/${reviewId}`)
        .then((response) => response.json())
        .then((json) => {
          setReview(json);
          setTags(json.tags);
          // setGrade(json.grade);
          setResourceId(json.resourceId);
          const alreadyLiked = json.likesAll.find(
            (r) => r.userId.toString() === localUser._id
          );

          if (alreadyLiked) {
            setLikedBefore(true);
          }
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/api/comment/getall/review/${reviewId}`)
        .then((response) => response.json())
        .then((json) => {
          setComments(json);
        });
    }
    fetchData();
  }, [newComment]);

  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/reviewLikes/${reviewId}`)
        .then((response) => response.json())
        .then((json) => {
          setLikesNumber(json);
        });
    }
    fetchData();
  }, [likedBefore]);
  // get resource rating data to check if user rated
  useEffect(() => {
    async function fetchData() {
      await fetch(`http://localhost:4000/rating/getall/resource/${resourceId}`)
        .then((response) => response.json())
        .then((json) => {
          const alreadyRated = json.find(
            (r) => r.userId.toString() === localUser._id
          );

          if (alreadyRated) {
            setRatedBefore(true);
          } else {
            json.map((e) => {
              if (e.userId.toString() === localUser._id) setRating(e.rating);
            });
          }
        });
    }
    setTimeout(() => {
      fetchData();
    }, 1000);
  }, []);
  //geting one resource data with id
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/resource/getOne/${resourceId}`)
        .then((response) => response.json())
        .then((json) => {
          setResource(json);
        });
    }
    fetchData();
  }, [review]);
  useEffect(() => {
    async function fetchData() {
      // You can await here
      await fetch(`http://localhost:4000/resource/getOne/${resourceId}`)
        .then((response) => response.json())
        .then((json) => {
          setResource(json);
        });
    }
    fetchData();
  }, []);
  const newDate = new Date(review?.createdAt).toLocaleDateString(
    localStorage.getItem('locale') === 'ru' ? 'ru-RU' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const userId = review?.authorId;
  const handleCommentSubmit = () => {
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/api/review/comment`,
      data: {
        userId: localUser._id,
        reviewId: reviewId,
        comment: newComment,
      },
    };
    axios(configuration)
      .then(() => {
        setNewComment('');
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };
  const handleLike = (e) => {
    console.log('liked');
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/api/review/like`,
      data: {
        userId: localUser._id,
        reviewId: reviewId,
      },
    };

    axios(configuration)
      .then(() => {
        likedBefore ? setLikedBefore(false) : setLikedBefore(true);
      })
      .catch((error) => {
        setError(error.response.data.message);
        console.log(error.response.data.message);
      });
  };

  const handleUserRating = () => {
    const configuration = {
      method: 'post',
      url: `http://localhost:4000/api/resource/addUserRating`,
      data: {
        userId: localUser._id,
        reviewId: reviewId,
        resourceId: resourceId,
        rating: rating,
      },
    };

    axios(configuration)
      .then(() => {
        ratedBefore ? setRatedBefore(false) : setRatedBefore(true);
      })
      .catch((error) => {
        setError(true);
        console.log('Error');
      });
  };

  const handleErrorClose = () => {
    setError(false);
    setRatedBefore(true);
  };
  return (
    <>
      <Container>
        {userId === localUser._id && (
          <Button
            variant="outlined"
            onClick={() => {
              navigate(`/review/edit/${reviewId}`);
            }}
          >
            Edit Review
          </Button>
        )}

        <Paper
          sx={{
            p: 2,
            flexGrow: 1,
            marginTop: '10px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item></Grid>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h4" component="div">
                    {review?.name}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography variant="subtitle1" component="div">
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Checkbox
                      checked={likedBefore}
                      onChange={handleLike}
                      icon={<FavoriteBorderIcon />}
                      checkedIcon={<FavoriteIcon />}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                    {likesNumber}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                    }}
                  >
                    <VisibilityIcon />
                    {review?.views}
                  </div>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <img
          src={review?.reviewPhotoLink}
          alt="reviewImage"
          style={{ width: '100%', maxHeight: '450px' }}
        />

        <Paper
          sx={{
            p: 2,
            marginBottom: '20px',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography variant="body2" color="text.secondary">
                    {newDate}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {review?.reviewBody}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
        <Paper
          sx={{
            p: 2,
            maxWidth: 390,
            flexGrow: 1,
            marginBottom: '10px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Grid item xs>
                  <Typography gutterBottom variant="h5" component="div">
                    {review?.resourceName}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    Author {review?.authorName}'s Grade: {review?.grade}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {review?.category}
                  </Typography>
                </Grid>
                <Grid item>
                  {resource && (
                    <Typography sx={{ cursor: 'pointer' }} variant="body2">
                      Avrage grade: {resource?.grade}
                      <Rating
                        precision={0.5}
                        name="customized-10"
                        max={10}
                        value={resource?.grade}
                        readOnly
                      />
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Grid item>
                {resource && (
                  <Typography variant="subtitle1" component="div">
                    Average rating: {resource?.rating}
                    <Rating
                      precision={0.5}
                      name="customized-10"
                      max={5}
                      value={resource?.rating}
                      readOnly
                    />
                  </Typography>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
            maxWidth: 390,
            flexGrow: 1,
            marginBottom: '10px',
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant="h5" component="div">
                Your resource rating:
              </Typography>
              {ratedBefore ? (
                <Rating name="simple-controlled" value={rating} readOnly />
              ) : (
                <>
                  <Rating
                    name="simple-controlled"
                    value={rating}
                    onChange={(event, newValue) => {
                      setRating(newValue);
                    }}
                  />
                  <Button variant="outlined" onClick={handleUserRating}>
                    {' '}
                    Rate Resource
                  </Button>
                </>
              )}
              <Snackbar
                open={error}
                autoHideDuration={3000}
                onClose={handleErrorClose}
                message="Note archived"
              >
                <Alert severity="error">
                  You have already rated the resource!
                </Alert>
              </Snackbar>
            </Grid>
          </Grid>
        </Paper>

        <Paper
          sx={{
            p: 2,
            marginBottom: '20px',
            flexGrow: 1,
            backgroundColor: (theme) =>
              theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm container>
              <Grid item xs container direction="column" spacing={2}>
                <Typography variant="h6" sx={{ margin: '10px 20px' }}>
                  Recent Comments
                </Typography>
                {comments.length === 0 && (
                  <Typography
                    variant="body"
                    sx={{ marginLeft: '20px', marginBottom: '20px' }}
                  >
                    No Comments yet
                  </Typography>
                )}
                {comments?.map((comment) => (
                  <Paper
                    key={comment._id}
                    sx={{
                      p: 2,
                      maxWidth: 300,
                      flexGrow: 1,
                      margin: '15px 20px',
                      backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#4c5c75' : '#a8bee0',
                    }}
                  >
                    <Typography variant="body2" color="text.secondary">
                      {comment.authorName}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {comment.comment}
                    </Typography>
                  </Paper>
                ))}
                <TextField
                  id="comment"
                  value={newComment}
                  label="Write comment"
                  onChange={(e) => setNewComment(e.target.value)}
                  variant="outlined"
                />
                <Button onClick={handleCommentSubmit}> Send Coment</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>

        <Grid container spacing={1} sx={{ marginBottom: '10px' }}>
          {tags.map((tag) => (
            <Grid item xs={3} sm={3} md={1.5} key={tag}>
              <Button variant="outlined">#{tag}</Button>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}

export default SingleReview;
