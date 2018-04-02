import React, { Component } from 'react';
import { connect } from 'react-redux';
import Comment from './Comment';

class Comments extends Component {
  state = {
    parentId: null,
    commentsToRender: []
  };

  filterDeletedComments = comments =>
    comments.filter(({ deleted }) => deleted === false);

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

  render() {
    const { parentId } = this.props;
    const { commentsToRender } = this.state;
    console.log('comments state: ', this.state);
    console.log('comments props: ', this.props);
    return (
      <div>
        {commentsToRender.length > 0 && (
          <div>
            <div className="comments-title">Comments</div>
            <div className="comments-list-container">
              <ul className="comments-list">
                {commentsToRender.map(comment => (
                  <Comment
                    key={comment.id}
                    comment={comment}
                    parentId={parentId}
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
