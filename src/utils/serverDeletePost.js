const serverDeletePost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverDeletePost;
