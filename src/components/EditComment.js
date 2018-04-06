import React, { Component } from 'react';
import { connect } from 'react-redux';
import fetchComment from '../utils/fetchComment.js';
import fetchLocalPost from '../utils/fetchLocalPost.js';
import serverEditComment from '../utils/serverEditComment.js';
import updateHerokuLoaded from '../utils/updateHerokuLoaded.js';
import EditCommentPost from './EditCommentPost';
import EditCommentForm from './EditCommentForm';
import Loading from './Loading';
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
    fetchComment(this.props.match.params.commentId)
      .then(res =>
        this.setState({
          body: res.body,
          deleted: res.deleted
        })
      )
      .then(() =>
        fetchLocalPost(this.props.match.params.id).then(res =>
          this.setState({
            parentTitle: res.title,
            parentBody: res.body,
            parentCategory: res.category
          })
        )
      )
      .then(() =>
        updateHerokuLoaded(
          this.props.herokuLoaded,
          this.props.updateHerokuLoaded
        )
      )
      .catch(err => console.log(err));
  }

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleSubmit = e => {
    e.preventDefault();

    if (this.inputValidated()) {
      serverEditComment({
        id: this.props.match.params.commentId,
        body: this.state.body
      })
        .then(res => this.props.editComment(res))
        .then(() =>
          this.navigateToParentPost(
            this.state.parentCategory,
            this.props.match.params.id
          )
        );
    }
  };

  inputValidated = () =>
    this.state.body.trim() !== ''
      ? true
      : alert('Body cannot be blank.') || false;

  navigateToParentPost = (category, id) =>
    this.props.history.push(`/react-redux-readable/${category}/${id}`);

  handleCancel = e => {
    e.preventDefault();
    this.navigateToParentPost(
      this.state.parentCategory,
      this.props.match.params.id
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
    return this.props.herokuLoaded ? (
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
    ) : (
      <Loading />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editComment: comment => dispatch(editComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(EditComment);
