import React from 'react';

const footerItems = {
  LinkedIn: {
    href: 'https://www.linkedin.com/in/chad-looker/',
    imgExtension: 'png'
  },
  GitHub: {
    href: 'https://github.com/CLooker/react-redux-readable',
    imgExtension: 'jpg'
  },
  Résumé: {
    href:
      'https://docs.google.com/document/d/14Ghmep9aoV91R755AFMAyPtIO5Hfh_5p4aTDJG6vpug/edit?usp=sharing',
    imgExtension: 'png'
  },
  Portfolio: {
    href: 'https://clooker.github.io/portfolio.html',
    imgExtension: 'jpg'
  }
};

const Footer = () => (
  <div className='footer'>
    {Object.keys(footerItems).map(title => (
      <a
        key={title}
        className={title.toLowerCase()}
        title={title}
        href={footerItems[title].href}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          alt={title}
          src={require(`../assets/${title.toLowerCase()}_logo.${
            footerItems[title].imgExtension
          }`)}
        />
      </a>
    ))}
  </div>
);

export default Footer;
