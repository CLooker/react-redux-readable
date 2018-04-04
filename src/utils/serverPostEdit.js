const serverPostEdit = ({ id, title, body }) =>
  fetch(`https://react-redux-readable-api.herokuapp.com/posts/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ title, body })
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default serverPostEdit;
