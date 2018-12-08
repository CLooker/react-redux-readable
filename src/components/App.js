import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from 'react-router-dom';
import Nav from './Nav';
import Root from './Root';
import CreatePost from './CreatePost';
import CategoryPosts from './CategoryPosts';
import PostDetails from './PostDetails';
import EditPost from './EditPost';
import CreateComment from './CreateComment';
import EditComment from './EditComment';
import NoMatch from './NoMatch';
import Footer from './Footer';
import '../App.css';

export default class App extends Component {
  state = {
    herokuLoaded: false
  };

  updateHerokuLoaded = () =>
    !this.state.herokuLoaded && this.setState({ herokuLoaded: true });

  componentProps = routeProps => ({
    herokuLoaded: this.state.herokuLoaded,
    updateHerokuLoaded: this.updateHerokuLoaded,
    ...routeProps
  });

  render() {
    return (
      <Router>
        <div className='route-container'>
          <Route path='*' component={Nav} />
          <Switch>
            <Route
              exact
              path='/'
              render={() => <Redirect to='/react-redux-readable' />}
            />
            <Route
              exact
              path={'/react-redux-readable/'}
              render={routeProps => (
                <Root {...this.componentProps(routeProps)} />
              )}
            />
            <Route
              exact
              path='/react-redux-readable/create-post'
              component={CreatePost}
            />

            <Route
              exact
              path='/react-redux-readable/:category'
              render={routeProps => (
                <CategoryPosts {...this.componentProps(routeProps)} />
              )}
            />
            <Route
              exact
              path='/react-redux-readable/:category/:id'
              render={routeProps => (
                <PostDetails {...this.componentProps(routeProps)} />
              )}
            />
            <Route
              exact
              path='/react-redux-readable/:category/:id/edit'
              render={routeProps => (
                <EditPost {...this.componentProps(routeProps)} />
              )}
            />
            <Route
              exact
              path='/react-redux-readable/:category/:id/create-comment'
              render={routeProps => (
                <CreateComment {...this.componentProps(routeProps)} />
              )}
            />
            <Route
              exact
              path='/react-redux-readable/:category/:id/edit-comment/:commentId'
              render={routeProps => (
                <EditComment {...this.componentProps(routeProps)} />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </div>
      </Router>
    );
  }
}
