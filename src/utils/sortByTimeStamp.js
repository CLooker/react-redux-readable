const sortByTimeStamp = posts =>
  posts
    .map(({ timestamp }) => timestamp)
    .sort((a, b) => b - a)
    .map(t => posts.find(({ timestamp }) => timestamp === t));

export default sortByTimeStamp;
