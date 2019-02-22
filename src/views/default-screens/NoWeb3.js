import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import { AuthProvider } from '../../contexts/AuthContext';

import Routes from '../../Routes';
import Header from '../../components/shared/header/Header';

class NoWeb3 extends Component {
  authValue = {
    web3enabled: false,
  };

  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="REPO EVO" />
        </Helmet>
        <BrowserRouter>
          <Fragment>
            <AuthProvider value={this.authValue}>
              <Header />
              <p>
                *You need a web3 enabled browser to participate. Get the Chrome{' '}
                <a
                  href="https://metamask.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  MetaMask
                </a>{' '}
                addon or use Brave.
              </p>
              <Routes />
            </AuthProvider>
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default NoWeb3;
