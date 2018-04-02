const fetchAllPosts = () =>
  fetch('http://localhost:3001/posts/', {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchAllPosts;
