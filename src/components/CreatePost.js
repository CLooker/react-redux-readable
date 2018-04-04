import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreatePostForm from './CreatePostForm';
import { syncAllPosts, addPost } from '../actions';
import returnUniqueValue from '../utils/returnUniqueValue.js';

class CreatePost extends Component {
	state = {
		title: '',
		body: '',
		author: '',
		category: 'Select Post Category...',
		id: ''
	};

	syncAllPosts = () =>
		fetch('http://localhost:3001/posts/', {
			method: 'GET',
			headers: {
				Authorization: 'react-redux-app'
			}
		})
			.then(res => res.json())
			.then(res => this.props.syncAllPosts(res))
			.then(() => this.navigateToNewPost(this.state.id))
			.catch(err => console.log(err));

	navigateToNewPost = id =>
		this.props.history.push(`/${this.state.category}/${id}`);

	postIsValidated = ({ title, body, author, category }) =>
		fetch('http://localhost:3001/posts/', {
			method: 'POST',
			headers: {
				Authorization: 'react-redux-app',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				id: returnUniqueValue(),
				timestamp: Date.now(),
				title,
				body,
				author,
				category
			})
		})
			.then(res => res.json())
			.then(({ id }) => this.setState({ id }))
			.then(() => {
				this.syncAllPosts();
			})
			.catch(err => console.log(err));

	validate = ({ title, body, author, category }) =>
		this.validateTitle(title) &&
		this.validateAuthor(author) &&
		this.validateBody(body) &&
		this.validateCategory(category);

	validateTitle = title =>
		title ? true : alert('Your post needs a title.') || false;

	validateBody = body =>
		body ? true : alert('Your post body is empty.') || false;

	validateAuthor = author =>
		author ? true : alert('Your post needs an author.') || false;

	validateCategory = category =>
		this.props.categories.some(c => c === category)
			? true
			: alert('Please select a category.') || false;

	handleSubmit = e => {
		const { title, body, author, category } = this.state;

		e.preventDefault();

		this.validate({ title, body, author, category }) &&
			this.postIsValidated({ title, body, author, category });
	};

	handleTitleChange = e => this.setState({ title: e.target.value });

	handleBodyChange = e => this.setState({ body: e.target.value });

	handleAuthorChange = e => this.setState({ author: e.target.value });

	handleCategoryChange = e => this.setState({ category: e.target.value });

	render() {
		return (
			<div className="create-post-container">
				<div className="create-post-title">Create Post</div>
				<CreatePostForm
					handleSubmit={this.handleSubmit}
					title={this.state.title}
					handleTitleChange={this.handleTitleChange}
					author={this.state.author}
					handleAuthorChange={this.handleAuthorChange}
					body={this.state.body}
					handleBodyChange={this.handleBodyChange}
					category={this.state.category}
					handleCategoryChange={this.handleCategoryChange}
				/>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		categories: state.posts.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		syncAllPosts: post => dispatch(syncAllPosts(post)),
		addPost: post => dispatch(addPost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);


