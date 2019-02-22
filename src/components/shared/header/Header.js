import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';
import { AuthConsumer } from '../../../contexts/AuthContext';

class Header extends Component {
  render() {
    const { authenticated } = this.props;

    return (
      <div>
        {/* {authenticated ? (
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
        )} */}

        <AuthConsumer>
          {(authContext) => (
            <Fragment>
              {authContext.web3 ? (
                <Web3Consumer>
                  {(context) => (
                    <HeaderLinks
                      networkId={context.networkId}
                      authenticated={authContext.web3}
                    />
                  )}
                </Web3Consumer>
              ) : (
                <HeaderLinks authenticated={authContext.web3} />
              )}
            </Fragment>
          )}
        </AuthConsumer>
      </div>
    );
  }
}

export default Header;
