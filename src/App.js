import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Web3Provider, { Connectors } from 'web3-react';

import Routes from './Routes';
import Header from './components/shared/header/Header';

// import screens from './views/default-screens';

import './App.scss';

const { MetaMaskConnector, NetworkOnlyConnector } = Connectors;
const MetaMask = new MetaMaskConnector({ supportedNetworks: [1, 4] });
const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_MAIN_REMOTE_WEB3_PROVIDER,
});
const connectors = { MetaMask, Infura };

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="description" content="gittron" />
      </Helmet>
      <Web3Provider connectors={connectors} libraryName="web3.js">
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

export default App;
