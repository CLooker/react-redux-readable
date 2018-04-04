import React, { Component } from 'react';
import { connect } from 'react-redux';
import EditCommentPost from './EditCommentPost';
import EditCommentForm from './EditCommentForm';
import { editComment } from '../actions';

class EditComment extends Component {
  state = {
    parentTitle: '',
    parentCategory: '',
    parentBody: '',
    body: '',
    deleted: ''
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
              parentBody: res.body,
              parentCategory: res.category
            })
          );
      });
  }

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
      this.props.history.push(
        `/${this.state.parentCategory}/${this.props.match.params.id}`
      )
    );
  };

  handleCancel = e => {
    e.preventDefault();
    this.props.history.push(
      `/${this.state.parentCategory}/${this.props.match.params.id}`
    );
  };

  render() {
    const {
      parentTitle,
      parentCategory,
      parentBody,
      body,
      deleted
    } = this.state;
    return (
      !deleted && (
        <div className="edit-comment-container">
          <div className="edit-comment-title">Edit Comment</div>
          <div className="edit-comment-form-container">
            <div className="edit-comment">
              <EditCommentPost
                category={parentCategory}
                id={this.props.match.params.id}
                title={parentTitle}
                body={parentBody}
              />
              <EditCommentForm
                body={body}
                handleBodyChange={this.handleBodyChange}
                handleSubmit={this.handleSubmit}
                handleCancel={this.handleCancel}
              />
            </div>
          </div>
        </div>
      )
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: comment => dispatch(editComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(EditComment);
