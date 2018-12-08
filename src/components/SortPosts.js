import React from 'react';

const SortPosts = ({ sortByTimeStamp, sortByVoteScore, order }) => (
  <div className='sort-posts'>
    <button
      onClick={sortByTimeStamp}
      style={{ opacity: order === 'sortByTimeStamp' ? 1 : 0.5 }}
      title='Sort by Newest'
    >
      Newest
    </button>
    <button
      onClick={sortByVoteScore}
      style={{ opacity: order === 'sortByVoteScore' ? 1 : 0.5 }}
      title='Sort by Vote'
    >
      Best
    </button>
  </div>
);

export default SortPosts;
