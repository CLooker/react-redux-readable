const serverCommentDelete = id =>
  fetch(`https://react-redux-readable-api.herokuapp.com/comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverCommentDelete;
