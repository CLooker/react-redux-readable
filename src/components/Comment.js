import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommentInfo from './CommentInfo';
import CommentButtons from './CommentButtons';
import { upvoteComment, downvoteComment, deleteComment } from '../actions';
import serverCommentUpvote from '../utils/serverCommentUpvote.js';
import serverCommentDownvote from '../utils/serverCommentUpvote.js';
import serverCommentDelete from '../utils/serverCommentDelete.js';

class Comment extends Component {
  serverCommentUpvote = id =>
    serverCommentUpvote(id)
      .then(res => this.props.upvoteComment(id))
      .catch(err => console.log(err));

  serverCommentDownvote = id =>
    serverCommentDownvote(id)
      .then(res => this.props.downvoteComment(id))
      .catch(err => console.log(err));

  serverCommentDelete = id =>
    serverCommentDelete(id)
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
