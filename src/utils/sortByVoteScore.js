import returnSortedVoteScores from './returnSortedVoteScores.js';

const sortByVoteScore = posts => {
  let mutablePosts = [...posts];

  return returnSortedVoteScores(posts).reduce((newPostsToRender, score) => {
    for (let j = 0; j < mutablePosts.length; j++) {
      const { voteScore } = mutablePosts[j];
      if (voteScore === score) {
        newPostsToRender = [...newPostsToRender, mutablePosts.splice(j, 1)[0]];
        break;
      }
    }
    return newPostsToRender;
  }, []);
};

export default sortByVoteScore;
