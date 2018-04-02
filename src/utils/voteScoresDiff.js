import sortByTimeStamp from './sortByTimeStamp.js';
import sortByVoteScore from './sortByVoteScore.js';

const voteScoresDiff = (nextProps, prevState, type, order) => {
  if (type === 'singlePost') {
    if (prevState.id) {
      if (nextProps.postsById[prevState.id].voteScore !== prevState.voteScore) {
        return {
          ...prevState,
          voteScore: nextProps.postsById[prevState.id].voteScore
        };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    let flag = false;

    const newPostsToRender = nextProps.posts.map(nextPropsPost => {
      const targetId = nextPropsPost.id;
      const targetVoteScore = nextPropsPost.voteScore;

      const oldPost = prevState.postsToRender.find(
        post => post.id === targetId
      );

      if (oldPost) {
        if (oldPost.voteScore !== targetVoteScore) {
          flag = true;
          return {
            ...oldPost,
            voteScore: targetVoteScore
          };
        } else {
          return oldPost;
        }
      } else {
        return nextPropsPost;
      }
    });

    if (flag === true) {
      if (order === 'sortByVoteScore') {
        return {
          postsToRender: sortByVoteScore(newPostsToRender)
        };
      } else if (order === 'sortByTimeStamp') {
        return {
          postsToRender: sortByTimeStamp(newPostsToRender)
        };
      } else {
        return {
          postsToRender: newPostsToRender
        };
      }
    } else {
      return null;
    }
  }
};

export default voteScoresDiff;
