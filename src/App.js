import React, { Component, Fragment } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Routes from './Routes';

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
            <h1>gittron</h1>
            <Link to="/">Home</Link> | <Link to="/repos">Search Repos</Link>
            <Routes />
          </Fragment>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
