import React from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import './Navbar.scss';
import './Hamburger.scss';

const HeaderLinks = class extends React.Component {
  state = {
    navOpen: false,
  };

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  render() {
    const { authenticated, networkId } = this.props;
    const mobileNavClass = this.state.navOpen
      ? 'Navbar__Mobile Navbar__Mobile--Open'
      : 'Navbar__Mobile';

    const hamburgerClass = this.state.navOpen
      ? 'navbar__hamburger hamburger hamburger--spin is-active'
      : 'navbar__hamburger hamburger hamburger--spin';
    return (
      <div className="Header">
        <div className="Logo">
          <h1 className="Header__title">
            <Link to="/">Gittron</Link>
          </h1>
        </div>
        <div className="Navbar__Desktop">
          {networkId === 4 ? <p>Rinkeby</p> : <p>Main</p>}
          <Link to="/" className="Navbar__Desktop--Item">
            Bots
          </Link>
          {/* {authenticated ? <Link to="/repos" className="Navbar__Desktop--Item">Repos</Link> : null} */}
          <Link to="/about" className="Navbar__Desktop--Item">
            About
          </Link>
          {authenticated ? (
            <Link to="/dashboard" className="Navbar__Desktop--Item">
              Dashboard
            </Link>
          ) : null}
        </div>
        {/* Start Hamburger */}
        <button
          className={hamburgerClass}
          type="button"
          onClick={this.toggleNav}
        >
          <span className="hamburger-box">
            <span className="hamburger-inner" />
          </span>
        </button>
        <div className={mobileNavClass}>
          <div className="Navbar__Mobile--Contents">
            <Link
              onClick={this.toggleNav}
              className="Navbar__Mobile--Contents--Item"
              to="/"
            >
              Bots
            </Link>
            {authenticated ? (
              <Link
                onClick={this.toggleNav}
                className="Navbar__Mobile--Contents--Item"
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : null}
            {authenticated ? (
              <Link
                onClick={this.toggleNav}
                className="Navbar__Mobile--Contents--Item"
                to="/repos"
              >
                Repos
              </Link>
            ) : null}
            <Link
              onClick={this.toggleNav}
              className="Navbar__Mobile--Contents--Item"
              to="/about"
            >
              About
            </Link>
          </div>
        </div>
        {/* End Hamburger */}
      </div>
    );
  }
};

export default HeaderLinks;
