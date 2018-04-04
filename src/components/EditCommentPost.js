import React from 'react';
import { Link } from 'react-router-dom';

const EditCommentPost = ({ category, id, title, body }) => (
  <div>
    <div className="edit-comment-post-container">
      <p className="edit-comment-post-text">Post Title:</p>
      <Link to={`/${category}/${id}`} className="post-link">
        {title}
      </Link>
    </div>
    <div className="edit-comment-post-container">
      <p className="edit-comment-post-text">
        <strong>Post Category:</strong>{' '}
      </p>
      <Link to={`/${category}`} className="category-link">
        {category}
      </Link>
    </div>
    <p>
      {' '}
      <strong>Post Body:</strong>{' '}
    </p>
    <textarea value={body} readOnly />
  </div>
);

export default EditCommentPost;
