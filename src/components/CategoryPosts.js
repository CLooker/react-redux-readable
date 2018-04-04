import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	syncAllPosts,
	syncLocalPosts,
	upvotePost,
	downvotePost,
	deletePost
} from '../actions';
import SortPosts from './SortPosts';
import PostsList from './PostsList';
import voteScoresDiff from '../utils/voteScoresDiff.js';
import fetchLocalPosts from '../utils/fetchLocalPosts.js';
import sortByTimeStamp from '../utils/sortByTimeStamp.js';
import sortByVoteScore from '../utils/sortByVoteScore.js';
import serverUpvotePost from '../utils/serverUpvotePost.js';
import serverDownvotePost from '../utils/serverDownvotePost.js';
import serverDeletePost from '../utils/serverDeletePost.js';

class CategoryPosts extends Component {
	state = {
		postsToRender: [],
		order: null
	};

	componentDidMount() {
		this.fetchLocalPosts(this.props.match.params.category);
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.category !== this.props.match.params.category) {
			this.fetchLocalPosts(this.props.match.params.category);
		}
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return voteScoresDiff(nextProps, prevState, null, prevState.order);
	}

	fetchLocalPosts = category =>
		fetchLocalPosts(category)
			.then(res => this.props.syncLocalPosts(res) && res)
			.then(res =>
				this.setState({
					postsToRender: [...res]
				})
			)
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
			.then(() => this.fetchLocalPosts(this.props.match.params.category))
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

	capitalizeTitle = title =>
		title.split('').map((l, i) => (i === 0 ? l.toUpperCase() : l));

	render() {
		return (
			<div className="category-posts">
				<div className="category-title-and-sort-container">
					{this.state.postsToRender.length > 0 && (
						<h1 className="category-title">
							{this.capitalizeTitle(this.props.match.params.category)}
						</h1>
					)}
					{this.state.postsToRender.length > 1 && (
						<div className="sort-posts">
							<SortPosts
								sortByTimeStamp={this.sortByTimeStamp}
								sortByVoteScore={this.sortByVoteScore}
								order={this.state.order}
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
		);
	}
}

function mapStateToProps(state) {
	return {
		posts: Object.keys(state.posts.postsById).map(
			key => state.posts.postsById[key]
		)
	};
}

function mapDispatchToProps(dispatch) {
	return {
		syncAllPosts: posts => dispatch(syncAllPosts(posts)),
		syncLocalPosts: posts => dispatch(syncLocalPosts(posts)),
		upvotePost: post => dispatch(upvotePost(post)),
		downvotePost: post => dispatch(downvotePost(post)),
		deletePost: post => dispatch(deletePost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryPosts);
