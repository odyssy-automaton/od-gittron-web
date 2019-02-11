import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Web3Provider from 'web3-react';
import Web3 from 'web3';

import Routes from './Routes';
import Header from './components/shared/header/Header';

import './App.scss';

class App extends Component {
  networks = [4];
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="REPO EVO" />
        </Helmet>
        <Web3Provider supportedNetworks={this.networks}>
          <BrowserRouter>
            <Fragment>
              <Header />
              <Routes />
            </Fragment>
          </BrowserRouter>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
