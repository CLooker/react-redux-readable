import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class Comment extends Component {
  serverCommentUpvote = id =>
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'react-redux-app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        option: 'upVote'
      })
    })
      .then(res => res.json())
      .then(res => this.props.upvoteComment(id))
      .catch(err => console.log(err));

  serverCommentDownvote = id =>
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'POST',
      headers: {
        Authorization: 'react-redux-app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        option: 'downVote'
      })
    })
      .then(res => res.json())
      .then(res => this.props.downvoteComment(id))
      .catch(err => console.log(err));

  serverCommentDelete = id =>
    fetch(`http://localhost:3001/comments/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: 'react-redux-app',
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(res => this.props.deleteComment(res.id))
      .catch(err => console.log(err));

  render() {
    const { comment, parentId } = this.props;
    return (
      <li
        key={comment.id}
        style={{ listStyleType: 'none' }}
        className="comment"
      >
        <div className="comment-info">
          <p>
            <strong>{comment.body}</strong>
          </p>
          <br />
          <p>
            <strong>Score: </strong>
            {comment.voteScore}
          </p>
          <p>
            <strong>By: </strong>
            {comment.author}
          </p>
          <p>
            <strong>Date: </strong>
            {new Date(comment.timestamp).toLocaleString()}
          </p>
        </div>
        <br />
        <div className="post-buttons">
          <Link to={`/posts/${parentId}/comments/${comment.id}/edit`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => this.serverCommentDelete(comment.id)}>
            Delete
          </button>
          <button onClick={() => this.serverCommentUpvote(comment.id)}>
            Upvote
          </button>
          <button onClick={() => this.serverCommentDownvote(comment.id)}>
            Downvote
          </button>
        </div>
      </li>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    upvoteComment: commentId => dispatch(actions.upvoteComment(commentId)),
    downvoteComment: commentId => dispatch(actions.downvoteComment(commentId)),
    deleteComment: commentId => dispatch(actions.deleteComment(commentId))
  };
}

export default connect(null, mapDispatchToProps)(Comment);
