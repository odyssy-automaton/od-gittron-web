import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import './Header.scss';

import HeaderLinks from './HeaderLinks';
import { AuthConsumer } from '../../../contexts/AuthContext';
import FeedbackBar from '../feedback-bar/FeedbackBar';

class Header extends Component {
  render() {
    return (
      <Fragment>
        <FeedbackBar />
        <AuthConsumer>
          {(authContext) => (
            <Fragment>
              {authContext.web3enabled ? (
                <Web3Consumer>
                  {(context) => (
                    <HeaderLinks
                      networkId={context.networkId}
                      authenticated={authContext.web3enabled}
                    />
                  )}
                </Web3Consumer>
              ) : (
                <HeaderLinks authenticated={authContext.web3enabled} />
              )}
            </Fragment>
          )}
        </AuthConsumer>
      </Fragment>
    );
  }
}

export default Header;
