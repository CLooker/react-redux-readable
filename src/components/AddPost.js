import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import returnUniqueValue from '../utils/returnUniqueValue.js';

class AddPost extends Component {
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

	navigateToNewPost = id => this.props.history.push(`/posts/${id}`);

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
			<form className="post create" onSubmit={this.handleSubmit}>
				<label>Title:</label>
				<input
					type="text"
					value={this.state.title}
					onChange={this.handleTitleChange}
				/>
				<label>Author:</label>
				<input
					type="text"
					value={this.state.author}
					onChange={this.handleAuthorChange}
				/>
				<label>Post Body:</label>
				<textarea value={this.state.body} onChange={this.handleBodyChange} />
				<select
					value={this.state.category}
					onChange={this.handleCategoryChange}
				>
					<option disabled>Select Post Category...</option>
					<option value="react">React</option>
					<option value="redux">Redux</option>
					<option value="udacity">Udacity</option>
				</select>
				<button>Submit</button>
			</form>
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
		syncAllPosts: post => dispatch(actions.syncAllPosts(post)),
		addPost: post => dispatch(actions.addPost(post))
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(AddPost);
