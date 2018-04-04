const serverUpvotePost = id =>
  fetch(`https://react-redux-readable-api.herokuapp.com/posts/${id}`, {
    method: 'POST',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      option: 'upVote'
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverUpvotePost;
