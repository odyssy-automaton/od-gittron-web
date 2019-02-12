import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import Web3Provider from 'web3-react';

import Routes from '../../Routes';
import Header from '../../components/shared/header/Header';

// import screens from '../default-screens';

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
            <Routes />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default NoWeb3;
