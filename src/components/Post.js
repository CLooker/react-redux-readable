import React from 'react';
import PostButtons from './PostButtons';
import { Link } from 'react-router-dom';

const Post = ({
  serverDeletePost,
  serverUpvotePost,
  serverDownvotePost,
  post: {
    id,
    title,
    body,
    voteScore,
    commentCount,
    category,
    author,
    timestamp
  }
}) => (
  <div className="post">
    <li>
      <p>
        <Link
          to={`/react-redux-readable/${category}/${id}`}
          className="post-link"
        >
          {title}
        </Link>
      </p>
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
        <Link
          to={`/react-redux-readable/${category}`}
          className="category-link"
        >
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
      <PostButtons
        category={category}
        id={id}
        serverDeletePost={serverDeletePost}
        serverUpvotePost={serverUpvotePost}
        serverDownvotePost={serverDownvotePost}
      />
    </li>
  </div>
);

export default Post;
