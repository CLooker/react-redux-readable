import React from 'react';
import { Link } from 'react-router-dom';

const Post = props => {
  const { serverDeletePost, serverUpvotePost, serverDownvotePost } = props;
  const {
    id,
    title,
    body,
    voteScore,
    commentCount,
    category,
    author,
    timestamp
  } = props.post;
  return (
    <div className="post">
      <li style={{ listStyleType: 'none' }}>
        <p>
          <Link
            to={`/posts/${id}`}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'blue',
              color: 'blue',
              fontWeight: 'bold'
            }}
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
            to={`/${category}/posts`}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'blue',
              color: 'blue'
            }}
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
        <div className="post-buttons">
          <Link to={`/posts/edit/${id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => serverDeletePost(id)}>Delete</button>
          <button onClick={() => serverUpvotePost(id)}>Upvote</button>
          <button onClick={() => serverDownvotePost(id)}>Downvote</button>
          <Link to={`/posts/${id}/comments/create`}>
            <button>Comment</button>
          </Link>
        </div>
      </li>
    </div>
  );
};

export default Post;
