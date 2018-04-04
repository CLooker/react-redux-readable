const serverPostEdit = ({ id, title, body }) =>
  fetch(`http://localhost:3001/posts/${id}`, {
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
