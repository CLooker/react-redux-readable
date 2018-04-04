const fetchComment = id =>
  fetch(`https://react-redux-readable-api.herokuapp.com/comments/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchComment;
