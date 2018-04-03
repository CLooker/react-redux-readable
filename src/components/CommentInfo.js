import React from 'react';

const CommentInfo = ({ body, voteScore, author, timestamp }) => (
  <div className="comment-info">
    <p>{body}</p>
    <br />
    <p>
      <strong>Score: </strong>
      {voteScore}
    </p>
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

export default CommentInfo;
