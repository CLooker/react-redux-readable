const fetchCategories = () =>
  fetch('http://localhost:3001/categories/', {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchCategories;
