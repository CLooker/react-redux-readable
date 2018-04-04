import React from 'react';

const SortPosts = ({ sortByTimeStamp, sortByVoteScore, order }) => (
  <div className="sort-posts">
    <button
      onClick={sortByTimeStamp}
      style={{ opacity: order === 'sortByTimeStamp' ? 1 : 0.5 }}
    >
      Newest
    </button>
    <button
      onClick={sortByVoteScore}
      style={{ opacity: order === 'sortByVoteScore' ? 1 : 0.5 }}
    >
      Best
    </button>
  </div>
);

export default SortPosts;
