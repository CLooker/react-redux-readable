import React from 'react';
import Post from './Post';

const PostsList = ({
  serverDeletePost,
  serverUpvotePost,
  serverDownvotePost,
  postsToRender
}) => (
  <ul>
    {postsToRender.map(
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

export default PostsList;
