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
import Loading from './Loading';
import NoMatch from './NoMatch';
import voteScoresDiff from '../utils/voteScoresDiff.js';
import fetchLocalPosts from '../utils/fetchLocalPosts.js';
import sortByTimeStamp from '../utils/sortByTimeStamp.js';
import sortByVoteScore from '../utils/sortByVoteScore.js';
import serverUpvotePost from '../utils/serverUpvotePost.js';
import serverDownvotePost from '../utils/serverDownvotePost.js';
import serverDeletePost from '../utils/serverDeletePost.js';
import updateHerokuLoaded from '../utils/updateHerokuLoaded.js';

class CategoryPosts extends Component {
  state = {
    category: null,
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
          category: this.capitalizeTitle(this.props.match.params.category),
          postsToRender: [...res]
        })
      )
      .then(() =>
        updateHerokuLoaded(
          this.props.herokuLoaded,
          this.props.updateHerokuLoaded
        )
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

  localCategoryMatchesProps = () =>
    this.state.category === this.props.match.params.category;

  categoryHasPosts = () => this.state.postsToRender.length > 0;

  categoryHasMultiplePosts = () => this.state.postsToRender.length > 1;

  validateCategory = () =>
    this.props.categories.some(cat => cat === this.props.match.params.category);

  render() {
    return this.props.herokuLoaded ? (
      this.validateCategory() ? (
        <div className="category-posts">
          <div className="category-title-and-sort-container">
            <h1 className="category-title">{this.state.category}</h1>
            {this.categoryHasMultiplePosts() && (
              <div className="sort-posts">
                <SortPosts
                  sortByTimeStamp={this.sortByTimeStamp}
                  sortByVoteScore={this.sortByVoteScore}
                  order={this.state.order}
                />
              </div>
            )}
          </div>

          {this.categoryHasPosts() && (
            <PostsList
              postsToRender={this.state.postsToRender}
              serverDeletePost={this.serverDeletePost}
              serverUpvotePost={this.serverUpvotePost}
              serverDownvotePost={this.serverDownvotePost}
              {...this.props}
            />
          )}
        </div>
      ) : (
        <NoMatch location={this.props.location} />
      )
    ) : (
      <Loading />
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: Object.keys(state.posts.postsById).map(
      key => state.posts.postsById[key]
    ),
    categories: state.posts.categories
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
