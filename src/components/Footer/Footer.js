import React from 'react';
import './Footer.css'
import {Link} from 'react-router-dom'


const Footer = () => {
  return (
    <div className="footer">
      <div className="my_website">
        <Link to="/">
          <p>https://snayes.netlify.app/</p>
        </Link>
      </div>
      <div className="social_media">
        <a href="https://github.com/SOTASHE" target="_blank">
          <img src="./img/github.png" alt="" />
        </a>
        <a
          href="https://www.linkedin.com/in/snaye-sotashe-581964183/"
          target="_blank"
        >
          <img src="./img/linkedin.png" alt="" />
        </a>
        <a href="https://twitter.com/Cnae6" target="_blank">
          <img src="./img/twitter.png" alt="" />
        </a>
      </div>
    </div>
  );
}

export default Footer