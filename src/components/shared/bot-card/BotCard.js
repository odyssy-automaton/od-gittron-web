import React, { Component } from 'react';

import './BotCard.scss';

class BotCard extends Component {
  support = () => {
    console.log('test');
  };
  render() {
    const { bot } = this.props;

    return (
      <div className="BotCard">
        <div className="BotCard__Header">
          <p className="BotCard__Header--Name">{bot.tokenId}</p>
          <p>{bot.mined}</p>
        </div>
        <div className="Verified">
          <img src="https://s3.amazonaws.com/odyssy-assets/Bot--Verified.svg" alt="Verified" />
        </div>
        {bot.mined ? (
          <img src={bot.tokenUriData.image} alt={bot.tokenId} height="300px" />
        ) : (
          <img
            src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.svg"
            alt={bot.tokenId}
            height="300px"
          />
        )}
        <div className="BotCard__Footer">
          <p className="BotCard__Footer--Type">{bot.tokenType} bot</p>
          <p>Gen {bot.generation}</p>
          {/* <p>DNA {bot.dna}</p> */}
        </div>
      </div>
    );
  }
}

export default BotCard;
