import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

import BotCard from '../bot-card/BotCard';
import SupportButton from '../support-button/supportButton';
import BuidlButton from '../buidl-button/buidlButton';
import BotVerification from '../bot-verfication/BotVerification';
import EvolveButton from '../evolve-button/evolveButton';
import WithdrawButton from '../withdraw-button/withdrawButton';
import BotStats from '../bot-stats/BotStats';

import './BotDetail.scss';
import HatchButton from '../hatch-button/HatchButton';
import GithubBadge from '../github-badge/GithubBadge';
import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import BotArmy from '../bot-army/BotArmy';

function BotDetail(props) {
  const { account, authenticated, bot, web3 } = props;
  let unverified, verified, hasPrimeBot;
  function handleVerification() {
    props.handleVerification();
  }

  function handleHatch() {
    props.handleHatch();
  }

  if (bot) {
    unverified = bot.tokenType === 'prime' && !bot.verified;
    verified = bot.tokenType === 'prime' && bot.verified;
    hasPrimeBot = bot.tokenType !== 'prime' && bot.relatedPrimeBot;
  }

  return (
    <GittronWeb3Consumer>
      {(gtContext) => (
        <Fragment>
          {bot && (
            <div className="BotDetail Columns Contain">
              <div className="Columns__Column--50 BotDetail__Card">
                {bot.tokenId && !bot.hatched && authenticated ? (
                  <HatchButton
                    bot={bot}
                    account={account}
                    handleHatch={handleHatch}
                    gtContext={gtContext}
                  />
                ) : null}

                <BotCard bot={bot} account={account} web3={web3} />
              </div>
              <div className="Columns__Column--50">
                {bot.hatched ? (
                  <div className="BotDetail__Info">
                    {authenticated ? (
                      <Fragment>
                        {unverified && (
                          <BotVerification
                            bot={bot}
                            handleVerification={handleVerification}
                            account={account}
                            gtContext={gtContext}
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
                        {verified && bot.tokenId && !bot.relatedChildBot && (
                          <GithubBadge
                            bot={bot}
                            account={account}
                            gtContext={gtContext}
                          />
                        )}
                      </Fragment>
                    ) : null}

                    <BotStats bot={bot} />

                    {bot.relatedAncestorBot ? (
                      <Link to={`/bots/${bot.relatedAncestorBot}`}>
                        View My Ancestor
                      </Link>
                    ) : null}

                    {bot.relatedChildBot ? (
                      <Link to={`/bots/${bot.relatedChildBot}`}>
                        View My Child
                      </Link>
                    ) : null}

                    {hasPrimeBot ? (
                      <Link to={`/bots/${bot.relatedPrimeBot}`}>
                        View My Prime Bot
                      </Link>
                    ) : null}

                    {bot.tokenType === 'prime' && authenticated ? (
                      <Fragment>
                        <div className="BotDetail__Actions">
                          {!bot.relatedChildBot ? (
                            <Fragment>
                              <div className="BotDetail__Actions--Support">
                                <p>
                                  Support the development of this bot's repo by
                                  cloning it as a support bot.
                                </p>
                                <SupportButton
                                  bot={bot}
                                  account={account}
                                  gtContext={gtContext}
                                />
                              </div>
                              <div className="BotDetail__Actions--Buidl">
                                <BuidlButton
                                  bot={bot}
                                  account={account}
                                  gtContext={gtContext}
                                />
                              </div>
                            </Fragment>
                          ) : null}

                          <div className="BotDetail__Actions--Owner">
                            {!bot.relatedChildBot ? (
                              <Fragment>
                                <EvolveButton
                                  bot={bot}
                                  account={account}
                                  gtContext={gtContext}
                                />
                              </Fragment>
                            ) : null}
                            <WithdrawButton
                              bot={bot}
                              account={account}
                              gtContext={gtContext}
                            />
                          </div>
                        </div>
                      </Fragment>
                    ) : null}
                  </div>
                ) : (
                  <div className="Columns__Column--50">
                    <div className="BotDetail__Info">
                      {bot.tokenId && !bot.hatched && authenticated ? (
                        <div>
                          <h3>Your Bot is ready to hatch!</h3>
                          <p>
                            Click the Hatch button on your Bot's card to hatch
                            it and reveal your Bot.
                          </p>
                        </div>
                      ) : (
                        <div>
                          <p>
                            This Bot is in incubation until its owner hatches
                            it.
                          </p>
                          <p>
                            If you <i>are</i> the owner, Connect your wallet to
                            hatch it.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {bot.tokenType === 'prime' ? (
            <div>
              <BotArmy primeBot={bot} />
            </div>
          ) : null}
        </Fragment>
      )}
    </GittronWeb3Consumer>
  );
}

export default BotDetail;
