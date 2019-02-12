import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
import { get } from '../../util/requests';
import BotCard from '../../components/shared/bot-card/BotCard';
import Web3 from 'web3';
import SupportButton from '../../components/shared/support-button/supportButton';

class BotDetail extends Component {
  state = {
    bot: {},
  };

  componentDidMount = async () => {
    const { data } = await get(`tokenid/${this.props.match.params.tokenId}`);

    this.setState({
      bot: data,
    });
  };

  render() {
    const { bot } = this.state;
    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            <BotCard
              bot={bot}
              account={context.account}
              web3={new Web3(context.web3js.givenProvider)}
            />
            <div>
              {bot.tokenType === 'master' ? (
                <SupportButton
                  bot={bot}
                  account={context.account}
                  web3={new Web3(context.web3js.givenProvider)}
                />
              ) : null}
            </div>
          </Fragment>
        )}
      </Web3Consumer>
    );
  }
}

export default BotDetail;
