const fetchComments = post =>
  fetch(
    `https://react-redux-readable-api.herokuapp.com/posts/${post}/comments`,
    {
      method: 'GET',
      headers: {
        Authorization: 'react-redux-app'
      }
    }
  )
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchComments;
