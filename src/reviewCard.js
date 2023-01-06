import React from 'react';
import { Link } from 'react-router-dom';
function reviewCard(post) {
  return (
    <div className="card">
      <Link className="link" to={`/post/${post._id}`}>
        <span className="title">{post.name}</span>

        <button className="cardButton">Read More</button>
      </Link>
    </div>
  );
}

export default reviewCard;
