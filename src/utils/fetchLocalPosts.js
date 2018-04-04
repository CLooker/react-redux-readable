const fetchLocalPosts = category =>
  fetch(`https://react-redux-readable-api.herokuapp.com/${category}/posts`, {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchLocalPosts;
