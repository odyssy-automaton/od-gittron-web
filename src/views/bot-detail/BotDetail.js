import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
import { get } from '../../util/requests';
import BotCard from '../../components/shared/bot-card/BotCard';
import Web3 from 'web3';
import SupportButton from '../../components/shared/support-button/supportButton';
import BotVerfication from '../../components/shared/bot-verfication/BotVerification';

import './BotDetail.scss';

class BotDetail extends Component {
  state = {
    bot: {},
  };

  componentDidMount = () => {
    this.getBot();
  };

  getBot = async () => {
    const { data } = await get(`tokenid/${this.props.match.params.tokenId}`);

    this.setState({
      bot: data,
    });
  };

  handleVerification = () => {
    this.getBot();
  };

  render() {
    const { bot } = this.state;
    const unverified = bot.tokenType === 'master' && !bot.verified;

    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            {unverified && (
              <div>
                <h5>Your Master Bot is unverified</h5>
                <BotVerfication
                  bot={bot}
                  handleVerification={this.handleVerification}
                />
              </div>
            )}
            <div className="BotDetail">
              <BotCard
                bot={bot}
                account={context.account}
                web3={new Web3(context.web3js.givenProvider)}
              />
              <div>
                <div>
                  <h3>{bot.tokenId}</h3>
                  <h4>{bot.tokenType}</h4>
                  {!unverified && (
                    <div className="BotDetail__verfication-badge">
                      <p>VERIFIED BOT!</p>
                    </div>
                  )}
                  <p>owner: from contract</p>
                  <p>Repo: {bot.repo}</p>
                  <p>DNA {bot.dna}</p>
                  <p>Gen {bot.generation}</p>
                  <h5>Rares</h5>
                </div>
                <div>
                  {bot.tokenType === 'master' ? (
                    <div>
                      <p>
                        Support the development of this bot's repo by cloning as
                        a support bot.
                      </p>
                      <p>Price: from contract</p>
                      <SupportButton
                        bot={bot}
                        account={context.account}
                        web3={new Web3(context.web3js.givenProvider)}
                      />
                      <p>Clone as a Builder Bot</p>
                      <p>Evolve button here</p>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Web3Consumer>
    );
  }
}

export default BotDetail;
