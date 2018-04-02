import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../actions';

class EditComment extends Component {
  state = {
    parentTitle: '',
    parentCategory: '',
    body: '',
    deleted: ''
  };

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleSubmit = e => {
    e.preventDefault();
    fetch(
      `http://localhost:3001/comments/${this.props.match.params.commentId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: 'react-redux-app',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          timestamp: Date.now(),
          body: this.state.body
        })
      }
    ).then(() =>
      this.props.history.push(`/posts/${this.props.match.params.id}`)
    );
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push(`/posts/${this.props.match.params.id}`);
  };

  componentDidMount() {
    fetch(
      `http://localhost:3001/comments/${this.props.match.params.commentId}`,
      {
        method: 'GET',
        headers: {
          Authorization: 'react-redux-app'
        }
      }
    )
      .then(res => res.json())
      .then(res =>
        this.setState({
          body: res.body,
          deleted: res.deleted
        })
      )
      .then(() => {
        fetch(`http://localhost:3001/posts/${this.props.match.params.id}`, {
          method: 'GET',
          headers: {
            Authorization: 'react-redux-app'
          }
        })
          .then(res => res.json())
          .then(res =>
            this.setState({
              parentTitle: res.title,
              parentCategory: res.category
            })
          );
      });
  }

  render() {
    const { parentTitle, parentCategory, body, deleted } = this.state;
    return (
      !deleted && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            border: '1px solid darkgrey'
          }}
        >
          <h4>Edit Comment</h4>
          <p>Post Title:</p>
          <Link
            to={`/posts/${this.props.match.params.id}`}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'blue',
              color: 'blue'
            }}
          >
            {parentTitle}
          </Link>
          <p>Post Category: </p>
          <Link
            to={`/${parentCategory}/posts`}
            style={{
              textDecoration: 'underline',
              textDecorationColor: 'blue',
              color: 'blue'
            }}
          >
            {parentCategory}
          </Link>
          <form style={{ display: 'flex', flexDirection: 'column' }}>
            <label>
              Body:
              <input
                type="text"
                value={body}
                onChange={this.handleBodyChange}
              />
            </label>
            <br />
            <div
              className="post-buttons"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <button onClick={this.handleSubmit}>Submit</button>
              <button onClick={this.handleCancel}>Cancel</button>
            </div>
          </form>
        </div>
      )
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: comment => dispatch(actions.editComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(EditComment);
