import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import SortPosts from './SortPosts';
import PostsList from './PostsList';
import voteScoresDiff from '../utils/voteScoresDiff.js';
import fetchAllPosts from '../utils/fetchAllPosts.js';
import sortByTimeStamp from '../utils/sortByTimeStamp.js';
import sortByVoteScore from '../utils/sortByVoteScore.js';
import serverUpvotePost from '../utils/serverUpvotePost.js';
import serverDownvotePost from '../utils/serverDownvotePost.js';
import serverDeletePost from '../utils/serverDeletePost.js';

// new posts shouldn't have old posts comments render

class Root extends Component {
	state = {
		postsToRender: [],
		order: null
	};

	componentDidMount() {
		this.fetchAllPosts();
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return voteScoresDiff(nextProps, prevState, null, prevState.order);
	}

	fetchAllPosts = () =>
		fetchAllPosts()
			.then(res => this.props.syncAllPosts(res) && res)
			.then(res => this.setState({ postsToRender: res }))
			.catch(err => console.log(err));

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
			.then(() => this.fetchAllPosts())
			.catch(err => console.log(err));

	sortByTimeStamp = () =>
		this.setState({
			postsToRender: sortByTimeStamp(this.state.postsToRender),
			order: 'sortByTimeStamp'
		});

	sortByVoteScore = () =>
		this.setState({
			postsToRender: sortByVoteScore(this.state.postsToRender),
			order: 'sortByVoteScore'
		});

	render() {
		return (
			<div>
				{this.state.postsToRender.length > 0 && (
					<div>
						<div className="root-title-and-sort-container">
							<div className="all-posts-title">All Posts</div>
							{this.state.postsToRender.length > 1 && (
								<div className="sort-posts">
									<SortPosts
										order={this.state.order}
										sortByTimeStamp={this.sortByTimeStamp}
										sortByVoteScore={this.sortByVoteScore}
									/>
								</div>
							)}
						</div>
						<PostsList
							postsToRender={this.state.postsToRender}
							serverDeletePost={this.serverDeletePost}
							serverUpvotePost={this.serverUpvotePost}
							serverDownvotePost={this.serverDownvotePost}
							{...this.props}
						/>
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.posts.categories,
		posts: Object.keys(state.posts.postsById).map(
			key => state.posts.postsById[key]
		)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		syncAllPosts: posts => dispatch(actions.syncAllPosts(posts)),
		upvotePost: post => dispatch(actions.upvotePost(post)),
		downvotePost: post => dispatch(actions.downvotePost(post)),
		deletePost: post => dispatch(actions.deletePost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Root);
