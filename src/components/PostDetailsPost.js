import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import serverUpvotePost from '../utils/serverUpvotePost.js';
import serverDownvotePost from '../utils/serverDownvotePost.js';
import serverDeletePost from '../utils/serverDeletePost.js';

class PostDetailsPost extends Component {
  serverUpvotePost = id =>
    serverUpvotePost(id)
      .then(res => this.props.upvotePost(res))
      .catch(err => console.log(err));

  serverDownvotePost = id =>
    serverDownvotePost(id)
      .then(res => this.props.downvotePost(res))
      .catch(err => console.log(err));

  serverDeletePost = id =>
    serverDeletePost(id)
      .then(res => this.props.deletePost(res))
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));

  render() {
    const {
      id,
      title,
      body,
      voteScore,
      commentCount,
      category,
      author,
      timestamp
    } = this.props;
    return (
      <div className="post details">
        <p style={{ fontWeight: 'bold' }}>{title}</p>
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
          <button onClick={() => this.serverDeletePost(id)}>Delete</button>
          <button onClick={() => this.serverUpvotePost(id)}>Upvote</button>
          <button onClick={() => this.serverDownvotePost(id)}>Downvote</button>
          <Link to={`/posts/${id}/comments/create`}>
            <button>Comment</button>
          </Link>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upvotePost: post => dispatch(actions.upvotePost(post)),
    downvotePost: post => dispatch(actions.downvotePost(post)),
    deletePost: post => dispatch(actions.deletePost(post))
  };
}

export default connect(null, mapDispatchToProps)(PostDetailsPost);
