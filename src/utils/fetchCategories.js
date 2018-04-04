const fetchCategories = () =>
  fetch('https://react-redux-readable-api.herokuapp.com/categories/', {
    method: 'GET',
    headers: {
      Authorization: 'react-redux-app'
    }
  })
    .then(res => res.json())
    .catch(err => console.log(err));

export default fetchCategories;
