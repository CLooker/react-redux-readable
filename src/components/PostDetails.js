import React, { Component } from 'react';
import { connect } from 'react-redux';
import { syncLocalPost, addComment } from '../actions';
import Loading from './Loading';
import Comments from './Comments';
import PostDetailsPost from './PostDetailsPost';
import NoMatch from './NoMatch';
import voteScoresDiff from '../utils/voteScoresDiff.js';
import fetchComments from '../utils/fetchComments.js';
import fetchLocalPost from '../utils/fetchLocalPost.js';

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

	fetchComments = post =>
		fetchComments(post)
			.then(
				res => res.forEach(comment => this.props.addComment(comment)) || res
			)
			.then(res => this.setState({ comments: [...res], isFetching: false }))

			.catch(err => err);

	fetchPost = post => {
		fetchLocalPost(post)
			.then(
				res =>
					Object.keys(res).length > 0
						? this.props.syncLocalPost(res) && res
						: { deleted: true }
			)
			.then(
				({
					id,
					title,
					body,
					author,
					voteScore,
					category,
					timestamp,
					deleted,
					commentCount
				}) =>
					this.setState({
						id,
						title,
						body,
						author,
						voteScore,
						category,
						timestamp,
						deleted,
						commentCount
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
		syncLocalPost: post => dispatch(syncLocalPost(post)),
		addComment: comment => dispatch(addComment(comment))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);
