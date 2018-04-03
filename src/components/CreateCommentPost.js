import React from 'react';
import { Link } from 'react-router-dom';

const CreateCommentPost = ({
  category,
  id,
  title,
  body,
  voteScore,
  commentCount,
  author,
  timestamp
}) => (
  <div className="create-comment-post">
    <Link to={`/${category}/${id}`} className="post-link">
      {title}
    </Link>
    <p>{body}</p>
    <br />
    <p>
      <strong>Score: </strong>
      {voteScore}
    </p>
    <p>
      <strong>Comments: </strong>
      {commentCount}
    </p>
    <p>
      <strong>Category: </strong>
      <Link to={`/${category}`} className="category-link">
        {category}
      </Link>
    </p>
    <br />
    <p>
      <strong>By: </strong>
      {author}
    </p>
    <p>
      <strong>Date: </strong>
      {new Date(timestamp).toLocaleString()}
    </p>
  </div>
);

export default CreateCommentPost;
