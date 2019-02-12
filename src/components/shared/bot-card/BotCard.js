import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './BotCard.scss';

class BotCard extends Component {
  render() {
    const { bot } = this.props;

    return (
      <Link to={`bots/${bot.tokenId}`}>
        <div className="BotCard">
          <h3>{bot.tokenId}</h3>
          <p>{bot.mined}</p>
          {bot.mined ? (
            <img
              src={bot.tokenUriData.image}
              alt={bot.tokenId}
              height="300px"
            />
          ) : (
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.png"
              alt={bot.tokenId}
              height="300px"
            />
          )}
          <p>{bot.tokenType} bot</p>
          <p>Gen {bot.generation}</p>
          <p>DNA {bot.dna}</p>
        </div>
      </Link>
    );
  }
}

export default BotCard;
