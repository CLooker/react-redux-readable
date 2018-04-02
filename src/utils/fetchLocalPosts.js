const fetchLocalPosts = category =>
  fetch(`http://localhost:3001/${category}/posts`, {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchLocalPosts;
