import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import fetchCategories from '../utils/fetchCategories.js';

class Nav extends Component {
  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories() {
    fetchCategories()
      .then(res => this.syncCategories(res))
      .catch(err => console.log(err));
  }

  syncCategories(res) {
    this.props.syncCategories(res);
  }

  getTitle([...cat]) {
    const capitalizedFirstLetter = cat[0].toUpperCase();
    return [capitalizedFirstLetter, ...cat.slice(1)].join('');
  }

  render() {
    return (
      <ul className='nav'>
        {[
          <li key='home'>
            <NavLink exact activeClassName='active' to='/react-redux-readable/'>
              <img
                src={require('../assets/home_logo.jpg')}
                alt='home'
                title='Home'
              />
            </NavLink>
          </li>
        ].concat(
          this.props.categories.map(cat => (
            <li key={cat}>
              <NavLink
                activeClassName='active'
                to={`/react-redux-readable/${cat}`}
              >
                <img
                  src={require(`../assets/${cat}_logo.png`)}
                  alt={`${cat} posts`}
                  title={this.getTitle(cat)}
                />
              </NavLink>
            </li>
          ))
        )}
        <li key='add-post'>
          <NavLink
            exact
            activeClassName='active'
            to={'/react-redux-readable/create-post'}
          >
            <img
              src={require('../assets/new_logo.png')}
              alt='create post'
              title='Create Post'
            />
          </NavLink>
        </li>
      </ul>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.posts.categories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    syncCategories: categories =>
      dispatch({ type: 'SYNC_CATEGORIES', categories: categories })
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav);
