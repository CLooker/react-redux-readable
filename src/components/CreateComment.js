import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateCommentPost from './CreateCommentPost';
import CreateCommentForm from './CreateCommentForm';
import { addComment } from '../actions';
import returnUniqueValue from '../utils/returnUniqueValue.js';

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
          parentAuthor: res.author,
          parentVoteScore: res.voteScore,
          parentTimestamp: res.timestamp,
          parentCommentCount: res.commentCount
        })
      )
      .catch(err => console.log(err));
  }

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
      this.props.history.push(
        `/${this.props.match.params.category}/${this.props.match.params.id}`
      )
    );
  };

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
    return (
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
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addComment: comment => dispatch(addComment(comment))
  };
}

export default connect(null, mapDispatchToProps)(CreateComment);
