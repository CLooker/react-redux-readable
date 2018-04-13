import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPostInfo from './EditPostInfo';
import Loading from './Loading';
import fetchLocalPost from '../utils/fetchLocalPost.js';
import serverPostEdit from '../utils/serverPostEdit.js';
import updateHerokuLoaded from '../utils/updateHerokuLoaded.js';
import { syncLocalPost, editPost } from '../actions';

class EditPost extends Component {
  state = {
    postExists: '',
    title: '',
    body: '',
    voteScore: '',
    commentCount: '',
    category: '',
    author: '',
    timestamp: '',
    deleted: ''
  };

  componentDidMount() {
    fetchLocalPost(this.props.match.params.id)
      .then(res => this.props.syncLocalPost(res) && res)
      .then(
        ({
          title,
          body,
          voteScore,
          commentCount,
          category,
          author,
          timestamp,
          deleted
        }) =>
          this.setState({
            title,
            body,
            voteScore,
            commentCount,
            category,
            author,
            timestamp,
            deleted
          })
      )
      .then(() =>
        updateHerokuLoaded(
          this.props.herokuLoaded,
          this.props.updateHerokuLoaded
        )
      )
      .catch(err => console.log(err));
  }

  handleTitleChange = e => this.setState({ title: e.target.value });

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleSubmit = () => {
    if (this.inputValidated()) {
      serverPostEdit({
        id: this.props.match.params.id,
        title: this.state.title,
        body: this.state.body
      })
        .then(res => this.props.editPost(res))
        .then(() => this.navigateToPost())
        .catch(err => console.log(err));
    }
  };

  inputValidated = () => this.titleValidated() && this.bodyValidated();

  titleValidated = () =>
    this.state.title.trim() !== ''
      ? true
      : alert('Title cannot be blank.') || false;

  bodyValidated = () =>
    this.state.body.trim() !== ''
      ? true
      : alert('Body cannot be blank.') || false;

  handleCancel = () => this.navigateToPost();

  navigateToPost = () =>
    this.props.history.push(
      `/react-redux-readable/${this.props.match.params.category}/${
        this.props.match.params.id
      }`
    );

  render() {
    const {
      deleted,
      title,
      body,
      category,
      author,
      timestamp,
      voteScore,
      commentCount
    } = this.state;
    return this.props.herokuLoaded ? (
      !deleted && (
        <div className="edit-post-container">
          <div className="edit-post-title">Edit Post</div>
          <div className="edit-post-info-container">
            <EditPostInfo
              title={title}
              handleTitleChange={this.handleTitleChange}
              body={body}
              handleBodyChange={this.handleBodyChange}
              voteScore={voteScore}
              commentCount={commentCount}
              category={category}
              author={author}
              timestamp={timestamp}
              handleSubmit={this.handleSubmit}
              handleCancel={this.handleCancel}
            />
          </div>
        </div>
      )
    ) : (
      <Loading />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    syncLocalPost: post => dispatch(syncLocalPost(post)),
    editPost: post => dispatch(editPost(post))
  };
}

export default connect(null, mapDispatchToProps)(EditPost);
