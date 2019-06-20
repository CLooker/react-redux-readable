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
      'https://docs.google.com/document/d/1W_Geb_gVSuYqUY-_EHUMIHeaOVHXk81sbG6FQcxBuD0/edit?usp=sharing',
    imgExtension: 'png'
  },
  Portfolio: {
    href: 'https://clooker.github.io/portfolio.html',
    imgExtension: 'jpg'
  }
};

const Footer = () => (
  <ul className='footer'>
    {Object.keys(footerItems).map(title => (
      <li key={title}>
        <a
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
      </li>
    ))}
  </ul>
);

export default Footer;
