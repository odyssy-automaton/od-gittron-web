import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import { get } from '../../util/requests';

import BotDetail from '../../components/shared/bot-detail/BotDetail';

import './Bot.scss';

class Bot extends Component {
  state = {
    bot: {},
    botLoading: false,
    hatching: false,
  };

  componentDidMount = () => {
    this._isMounted = true;

    if (this._isMounted) {
      this.getBot();
    }
  };

  componentWillUnmount() {
    this._isMounted = false;
  }

  componentWillUpdate = (nextProps, nextState) => {
    if (this.props.match.params.tokenId !== nextProps.match.params.tokenId) {
      this.getBot(nextProps.match.params.tokenId);
    }
  };

  getBot = async (id) => {
    this.setState({
      botLoading: true
    });
    const tokenId = id || this.props.match.params.tokenId;
    const { data } = await get(`bots/${tokenId}`);
    this.setState({
      bot: data,
      botLoading: false
    });
  };

  handleVerification = () => {
    this.getBot();
  };

  handleHatch = () => {
    this.getBot();
  };

  render() {
    const { bot, botLoading } = this.state;

    return (
      <Fragment>
        <Web3Consumer>
          {(context) =>
            bot ? (
              <BotDetail
                key={bot.tokenId}
                bot={bot}
                handleVerification={this.handleVerification}
                handleHatch={this.handleHatch}
                authenticated={context.active}
                account={context.account}
                botLoading={botLoading}
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
