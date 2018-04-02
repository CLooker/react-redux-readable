import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      .then(id => this.props.history.push(`/posts/${id}`));
  };

  handleCancel = () =>
    this.props.history.push(`/posts/${this.props.match.params.id}`);

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
        <div
          className="post"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>
            <strong>Title:</strong>
            <input
              type="text"
              value={title}
              onChange={this.handleTitleChange}
            />
          </label>
          <label>
            <strong>Body:</strong>
            <input type="text" value={body} onChange={this.handleBodyChange} />
          </label>
          <br />
          <p>
            <strong>Score: </strong>
            {voteScore}
          </p>
          <p>
            <strong>Comments: </strong>
            {commentCount}
          </p>
          <p>
            <strong>Category: </strong>
            <Link
              to={`/${category}/posts`}
              style={{
                textDecoration: 'underline',
                textDecorationColor: 'blue',
                color: 'blue'
              }}
            >
              {category}
            </Link>
          </p>
          <br />
          <p>
            <strong>By: </strong>
            {author}
          </p>
          <p>
            <strong>Date: </strong>
            {new Date(timestamp).toLocaleString()}
          </p>
          <div className="post-buttons">
            <button onClick={this.handleSubmit}>Submit</button>
            <button onClick={this.handleCancel}>Cancel</button>
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
