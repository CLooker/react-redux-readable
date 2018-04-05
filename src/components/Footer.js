import React from 'react';
import GitHub from './GitHub';
import LinkedIn from './LinkedIn';
import Resume from './Resume';
import Portfolio from './Portfolio';

const Footer = () => (
  <div>
    <hr />
    <div className="footer">
      <LinkedIn />
      <GitHub />
      <Resume />
      <Portfolio />
    </div>
  </div>
);

export default Footer;
