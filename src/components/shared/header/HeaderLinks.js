import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import GittronAvatar from '../../../img/Gittron__Avatar.png';

import './Header.scss';
import './Navbar.scss';
import './Hamburger.scss';
import HamburgerNav from './HamburgerNav';

const HeaderLinks = class extends Component {
  state = {
    errorOpen: true,
  };

  closeError = () => {
    this.setState({
      errorOpen: false,
    });
  };

  isErrorOpen = () => {
    return this.props.context.error && this.state.errorOpen;
  };

  render() {
    const { context } = this.props;
    const errorOpen = this.isErrorOpen();

    return (
      <div className="Header">
        <div className="Logo">
          <Link to="/">
            <img src={GittronAvatar} alt="Gittron Avatar"/>
            <h1 className="Header__title">Gittron</h1>
          </Link>
        </div>

        <div className="Navbar__Desktop">
          <Link to="/all" className="Navbar__Desktop--Item">
            Bots
          </Link>
          <Link to="/" className="Navbar__Desktop--Item">
            Featured
          </Link>
          <Link to="/about" className="Navbar__Desktop--Item">
            About
          </Link>
          {context.active ? (
            <Link to="/dashboard" className="Navbar__Desktop--Item">
              Dashboard
            </Link>
          ) : null}
          {!context.active ? (
            context.connectorName !== 'MetaMask' && (
              <button
                className="Nonet"
                onClick={() => context.setConnector('MetaMask')}
              >
                Connect
              </button>
            )
          ) : context.networkId === 4 ? (
            <p className="Rinkeby Navbar__Desktop--Item">Rinkeby</p>
          ) : (
            <p className="Mainnet Navbar__Desktop--Item">Main</p>
          )}
          {errorOpen && (
            <div className="noWeb3">
              <div className="noWeb3__Contents">
                <button onClick={this.closeError}>X</button>
                <p>{context.error.toString()}</p>
                <p>
                  Consider using{' '}
                  <a
                    href="https://www.opera.com/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Opera
                  </a>{' '}
                  or{' '}
                  <a
                    href="https://www.google.com/chrome/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Chrome
                  </a>{' '}
                  with the{' '}
                  <a
                    href="https://metamask.io/"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Metamask
                  </a>{' '}
                  extension.
                </p>
              </div>
            </div>
          )}
        </div>
        <HamburgerNav context={context} />
      </div>
    );
  }
};

export default HeaderLinks;
