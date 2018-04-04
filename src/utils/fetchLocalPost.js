const fetchLocalPost = id =>
  fetch(`http://localhost:3001/posts/${id}`, {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchLocalPost;
