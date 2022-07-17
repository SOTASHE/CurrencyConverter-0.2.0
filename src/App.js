import React, {useState, useEffect} from 'react';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import PageOne from './containers/Page_One/Page_One'
import PageThree from './containers/Page_Three/Page_Three'

import FxRates from './components/fxrates.component'


const App = () => {

  return (
    <Router>
      <Switch>
        <Route exact path="/">
         
          <PageThree />
        </Route>
        <Route path="/about">
          <PageOne />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;


