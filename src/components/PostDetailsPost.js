import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';
import PostDetailsButtons from './PostDetailsButtons';
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
      <div>
        <div className="post-details-post-title">Post Details</div>
        <div className="post details">
          <p>
            <strong>{title}</strong>
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
            <Link to={`/${category}`} className="category-link">
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
          <PostDetailsButtons
            category={category}
            id={id}
            serverDeletePost={this.serverDeletePost}
            serverUpvotePost={this.serverUpvotePost}
            serverDownvotePost={this.serverDownvotePost}
          />
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
