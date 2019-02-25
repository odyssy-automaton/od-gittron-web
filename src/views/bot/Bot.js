import React, { Component, Fragment } from 'react';
import Web3 from 'web3';
import { Web3Consumer } from 'web3-react';

import { get, put } from '../../util/requests';
import { AuthConsumer } from '../../contexts/AuthContext';

import BotDetail from '../../components/shared/bot-detail/BotDetail';

import './Bot.scss';

class Bot extends Component {
  state = {
    bot: {},
  };

  componentDidMount = () => {
    this.getBot();
  };

  componentWillUpdate = (nextProps, nextState) => {
    if (this.props.match.params.tokenId !== nextProps.match.params.tokenId) {
      this.getBot(nextProps.match.params.tokenId);
    }
  };

  getBot = async (id) => {
    const tokenId = id || this.props.match.params.tokenId;
    const { data } = await get(`tokenid/${tokenId}`);

    this.setState({
      bot: data,
    });

    //TODO: Make this check better
    if (!data.mined && !data.disabled) {
      let query = {
        txHash: data.txHash,
        tokenId: data.tokenId,
        ghid: data.ghid,
      };

      const res = await put('tokenstatus', query);
      console.log('checking bot status');
      console.log(res);
    }
  };

  handleVerification = () => {
    this.getBot();
  };

  render() {
    const { bot } = this.state;

    return (
      <AuthConsumer>
        {(authContext) => (
          <Fragment>
            {authContext.web3enabled ? (
              <Web3Consumer>
                {(context) => (
                  <BotDetail
                    bot={bot}
                    handleVerification={this.handleVerification}
                    authenticated={authContext.web3enabled}
                    account={context.account}
                    web3={new Web3(context.web3js.givenProvider)}
                  />
                )}
              </Web3Consumer>
            ) : (
              <BotDetail authenticated={authContext.web3enabled} />
            )}
          </Fragment>
        )}
      </AuthConsumer>
    );
  }
}

export default Bot;
