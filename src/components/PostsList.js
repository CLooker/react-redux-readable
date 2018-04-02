import React, { Component } from 'react';
import Post from './Post';

class PostsList extends Component {
  render() {
    const {
      serverDeletePost,
      serverUpvotePost,
      serverDownvotePost
    } = this.props;
    return (
      <ul>
        {this.props.postsToRender.map(
          post =>
            post.deleted === false && (
              <Post
                key={post.id}
                post={post}
                serverDeletePost={serverDeletePost}
                serverUpvotePost={serverUpvotePost}
                serverDownvotePost={serverDownvotePost}
              />
            )
        )}
      </ul>
    );
  }
}

export default PostsList;
