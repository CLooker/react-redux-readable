import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import Loading from './Loading';
import Comments from './Comments';
import PostDetailsPost from './PostDetailsPost';
import NoMatch from './NoMatch';
import voteScoresDiff from '../utils/voteScoresDiff.js';

class PostDetails extends Component {
	state = {
		isFetching: false,
		id: '',
		title: '',
		body: '',
		author: '',
		voteScore: '',
		category: '',
		timestamp: '',
		deleted: '',
		commentCount: '',
		comments: []
	};

	componentDidMount() {
		this.fetchPost(this.props.match.params.id);
	}

	static getDerivedStateFromProps(nextProps, prevState) {
		return voteScoresDiff(nextProps, prevState, 'singlePost');
	}

	fetchComments = post => {
		fetch(`http://localhost:3001/posts/${post}/comments`, {
			method: 'GET',
			headers: {
				Authorization: 'react-redux-app'
			}
		})
			.then(res => res.json())
			.then(
				res => res.forEach(comment => this.props.addComment(comment)) || res
			)
			.then(res => this.setState({ comments: [...res], isFetching: false }))

			.catch(err => err);
	};

	fetchPost = post => {
		fetch(`http://localhost:3001/posts/${post}`, {
			method: 'GET',
			headers: {
				Authorization: 'react-redux-app'
			}
		})
			.then(res => res.json())
			.then(
				res =>
					Object.keys(res).length > 0
						? this.props.syncLocalPost(res) && res
						: { deleted: true }
			)
			.then(res =>
				this.setState({
					id: res.id,
					title: res.title,
					body: res.body,
					author: res.author,
					voteScore: res.voteScore,
					category: res.category,
					timestamp: res.timestamp,
					deleted: res.deleted,
					commentCount: res.commentCount
				})
			)
			.then(this.fetchComments(post))
			.catch(err => console.log(err));
	};

	render() {
		const { isFetching, deleted, comments } = this.state;
		return (
			<div className="post-details">
				{isFetching ? (
					<Loading />
				) : (
					<div>
						{!deleted ? (
							<div>
								<PostDetailsPost {...this.state} {...this.props} />
								<Comments
									fetchComments={this.fetchComments}
									comments={comments}
									parentId={this.props.match.params.id}
									category={this.props.match.params.category}
								/>
							</div>
						) : (
							<NoMatch location={this.props.location} />
						)}
					</div>
				)}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		postsById: state.posts.postsById
	};
}

function mapDispatchToProps(dispatch) {
	return {
		syncLocalPost: post => dispatch(actions.syncLocalPost(post)),
		addComment: comment => dispatch(actions.addComment(comment))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
