import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import './Header.scss';
import './Navbar.scss';
import './Hamburger.scss';

const HamburgerNav = class extends React.Component {
  state = {
    navOpen: false,
  };

  toggleNav = () => {
    this.setState({
      navOpen: !this.state.navOpen,
    });
  };

  render() {
    const { context } = this.props;
    const mobileNavClass = this.state.navOpen
      ? 'Navbar__Mobile Navbar__Mobile--Open'
      : 'Navbar__Mobile';
    const hamburgerClass = this.state.navOpen
      ? 'navbar__hamburger hamburger hamburger--spin is-active'
      : 'navbar__hamburger hamburger hamburger--spin';

    return (
      <Fragment>
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

            <Link
              onClick={this.toggleNav}
              className="Navbar__Mobile--Contents--Item"
              to="/about"
            >
              About
            </Link>
            {context.active ? (
              <Link
                onClick={this.toggleNav}
                className="Navbar__Mobile--Contents--Item"
                to="/dashboard"
              >
                Dashboard
              </Link>
            ) : (
              context.connectorName !== 'MetaMask' && (
                <button className="Navbar__Mobile--Contents--Item" onClick={() => context.setConnector('MetaMask')}>
                  Connect
                </button>
              )
            )}
            {context.error && (
            <div className="noWeb3">
              <div className="noWeb3__Contents">
                <button>X</button>
                  <p>
                    {context.error.toString()}
                  </p>
                  <p>Consider using <a href="https://brave.com/download/" rel="noopener noreferrer" target="_blank">Brave</a> or <a href="https://www.google.com/chrome/" rel="noopener noreferrer" target="_blank">Chrome</a> with the <a href="https://metamask.io/" rel="noopener noreferrer" target="_blank">Metamask</a> extension.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </Fragment>
    );
  }
};

export default HamburgerNav;
