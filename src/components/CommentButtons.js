import React from 'react';
import { Link } from 'react-router-dom';

const CommentButtons = ({
  category,
  parentId,
  id,
  serverCommentDelete,
  serverCommentUpvote,
  serverCommentDownvote
}) => (
  <div className="post-buttons">
    <Link to={`/${category}/${parentId}/edit-comment/${id}`}>
      <button>Edit</button>
    </Link>
    <button onClick={() => serverCommentDelete(id)}>Delete</button>
    <button onClick={() => serverCommentUpvote(id)}>Upvote</button>
    <button onClick={() => serverCommentDownvote(id)}>Downvote</button>
  </div>
);

export default CommentButtons;
