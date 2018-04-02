export const SYNC_CATEGORIES = 'SYNC_CATEGORIES';
export const SYNC_ALL_POSTS = 'SYNC_ALL_POSTS';
export const SYNC_LOCAL_POSTS = 'SYNC_LOCAL_POSTS';
export const SYNC_LOCAL_POST = 'SYNC_LOCAL_POST';
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPVOTE_POST = 'UPVOTE_POST';
export const DOWNVOTE_POST = 'DOWNVOTE_POST';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const UPVOTE_COMMENT = 'UPVOTE_COMMENT';
export const DOWNVOTE_COMMENT = 'DOWNVOTE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

export const addComment = comment => ({
	type: ADD_COMMENT,
	comment
});

export const addPost = post => ({
	type: ADD_POST,
	post
});

export const syncAllPosts = posts => ({
	type: SYNC_ALL_POSTS,
	posts
});

export const syncLocalPosts = posts => ({
	type: SYNC_LOCAL_POSTS,
	posts
});

export const syncLocalPost = post => ({
	type: SYNC_LOCAL_POST,
	post
});

export const upvotePost = post => ({
	type: UPVOTE_POST,
	post
});

export const downvotePost = post => ({
	type: DOWNVOTE_POST,
	post
});

export const deletePost = post => ({
	type: DELETE_POST,
	post
});

export const upvoteComment = commentId => ({
	type: UPVOTE_COMMENT,
	commentId
});

export const downvoteComment = commentId => ({
	type: DOWNVOTE_COMMENT,
	commentId
});

export const deleteComment = commentId => ({
	type: DELETE_COMMENT,
	commentId
});

export const editComment = comment => ({
	type: EDIT_COMMENT,
	comment
});

export const editPost = post => ({
	type: EDIT_POST,
	post
});


