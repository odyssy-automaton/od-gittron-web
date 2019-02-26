import React, { Fragment } from 'react';
import BotCard from '../bot-card/BotCard';
import SupportButton from '../support-button/supportButton';
import BuidlButton from '../buidl-button/buidlButton';
import BotVerification from '../bot-verfication/BotVerification';
import EvolveButton from '../evolve-button/evolveButton';
import WithdrawButton from '../withdraw-button/withdrawButton';
import BotStats from '../bot-stats/BotStats';

import './BotDetail.scss';

function BotDetail(props) {
  const { account, authenticated, bot, web3 } = props;
  let unverified, verified;
  function handleVerification() {
    props.handleVerification();
  }

  if (bot) {
    unverified = bot.tokenType === 'prime' && !bot.verified;
    verified = bot.tokenType === 'prime' && bot.verified;
  }

  return (
    <Fragment>
      {bot && (
        <div className="BotDetail Columns Contain">
          <div className="Columns__Column--50">
            <BotCard bot={bot} account={account} web3={web3} />
          </div>
          <div className="Columns__Column--50">
            <div className="BotDetail__Info">
              {authenticated ? (
                <Fragment>
                  {unverified && (
                    <BotVerification
                      bot={bot}
                      handleVerification={handleVerification}
                      account={account}
                      web3={web3}
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
                </Fragment>
              ) : null}

              <BotStats bot={bot} />

              {bot.tokenType === 'prime' && authenticated ? (
                <div className="BotDetail__Actions">
                  <div className="BotDetail__Actions--Support">
                    <p>
                      Support the development of this bot's repo by cloning it
                      as a support bot.
                    </p>
                    <SupportButton bot={bot} account={account} web3={web3} />
                  </div>
                  <div className="BotDetail__Actions--Buidl">
                    <BuidlButton bot={bot} account={account} web3={web3} />
                  </div>
                  <div className="BotDetail__Actions--Owner">
                    <EvolveButton bot={bot} account={account} web3={web3} />
                    <WithdrawButton bot={bot} account={account} web3={web3} />
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
}

export default BotDetail;
