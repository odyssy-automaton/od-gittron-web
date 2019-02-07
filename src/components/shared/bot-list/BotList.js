import React, { Component } from 'react';

import BotCard from '../bot-card/BotCard';

import './BotList.scss';

class BotList extends Component {
  renderBots() {
    return this.props.bots.map((bot) => {
      return <BotCard key={bot.tokenId} bot={bot} />;
    });
  }

  render() {
    const botCards = this.renderBots();

    return (
      <div>
        <div />
        <div className="BotList">{botCards}</div>
      </div>
    );
  }
}

export default BotList;
