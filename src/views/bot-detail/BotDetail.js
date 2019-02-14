import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
import { get } from '../../util/requests';
import BotCard from '../../components/shared/bot-card/BotCard';
import Web3 from 'web3';
import SupportButton from '../../components/shared/support-button/supportButton';
import BuidleButton from '../../components/shared/buidl-button/buidlButton';
import BotVerification from '../../components/shared/bot-verfication/BotVerification';
import EvolveButton from '../../components/shared/evolve-button/evolveButton';
import WithdrawButton from '../../components/shared/withdraw-button/withdrawButton';

import './BotDetail.scss';

class BotDetail extends Component {
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
  };

  handleVerification = () => {
    this.getBot();
  };

  render() {
    const { bot } = this.state;
    const unverified = bot.tokenType === 'master' && !bot.verified;
    const verified = bot.tokenType === 'master' && bot.verified;

    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            {unverified && (
              <div>
                <h5>Your Master Bot is unverified</h5>
                <BotVerification
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
              <div className="BotDetail__Info">
                <div>
                  <h3>{bot.tokenId}</h3>
                  <h4 className="Capitalize">{bot.tokenType} Bot</h4>
                  {verified && (
                    <div className="BotDetail__Verification-Badge">
                      <p>VERIFIED BOT!</p>
                    </div>
                  )}
                  <p>Owner = from contract</p>
                  <p>Repo = {bot.repo}</p>
                  <p>DNA = {bot.dna}</p>
                  <p>
                    Gen <strong>{bot.generation}</strong>
                  </p>
                  <div classname="BotDetail__Info--Rares">
                    <h5>Rares</h5>
                  </div>
                </div>
                {bot.tokenType === 'master' ? (
                  <div className="BotDetail__Actions">
                    <div className="BotDetail__Actions--Support">
                      <p>
                        Support the development of this bot's repo by cloning as
                        a support bot.
                      </p>
                      <SupportButton
                        bot={bot}
                        account={context.account}
                        web3={new Web3(context.web3js.givenProvider)}
                      />
                      <BuidleButton
                        bot={bot}
                        account={context.account}
                        web3={new Web3(context.web3js.givenProvider)}
                      />

                      <EvolveButton
                        bot={bot}
                        account={context.account}
                        web3={new Web3(context.web3js.givenProvider)}
                      />

                      <WithdrawButton
                        bot={bot}
                        account={context.account}
                        web3={new Web3(context.web3js.givenProvider)}
                      />
                    </div>
                    <div className="BotDetail__Actions--Worker">
                      <p>Clone as a Worker Bot</p>
                    </div>
                    <div className="BotDetail__Actions--Evolve">
                      <p>Evolve Master Bot</p>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </Fragment>
        )}
      </Web3Consumer>
    );
  }
}

export default BotDetail;
