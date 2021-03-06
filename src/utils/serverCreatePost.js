import returnUniqueValue from './returnUniqueValue.js';

const serverCreatePost = ({ title, body, author, category }) =>
  fetch('https://react-redux-readable-api.herokuapp.com/posts/', {
    method: 'POST',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: returnUniqueValue(),
      timestamp: Date.now(),
      title,
      body,
      author,
      category
    })
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverCreatePost;
