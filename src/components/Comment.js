import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentInfo from './CommentInfo';
import CommentButtons from './CommentButtons';
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
    const { comment, category } = this.props;
    return (
      <li className="comment">
        <CommentInfo
          body={comment.body}
          voteScore={comment.voteScore}
          author={comment.author}
          timestamp={comment.timestamp}
        />
        <br />
        <CommentButtons
          category={category}
          parentId={comment.parentId}
          id={comment.id}
          serverCommentDelete={this.serverCommentDelete}
          serverCommentUpvote={this.serverCommentUpvote}
          serverCommentDownvote={this.serverCommentDownvote}
        />
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
