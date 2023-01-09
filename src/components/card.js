import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function ReviewCard({
  img,
  title,
  body,
  date,
  author,
  grade,
  category,
  likes,
  views,
}) {
  const newDate = new Date(date).toLocaleDateString(
    localStorage.getItem('locale') === 'ru' ? 'ru-RU' : 'en-US',
    {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  );

  const shortBody = body.slice(0, 100);
  const lan = localStorage.getItem('locale') === 'ru' ? 'автор' : 'by';
  return (
    <Card elevation={8} sx={{ maxWidth: 345 }}>
      <CardMedia component="img" height="194" image={img} alt="Paella dish" />
      <CardHeader
        title={title}
        subheader={newDate + '  ' + lan + ' ' + author}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {shortBody}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Typography variant="body2" color="text.secondary">
          Grade {grade}
        </Typography>
        <Typography>
          <FavoriteIcon />
          {likes}
        </Typography>
        <Typography>
          <FavoriteIcon />
          {views}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {category}
        </Typography>
        <Button>Read more</Button>
      </CardActions>
    </Card>
  );
}
