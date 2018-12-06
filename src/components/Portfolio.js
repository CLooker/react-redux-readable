import React from 'react';

const Portfolio = () => (
  <a
    className="portfolio"
    title="Portfolio"
    href="https://clooker.github.io"
    target="_blank"
    rel="noopener noreferrer"
  >
    <img src={require('../assets/portfolio_logo.jpg')} alt="Portfolio" />
  </a>
);

export default Portfolio;
