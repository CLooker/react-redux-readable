import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentInfo from './CommentInfo';
import CommentButtons from './CommentButtons';
import { upvoteComment, downvoteComment, deleteComment } from '../actions';

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
    const {
      category,
      comment: { body, voteScore, author, timestamp, parentId, id }
    } = this.props;
    return (
      <li className="comment">
        <CommentInfo
          body={body}
          voteScore={voteScore}
          author={author}
          timestamp={timestamp}
        />
        <br />
        <CommentButtons
          category={category}
          parentId={parentId}
          id={id}
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
    upvoteComment: commentId => dispatch(upvoteComment(commentId)),
    downvoteComment: commentId => dispatch(downvoteComment(commentId)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  };
}

export default connect(null, mapDispatchToProps)(Comment);

