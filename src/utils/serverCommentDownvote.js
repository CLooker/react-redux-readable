const serverCommentDownvote = id =>
  fetch(`http://localhost:3001/comments/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'downVote'
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverCommentDownvote;
