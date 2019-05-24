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
          
          {!bot.verified ? (
          <div className="Verified">
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Bot--Verified.svg"
              alt="Verified"
            />
          </div>
          ) : null}
          {bot.forked && ( <div className="iconFork"><svg width="24" height="24" viewBox="0 0 10 16" version="1.1" aria-hidden="true"><path fillRule="evenodd" d="M8 1a1.993 1.993 0 0 0-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 0 0 2 1a1.993 1.993 0 0 0-1 3.72V6.5l3 3v1.78A1.993 1.993 0 0 0 5 15a1.993 1.993 0 0 0 1-3.72V9.5l3-3V4.72A1.993 1.993 0 0 0 8 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg></div> )}
        </div>
        {bot.hatched && !bot.hatching ? (
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
