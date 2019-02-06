import React, { Component } from 'react';

import './BotCard.scss';

class BotCard extends Component {
  render() {
    const { bot } = this.props;
    return (
      <div className="BotCard">
        <h3>{bot.tokenId}</h3>
        <img src={bot.tokenUriData.image} alt={bot.tokenId} height="200px" />
        <p>{bot.tokenType} bot</p>
        <p>Gen {bot.generation}</p>
      </div>
    );
  }
}

export default BotCard;
