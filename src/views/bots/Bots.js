import React, { Component } from 'react';

import { get } from '../../util/requests';
import BotCard from '../../components/shared/bot-card/BotCard';

import './Bots.scss';

class Bots extends Component {
  state = {
    bots: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      bots: data,
    });
  };

  renderBots() {
    console.log(this.state.bots);
    return this.state.bots.map((bot) => {
      return <BotCard key={bot.tokenId} bot={bot} />;
    });
  }

  render() {
    const bots = this.state.bots.length ? this.renderBots() : null;
    return (
      <div>
        <div>
          <p>{this.state.bots.length} bots</p>
        </div>
        <div className="Bots">{bots}</div>
      </div>
    );
  }
}

export default Bots;
