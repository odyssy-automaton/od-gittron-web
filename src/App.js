import React, { Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Web3Provider, { Connectors } from 'web3-react';

import Routes from './Routes';
import Header from './components/shared/header/Header';

// import screens from './views/default-screens';

import './App.scss';
import GittronWeb3Provider from './contexts/Gittronweb3Context';
import GittronWeb3Service from './util/gittronWeb3';
import Web3Service from './util/web3Service';

const { MetaMaskConnector, NetworkOnlyConnector } = Connectors;
const MetaMask = new MetaMaskConnector({ supportedNetworks: [1, 4] });
const Infura = new NetworkOnlyConnector({
  providerURL: process.env.REACT_APP_MAIN_REMOTE_WEB3_PROVIDER,
});
const connectors = { MetaMask, Infura };

const gittronWeb3Service = new GittronWeb3Service();
const web3Service = new Web3Service();

const contract = gittronWeb3Service.initContracts();

function App() {
  return (
    <div className="App">
      <Helmet>
        <meta name="description" content="Gittron uses NFTs as a gamifies funding mechanism to support Open Source projects. Support Open Source, get NFTs!" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@gittron_" />
        <meta name="twitter:creator" content="@odyssyautomaton" />
        <meta property="og:url" content="https://gittron.me" />
        <meta property="og:title" content="Gittron" />
        <meta property="og:description" content="Gittron uses NFTs as a gamifies funding mechanism to support Open Source projects. Support Open Source, get NFTs!" />
        <meta property="og:image" content="https://s3.amazonaws.com/odyssy-assets/Gittron__og-image.jpg" />
      </Helmet>
      <Web3Provider connectors={connectors} libraryName="web3.js">
        <GittronWeb3Provider
          contract={contract}
          gittronWeb3Service={gittronWeb3Service}
          web3Service={web3Service}
        >
          <BrowserRouter>
            <Fragment>
              <Header />
              <Routes />
            </Fragment>
          </BrowserRouter>
        </GittronWeb3Provider>
      </Web3Provider>
    </div>
  );
}

export default App;
