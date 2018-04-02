const returnSortedVoteScores = posts =>
  posts.map(({ voteScore }) => voteScore).sort((a, b) => b - a);

export default returnSortedVoteScores;
