import returnUniqueValue from './returnUniqueValue.js';

const serverCreateComment = ({ body, author, parentId }) =>
  fetch(`https://react-redux-readable-api.herokuapp.com/comments`, {
    method: 'POST',
    headers: {
      Authorization: 'react-redux-app',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      id: returnUniqueValue(),
      timestamp: Date.now(),
      body,
      author,
      parentId
    })
  });

export default serverCreateComment;
