import React, {Fragment} from 'react';
import './Page_Three.css'

import Navbar from '../../components/Navbar/Navbar'
// import Converter from '../../components/Converter/Converter'
import Api from '../../components/Api/Api'
import Photo from '../../components/Photospace/Photospace'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'

import CurrencyRow from '../../components/converter/converter'
import Converter from '../../components/converter/converter';
import Data from '../../Data';




const PageTwo = (props) => {

  return (
    <Fragment>
      <div className="header">
        <Navbar />
        <Data />
      </div>

      <Api />
      <Photo />
      <About />
      <Footer />
    </Fragment>
  );
}

export default PageTwo
