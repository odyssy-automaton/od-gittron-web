import React from 'react';
import { Link } from 'react-router-dom';
import { useWeb3Context } from 'web3-react';

import './Header.scss';
import './Navbar.scss';
import './Hamburger.scss';
import HamburgerNav from './HamburgerNav';

function HeaderLinks() {
  const context = useWeb3Context();

  return (
    <div className="Header">
      <div className="Logo">
        <h1 className="Header__title">
          <Link to="/">Gittron</Link>
        </h1>
      </div>
      <div className="Navbar__Desktop">
        <Link to="/" className="Navbar__Desktop--Item">
          Bots
        </Link>
        <Link to="/about" className="Navbar__Desktop--Item">
          About
        </Link>
        {context.active ? (
          <Link to="/dashboard" className="Navbar__Desktop--Item">
            Dashboard
          </Link>
        ) : (
          context.connectorName !== 'MetaMask' && (
            <button onClick={() => context.setConnector('MetaMask')}>
              Activate MetaMask
            </button>
          )
        )}

        {!context.active ? (
          <p className="Nonet Navbar__Desktop--Item">Not connected</p>
        ) : context.networkId === 4 ? (
          <p className="Rinkeby Navbar__Desktop--Item">Rinkeby</p>
        ) : (
          <p className="Mainnet Navbar__Desktop--Item">Main</p>
        )}
        {context.error && (
          <p>
            {context.error.code}: {context.error.toString()}
          </p>
        )}
      </div>
      <HamburgerNav authenticated={context.active} />
    </div>
  );
}

export default HeaderLinks;
