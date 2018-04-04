import React from 'react';
import { Link } from 'react-router-dom';

const EditPostInfo = ({
  title,
  handleTitleChange,
  body,
  handleBodyChange,
  voteScore,
  commentCount,
  category,
  author,
  timestamp,
  handleSubmit,
  handleCancel
}) => (
  <div className="post edit-post">
    <label>
      <strong>Title:</strong>
      <input type="text" value={title} onChange={handleTitleChange} />
    </label>
    <label>
      <strong>Body:</strong>
      <input type="text" value={body} onChange={handleBodyChange} />
    </label>
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
      <Link to={`/react-redux-readable/${category}`} className="category-link">
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
    <div className="post-buttons">
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  </div>
);

export default EditPostInfo;
