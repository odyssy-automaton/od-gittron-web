import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Routes from '../../Routes';
import Header from '../../components/shared/header/Header';

class NoWeb3 extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="REPO EVO" />
        </Helmet>
        <BrowserRouter>
          <Fragment>
            <Header authenticated={false} />
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
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default NoWeb3;
