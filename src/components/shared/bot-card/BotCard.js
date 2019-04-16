import React, { Component } from 'react';

import './BotCard.scss';

class BotCard extends Component {
  render() {
    const { bot } = this.props;

    return (
      <div className="BotCard">
        <div className="BotCard__Header">
          <p className="BotCard__Header--Name">
            {bot.tokenUriData && bot.tokenUriData.name}
          </p>
          <p className="BotCard__Header--Details">{bot.tokenType} Bot | Gen {bot.generation}</p>
          <p>{bot.mined}</p>
          {bot.verified ? (
          <div className="Verified">
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Bot--Verified.svg"
              alt="Verified"
            />
          </div>
          ) : null}
        </div>
        {bot.hatched ? (
          <img src={bot.tokenUriData.image} alt={bot.tokenId} height="300px" />
        ) : (
          <img
            src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.svg"
            alt={bot.tokenId}
            height="300px"
          />
        )}
      </div>
    );
  }
}

export default BotCard;
