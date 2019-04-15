import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import BotCard from '../bot-card/BotCard';

import './BotList.scss';
import SupportButton from '../support-button/supportButton';

class BotList extends Component {
  renderBots() {
    return this.props.bots.map((bot) => {
      return (
        <Fragment key={bot.tokenId}>
          <Link to={`bots/${bot.tokenId}`}>
            <BotCard bot={bot} />
          </Link>
          {bot.verified && bot.tokenType === 'prime' && this.props.w3context.active && (
            <SupportButton
              bot={bot}
              account={this.props.w3context.account}
              gtContext={this.props.context}
            />
          )}
        </Fragment>
      );
    });
  }

  render() {
    const botCards = this.renderBots();

    return (
      <div>
        <div className="BotList">{botCards}</div>
      </div>
    );
  }
}

export default BotList;
