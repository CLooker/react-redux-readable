import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';
import returnUniqueValue from '../utils/returnUniqueValue.js';

class AddComment extends Component {
  state = {
    body: '',
    author: ''
  };

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    fetch(`http://localhost:3001/comments`, {
      method: 'POST',
      headers: {
        Authorization: 'react-redux-app',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        id: returnUniqueValue(),
        timestamp: Date.now(),
        body: this.state.body,
        author: this.state.author,
        parentId: this.props.match.params.id
      })
    }).then(() =>
      this.props.history.push(`/posts/${this.props.match.params.id}`)
    );
  };

  render() {
    return (
      <div className="create">
        <Link
          to={`/posts/${this.props.match.params.id}`}
          style={{
            textDecoration: 'underline',
            textDecorationColor: 'blue',
            color: 'blue'
          }}
        >
          Back To Post
        </Link>
        <br />
        <form
          onSubmit={this.handleSubmit}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <label>
            <p style={{ textAlign: 'center' }}>
              <strong>Body</strong>
            </p>
            <textarea
              value={this.state.body}
              onChange={this.handleBodyChange}
              columns="50"
              rows="10"
            />
          </label>
          <label>
            <p style={{ textAlign: 'center' }}>
              <strong>Author</strong>
            </p>
            <input
              type="text"
              value={this.state.author}
              onChange={this.handleAuthorChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(actions.addComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(AddComment);
