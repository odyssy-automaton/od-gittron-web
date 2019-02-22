import React, { Component, Fragment } from 'react';
import { Web3Consumer } from 'web3-react';
import { get, put } from '../../util/requests';
import BotCard from '../../components/shared/bot-card/BotCard';
import Web3 from 'web3';
import SupportButton from '../../components/shared/support-button/supportButton';
import BuidlButton from '../../components/shared/buidl-button/buidlButton';
import BotVerification from '../../components/shared/bot-verfication/BotVerification';
import EvolveButton from '../../components/shared/evolve-button/evolveButton';
import WithdrawButton from '../../components/shared/withdraw-button/withdrawButton';

import './BotDetail.scss';
import BotStats from '../../components/shared/bot-stats/BotStats';

class BotDetail extends Component {
  state = {
    bot: {},
  };

  componentDidMount = () => {
    this.getBot();

    console.log(this.props);
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
    const unverified = bot.tokenType === 'prime' && !bot.verified;
    const verified = bot.tokenType === 'prime' && bot.verified;

    return (
      <Web3Consumer>
        {(context) => (
          <Fragment>
            <div className="BotDetail Columns Contain">
              <div className="Columns__Column--50">
                <BotCard
                  bot={bot}
                  account={context.account}
                  web3={new Web3(context.web3js.givenProvider)}
                />
              </div>
              <div className="Columns__Column--50">
                <div className="BotDetail__Info">
                  {unverified && (
                    <BotVerification
                      bot={bot}
                      handleVerification={this.handleVerification}
                      account={context.account}
                      web3={new Web3(context.web3js.givenProvider)}
                    />
                  )}
                  <h3>{bot.tokenUriData && bot.tokenUriData.name}</h3>
                  <h4 className="Capitalize">{bot.tokenType} Bot</h4>
                  {verified && (
                    <div className="BotDetail__Verification-Badge">
                      <p>VERIFIED BOT!</p>
                    </div>
                  )}
                  {unverified && <p>CAUTION: UNVERIFIED BOT!</p>}
                  <BotStats bot={bot} />

                  {bot.tokenType === 'prime' ? (
                    <div className="BotDetail__Actions">
                      <div className="BotDetail__Actions--Support">
                        <p>
                          Support the development of this bot's repo by cloning
                          it as a support bot.
                        </p>
                        <SupportButton
                          bot={bot}
                          account={context.account}
                          web3={new Web3(context.web3js.givenProvider)}
                        />
                      </div>
                      <div className="BotDetail__Actions--Buidl">
                        <BuidlButton
                          bot={bot}
                          account={context.account}
                          web3={new Web3(context.web3js.givenProvider)}
                        />
                      </div>
                      <div className="BotDetail__Actions--Owner">
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
