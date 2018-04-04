import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Root from './Root';
import CreatePost from './CreatePost';
import CategoryPosts from './CategoryPosts';
import PostDetails from './PostDetails';
import EditPost from './EditPost';
import CreateComment from './CreateComment';
import EditComment from './EditComment';
import '../App.css';

// validate all forms

export default class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="" component={Nav} />
					<Route exact path="/" component={Root} />
					<Route exact path="/:category" component={CategoryPosts} />
					<Route exact path="/:category/:id" component={PostDetails} />
					<Route exact path="/:category/:id/edit" component={EditPost} />
					<Route
						exact
						path="/:category/:id/create-comment"
						component={CreateComment}
					/>
					<Route
						exact
						path="/:category/:id/edit-comment/:commentId"
						component={EditComment}
					/>
					<Route exact path="/create-post" component={CreatePost} />
				</div>
			</Router>
		);
	}
}
