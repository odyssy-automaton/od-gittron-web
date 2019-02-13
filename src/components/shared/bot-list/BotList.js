import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import BotCard from '../bot-card/BotCard';

import './BotList.scss';

class BotList extends Component {
  renderBots() {
    return this.props.bots.map((bot) => {
      return (
        <Link to={`bots/${bot.tokenId}`} key={bot.tokenId}>
          <BotCard bot={bot} />
        </Link>
      );
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
