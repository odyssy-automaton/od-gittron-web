import React, { Component, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Routes from './Routes';
import Header from './components/shared/header/Header';

import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Helmet>
          <meta name="description" content="REPO EVO" />
        </Helmet>
        <BrowserRouter>
          <Fragment>
            <Header />
            <Routes />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
