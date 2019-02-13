import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

class HeaderLinks extends Component {
  render() {
    const { authenticated } = this.props;
    return (
      <div className="Header">
        <div className="Logo">
          <h1 className="Header__title">
            <Link to="/">Gittron</Link>
          </h1>
        </div>
        <div className="Navigation--Desktop">
          <Link to="/">Bots</Link>
          <Link to="/repos">Repos</Link>
          <Link to="/about">About</Link>

          {authenticated ? <Link to="/dashboard">Dashboard</Link> : null}
        </div>
      </div>
    );
  }
}

export default HeaderLinks;
