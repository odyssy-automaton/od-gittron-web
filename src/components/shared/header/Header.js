import React, { Component } from 'react';
import { Web3Consumer } from 'web3-react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';

class Header extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <div>
        {authenticated ? (
          <Web3Consumer>
            {(context) => (
              <HeaderLinks
                networkId={context.networkId}
                authenticated={authenticated}
              />
            )}
          </Web3Consumer>
        ) : (
          <HeaderLinks authenticated={authenticated} />
        )}
      </div>
    );
  }
}

export default Header;
