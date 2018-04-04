import React from 'react';
import { Link } from 'react-router-dom';

const PostButtons = ({
  category,
  id,
  serverDeletePost,
  serverUpvotePost,
  serverDownvotePost
}) => (
  <div className="post-buttons">
    <Link to={`/react-redux-readable/${category}/${id}/edit/`}>
      <button>Edit</button>
    </Link>
    <button onClick={() => serverDeletePost(id)}>Delete</button>
    <button onClick={() => serverUpvotePost(id)}>Upvote</button>
    <button onClick={() => serverDownvotePost(id)}>Downvote</button>
    <Link to={`/react-redux-readable/${category}/${id}/create-comment`}>
      <button>Comment</button>
    </Link>
  </div>
);

export default PostButtons;
