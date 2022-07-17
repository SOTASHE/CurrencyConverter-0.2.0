import React from 'react';
import './Middle.css'
import {Link} from 'react-router-dom'

const Middle = () => {
  return (
    <div className="mainText">
      <div className="container">
        <h1>Currency Exchange</h1>
        <p> 
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.  
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.

        
        </p>
        <Link to='/'>
          <button>Check Currencies</button>
        </Link>
      </div>
    </div>
  )
}

export default Middle