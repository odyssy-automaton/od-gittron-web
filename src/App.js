import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Web3Provider from 'web3-react';
import { AuthProvider } from './contexts/AuthContext';

import Routes from './Routes';
import Header from './components/shared/header/Header';

import screens from './views/default-screens';

import './App.scss';

class App extends Component {
  networks = [1, 4];
  authValue = {
    web3: true,
  };

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="gittron" />
        </Helmet>
        <Web3Provider screens={screens} supportedNetworks={this.networks}>
          <BrowserRouter>
            <Fragment>
              <AuthProvider value={this.authValue}>
                <Header />
                <Routes />
              </AuthProvider>
            </Fragment>
          </BrowserRouter>
        </Web3Provider>
      </div>
    );
  }
}

export default App;
