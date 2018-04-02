const initialState = {
	posts: {
		categories: [],
		postsById: {}
	},
	comments: {
		commentsById: {}
	}
};

function reducer(state = initialState, action) {
	switch (action.type) {
		case 'SYNC_CATEGORIES':
			const SYNC_CATEGORIES_returnedState = {
				...state,
				posts: {
					...state.posts,
					categories: action.categories.categories.map(obj => obj.name)
				}
			};
			return SYNC_CATEGORIES_returnedState;
		case 'SYNC_ALL_POSTS':
			let syncAllPostsReturn = {
				...state,
				posts: { ...state.posts, postsById: {} }
			};
			action.posts.forEach(post => {
				syncAllPostsReturn.posts.postsById[post.id] = {
					id: post.id,
					timestamp: post.timestamp,
					title: post.title,
					body: post.body,
					commentCount: post.commentCount,
					author: post.author,
					category: post.category,
					voteScore: post.voteScore,
					deleted: post.deleted
				};
			});
			return syncAllPostsReturn;
		case 'SYNC_LOCAL_POSTS':
			let syncLocalPostsReturn = {
				...state,
				posts: { ...state.posts, postsById: {} }
			};
			action.posts.forEach(post => {
				syncLocalPostsReturn.posts.postsById[post.id] = {
					id: post.id,
					timestamp: post.timestamp,
					title: post.title,
					body: post.body,
					commentCount: post.commentCount,
					author: post.author,
					category: post.category,
					voteScore: post.voteScore,
					deleted: post.deleted
				};
			});
			return syncLocalPostsReturn;
		case 'SYNC_LOCAL_POST':
			const syncLocalPostReturnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: {
						...state.posts.postsById,
						[action.post.id]: action.post
					}
				}
			};
			return syncLocalPostReturnedState;
		case 'GET_COMMENTS':
			let getAllCommentsReturn = {
				...state,
				comments: {
					...state.comments,
					commentsById: {}
				}
			};
			action.comments.forEach(comment => {
				getAllCommentsReturn.comments.commentsById[comment.id] = {
					id: comment.id,
					parentId: comment.parentId,
					timestamp: comment.timestamp,
					body: comment.body,
					author: comment.author,
					voteScore: comment.voteScore,
					deleted: comment.deleted,
					parentDeleted: comment.parentDeleted
				};
			});
			return getAllCommentsReturn;
		case 'ADD_COMMENT':
			const ADD_COMMENT_returnedState = {
				...state,
				comments: {
					...state.comments,
					commentsById: Object.assign({}, state.comments.commentsById, {
						[action.comment.id]: action.comment
					})
				}
			};
			return ADD_COMMENT_returnedState;
		case 'UPVOTE_POST':
			const UPVOTE_POST_returnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: {
						...state.posts.postsById,
						[action.post.id]: action.post
					}
				}
			};
			return UPVOTE_POST_returnedState;
		case 'DOWNVOTE_POST':
			const DOWNVOTE_POST_returnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: {
						...state.posts.postsById,
						[action.post.id]: action.post
					}
				}
			};
			return DOWNVOTE_POST_returnedState;
		case 'ADD_POST':
			const ADD_POST_returnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: Object.assign({}, state.posts.postsById, {
						[action.post.id]: action.post
					})
				}
			};
			return ADD_POST_returnedState;
		case 'DELETE_POST':
			const DELETE_POST_returnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: Object.assign({}, state.posts.postsById, {
						[action.post.id]: action.post
					})
				}
			};
			return DELETE_POST_returnedState;
		case 'EDIT_POST':
			const EDIT_POST_returnedState = {
				...state,
				posts: {
					...state.posts,
					postsById: {
						...state.posts.postsById,
						[action.post.id]: action.post
					}
				}
			};
			return EDIT_POST_returnedState;
		case 'EDIT_COMMENT':
			const EDIT_COMMENT_returnedState = {
				...state,
				comments: {
					...state.comments,
					commentsById: {
						...state.comments.commentsById,
						[action.comment.id]: action.comment
					}
				}
			};
			return EDIT_COMMENT_returnedState;
		case 'UPVOTE_COMMENT':
			const UPVOTE_COMMENT_returnedState = {
				...state,
				comments: {
					...state.comments,
					commentsById: {
						...state.comments.commentsById,
						[action.commentId]: {
							...state.comments.commentsById[action.commentId],
							voteScore: ++state.comments.commentsById[action.commentId]
								.voteScore
						}
					}
				}
			};
			return UPVOTE_COMMENT_returnedState;
		case 'DOWNVOTE_COMMENT':
			const DOWNVOTE_COMMENT_returnedState = {
				...state,
				comments: {
					...state.comments,
					commentsById: {
						...state.comments.commentsById,
						[action.commentId]: {
							...state.comments.commentsById[action.commentId],
							voteScore: --state.comments.commentsById[action.commentId]
								.voteScore
						}
					}
				}
			};
			return DOWNVOTE_COMMENT_returnedState;
		case 'DELETE_COMMENT':
			const DELETE_COMMENT_returnedState = {
				...state,
				comments: {
					...state.comments,
					commentsById: {
						...state.comments.commentsById,
						[action.commentId]: {
							...state.comments.commentsById[action.commentId],
							deleted: true
						}
					}
				}
			};
			return DELETE_COMMENT_returnedState;
		default:
			return state;
	}
}

export default reducer;
