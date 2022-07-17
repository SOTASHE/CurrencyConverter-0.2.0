import React from 'react';
import './Api.css'
import FxRates from '../../components/fxrates.component'

const Api = () => {
  
  return (
    <div className="api_resource">
      {/* <FxRates /> */}
      <div className="container">
        <h1>API Resources</h1>
        <div className="api">
          <div className="api_desc">
            <h2> Free exchange API</h2>
            <p>
              Exchange rates API is a simple and lightweight free service for
              current and historical foreign exchange rates & crypto exchange
              rates.Reliable and up-to-date EU VAT rates, sourced directly from
              the European Commission's databases
            </p>
            <button>
              <a href="https://exchangerate.host/#/" target="_blank">
                View API
              </a>{" "}
            </button>
          </div>
          <div className="api_desc">
            <h2>API DOCUMENTATION</h2>
            <p>
              The API comes with multiple endpoints, each serving a different
              use case. Endpoint functionalities include getting the latest
              exchange rate data for all or a specific set of currencies,
              converting amounts from one currency to another...{" "}
            </p>
            <button>
              <a href="https://exchangerate.host/#/#docs" target="_blank">
                View API
              </a>{" "}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Api