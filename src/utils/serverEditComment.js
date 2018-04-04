const serverEditComment = ({ id, body }) =>
  fetch(`https://react-redux-readable-api.herokuapp.com/comments/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      timestamp: Date.now(),
      body
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverEditComment;
