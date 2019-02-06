import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Logo">
          <h1 className="Header__title">
            <Link to="/">Gittron</Link>
          </h1>
        </div>
        <div className="Navigation--Desktop">
          <Link to="/repos">Bots</Link>
          <Link to="/">About</Link>
          <Link to="/">Dashboard</Link>
        </div>
      </div>
    );
  }
}

export default Header;
