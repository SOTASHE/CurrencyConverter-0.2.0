import React, {Fragment} from 'react';
import './Page_Three.css'

import Navbar from '../../components/Navbar/Navbar'
import Converter from '../../components/Converter/Converter'
import Api from '../../components/Api/Api'
import Photo from '../../components/Photospace/Photospace'
import About from '../../components/About/About'
import Footer from '../../components/Footer/Footer'

import CurrencyRow from '../../components/Converter/Converter'




const PageTwo = (props) => {

  return (
    <Fragment>
      <div className="header">
        <Navbar />
        <CurrencyRow
        />
      </div>
      <Api />
      <Photo />
      <About />
      <Footer />
    </Fragment>
  );
}

export default PageTwo
