import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import { get } from '../../util/requests';

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
    const { data } = await get(`bots/${tokenId}`);

    this.setState({
      bot: data,
    });
  };

  handleVerification = () => {
    this.getBot();
  };

  handleHatch = () => {
    this.getBot();
  };

  render() {
    const { bot } = this.state;

    return (
      <Fragment>
        <Web3Consumer>
          {(context) =>
            bot ? (
              <BotDetail
                bot={bot}
                handleVerification={this.handleVerification}
                handleHatch={this.handleHatch}
                authenticated={context.active}
                account={context.account}
              />
            ) : (
              <BotDetail authenticated={context.active} />
            )
          }
        </Web3Consumer>
      </Fragment>
    );
  }
}

export default Bot;
