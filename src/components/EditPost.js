import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditPostInfo from './EditPostInfo';
import * as actions from '../actions';

class EditPost extends Component {
  state = {
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
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
      method: 'GET',
      headers: {
        Authorization: 'react-redux-app'
      }
    })
      .then(res => res.json())
      .then(res => this.props.syncLocalPost(res) && res)
      .then(res => {
        const {
          title,
          body,
          voteScore,
          commentCount,
          category,
          author,
          timestamp,
          deleted
        } = res;
        this.setState({
          title,
          body,
          voteScore,
          commentCount,
          category,
          author,
          timestamp,
          deleted
        });
      });
  }

  handleTitleChange = e => this.setState({ title: e.target.value });

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleSubmit = () => {
    fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: 'react-redux-app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: this.state.title,
        body: this.state.body
      })
    })
      .then(res => res.json())
      .then(res => this.props.editPost(res) && res.id)
      .then(id =>
        this.props.history.push(
          `/${this.props.match.params.category}/${this.props.match.params.id}`
        )
      );
  };

  handleCancel = () =>
    this.props.history.push(
      `/${this.props.match.category}/${this.props.match.params.id}`
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
    return (
      !deleted && (
        <div>
          <div className="edit-post-title">Edit Post</div>
          <div className="edit-post-container">
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    syncLocalPost: post => dispatch(actions.syncLocalPost(post)),
    editPost: post => dispatch(actions.editPost(post))
  };
}

export default connect(null, mapDispatchToProps)(EditPost);
