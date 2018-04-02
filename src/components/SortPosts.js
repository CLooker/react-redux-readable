import React from 'react';

const SortPosts = props => (
  <div className="sort-posts">
    <button
      onClick={props.sortByTimeStamp}
      style={{ opacity: props.order === 'sortByTimeStamp' ? 1 : 0.5 }}
    >
      Newest
    </button>
    <button
      onClick={props.sortByVoteScore}
      style={{ opacity: props.order === 'sortByVoteScore' ? 1 : 0.5 }}
    >
      Best
    </button>
  </div>
);

export default SortPosts;
