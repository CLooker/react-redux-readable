const serverCommentDelete = id =>
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverCommentDelete;
