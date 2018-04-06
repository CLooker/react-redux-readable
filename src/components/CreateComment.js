import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateCommentPost from './CreateCommentPost';
import CreateCommentForm from './CreateCommentForm';
import Loading from './Loading';
import { addComment } from '../actions';
import fetchLocalPost from '../utils/fetchLocalPost.js';
import serverCreateComment from '../utils/serverCreateComment.js';
import updateHerokuLoaded from '../utils/updateHerokuLoaded.js';

class CreateComment extends Component {
  state = {
    parentTitle: '',
    parentBody: '',
    parentAuthor: '',
    parentVoteScore: '',
    parentTimestamp: '',
    parentCommentCount: '',
    body: '',
    author: ''
  };

  componentDidMount() {
    fetchLocalPost(this.props.match.params.id)
      .then(({ title, body, author, voteScore, timestamp, commentCount }) =>
        this.setState({
          parentTitle: title,
          parentBody: body,
          parentAuthor: author,
          parentVoteScore: voteScore,
          parentTimestamp: timestamp,
          parentCommentCount: commentCount
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

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleSubmit = type =>
    type === 'submit'
      ? this.inputValidated() &&
        serverCreateComment({
          body: this.state.body.trim(),
          author: this.state.author.trim(),
          parentId: this.props.match.params.id
        }).then(() =>
          this.navigateToPost(
            this.props.match.params.category,
            this.props.match.params.id
          )
        )
      : this.navigateToPost(
          this.props.match.params.category,
          this.props.match.params.id
        );

  inputValidated = () => this.bodyValidated() && this.authorValidated();

  bodyValidated = () =>
    this.state.body.trim() !== '' ? true : alert('Body cannot be blank.');

  authorValidated = () =>
    this.state.author.trim() !== ''
      ? true
      : alert('Author cannot be blank.') || false;

  navigateToPost = (category, id) =>
    this.props.history.push(`/react-redux-readable/${category}/${id}`);

  render() {
    const {
      parentTitle,
      parentBody,
      parentAuthor,
      parentVoteScore,
      parentTimestamp,
      parentCommentCount,
      body,
      author
    } = this.state;
    return this.props.herokuLoaded ? (
      <div className="create-comment">
        <div className="create-comment-title">Create Comment</div>
        <CreateCommentPost
          id={this.props.match.params.id}
          category={this.props.match.params.category}
          title={parentTitle}
          body={parentBody}
          author={parentAuthor}
          voteScore={parentVoteScore}
          timestamp={parentTimestamp}
          commentCount={parentCommentCount}
        />
        <CreateCommentForm
          body={body}
          author={author}
          handleSubmit={this.handleSubmit}
          handleBodyChange={this.handleBodyChange}
          handleAuthorChange={this.handleAuthorChange}
        />
      </div>
    ) : (
      <Loading />
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(addComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(CreateComment);
