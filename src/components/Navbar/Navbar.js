import React from 'react';
import './Navbar.css';

import {
  Link
} from 'react-router-dom'

const Navbar = () => {

  return (
    <nav>
      <div className="menu-icon">
        <i className="fa fa-bars fa-2x"></i>
      </div>
      <div className="logo">
        <Link to="/">
          <i className="fas fa-dollar-sign fa-lg"></i>
          <span>Currency Exchange / Converter</span>
        </Link>
      </div>
      <div className="menu">
        <ul>
          <li>
            <a href="/">Convert</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          {/* <li><a href='/currencies'>Currencies</a></li> */}
        </ul>
      </div>
    </nav>
  );
}


export default Navbar