import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class Comments extends Component {
  state = {
    parentId: null,
    commentsToRender: []
  };

  componentDidMount() {
    this.setState({
      commentsToRender: this.filterDeletedComments(this.props.comments),
      parentId: this.props.parentId
    });
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      commentsToRender: nextProps.comments.filter(
        c => c.parentId === prevState.parentId && c.deleted === false
      )
    };
  }

  filterDeletedComments = comments =>
    comments.filter(({ deleted }) => deleted === false);

  render() {
    const { commentsToRender } = this.state;
    const { category } = this.props;
    return (
      <div className="comments-container">
        {commentsToRender.length > 0 && (
          <div className="comments">
            <div className="comments-title">Comments</div>
            <div className="comments-list-container">
              <ul className="comments-list">
                {commentsToRender.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    category={category}
                  />
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: Object.keys(state.comments.commentsById).map(
      key => state.comments.commentsById[key]
    )
  };
}

export default connect(mapStateToProps)(Comments);
