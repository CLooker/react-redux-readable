import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PostDetailsEditPost extends Component {
  state = {
    title: '',
    body: '',
    category: '',
    author: ''
  };

  componentDidMount() {
    this.setState({
      title: this.props.title,
      body: this.props.body,
      category: this.props.category,
      author: this.props.author
    });
  }

  handleTitleChange = e => this.setState({ title: e.target.value });

  handleBodyChange = e => this.setState({ body: e.target.value });

  handleCategoryChange = e => this.setState({ category: e.target.value });

  handleAuthorChange = e => this.setState({ author: e.target.value });

  handleSubmit = post => this.props.editPost(post);

  handleCancel = id => this.props.history.push(this.props.location);

  render() {
    const { title, body, category, author } = this.state;
    return (
      <div
        className="post details"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <label>
          <strong>Title:</strong>
          <input type="text" value={title} onChange={this.handleTitleChange} />
        </label>
        <label>
          <strong>Body:</strong>
          <input type="text" value={body} onChange={this.handleBodyChange} />
        </label>
        <br />
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <strong>Category:</strong>
          <select value={category} onChange={this.handleCategoryChange}>
            <option disabled>Select Post Category...</option>
            <option value="react">React</option>
            <option value="redux">Redux</option>
            <option value="udacity">Udacity</option>
          </select>
        </div>
        <br />
        <label>
          <strong>By:</strong>
          <input
            type="text"
            value={author}
            onChange={this.handleAuthorChange}
          />
        </label>
        <div className="post-buttons">
          <button onClick={this.handleSubmit}>Submit</button>
          <button onClick={this.handleCancel}>Cancel</button>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    editPost: post => actions.editPost(post)
  };
}

export default connect(null, mapDispatchToProps)(PostDetailsEditPost);
