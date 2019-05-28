import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BotCard from '../bot-card/BotCard';

import './FeaturedBotList.scss';
import SupportButton from '../support-button/supportButton';
import WithdrawButton from '../withdraw-button/withdrawButton';

class FeaturedBotList extends Component {

  renderBots() {
    return this.props.bots.map((bot) => {
      return (
        <div key={bot.tokenId} className="BotItem">
          <div className="Columns">
            <div className="Columns__Column--50">
              <div className="Featured_Desc">
                <h2>{bot.featuredTitle}</h2>
                <p>{bot.featuredDesc}</p>
                {this.props.w3context.connectorName !== 'MetaMask' && (
                <button
                className="SupportButtonHolder"
                  onClick={() => {
                    this.props.w3context.setConnector('MetaMask');
                  }}
                >
                  Connect to Support
                </button>
                )}
                {bot.verified &&
                  bot.tokenType === 'prime' &&
                  this.props.w3context.active &&
                  this.props.w3context.account !== bot.orignalOwnerAddress && (
                    <div className="SupportButtonHolder">
                      <SupportButton
                        bot={bot}
                        account={this.props.w3context.account}
                        gtContext={this.props.context}
                      />
                    </div>
                  )}
                {bot.verified &&
                  bot.tokenType === 'prime' &&
                  this.props.w3context.active &&
                  this.props.w3context.account === bot.orignalOwnerAddress && (
                    <div className="WithdrawButtonHolder">
                      <WithdrawButton
                        bot={bot}
                        account={this.props.w3context.account}
                        gtContext={this.props.context}
                      />
                    </div>
                  )}
                <p>
                  Generation {bot.generation} | {bot.totalSupports} Supporters | {bot.buidls} Buidlers
                </p>
                <p>
                  <Link className="Link" to={`bots/${bot.tokenId}`}>View Bot =></Link> | <a className="Link" target="_blank" rel="noopener noreferrer" href={`https://github.com/${bot.repoOwner}/${bot.repo}`}>
                  View Repo =>
                  </a>
                </p>
              </div>
            </div>
            <div className="Columns__Column--50">
              <Link to={`bots/${bot.tokenId}`}>
                <BotCard bot={bot} />
                <div className="BotItem__Hover">
                  <div className="BotItem__Hover--Inner">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="48"
                      height="48"
                      viewBox="0 0 48 48"
                    >
                      <path d="M24 8l-2.83 2.83L32.34 22H8v4h24.34L21.17 37.17 24 40l16-16z" />
                    </svg>
                    <p>View Bot</p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      );
    });
  }

  render() {
    const botCards = this.renderBots();

    return (
      <div>
        <div className="FeaturedBotList">{botCards}</div>
      </div>
    );
  }
}

export default FeaturedBotList;
