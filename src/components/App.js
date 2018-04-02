import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './Nav';
import Root from './Root';
import AddPost from './AddPost';
import CategoryPosts from './CategoryPosts';
import PostDetails from './PostDetails';
import EditPost from './EditPost';
import AddComment from './AddComment';
import EditComment from './EditComment';
import '../App.css';

export default class App extends Component {
	render() {
		return (
			<Router>
				<div>
					<Route path="" render={routeProps => <Nav {...routeProps} />} />
					<Route exact path="/" component={Root} />
					<Route exact path="/create/posts" component={AddPost} />
					<Route exact path="/:category/posts" component={CategoryPosts} />
					<Route exact path="/posts/:id" component={PostDetails} />
					<Route exact path="/posts/edit/:id" component={EditPost} />
					<Route
						exact
						path="/posts/:id/comments/create"
						component={AddComment}
					/>
					<Route
						exact
						path="/posts/:id/comments/:commentId/edit"
						component={EditComment}
					/>
				</div>
			</Router>
		);
	}
}
