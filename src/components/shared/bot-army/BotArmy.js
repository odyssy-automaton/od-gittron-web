import React, { Component } from 'react';

import { get } from '../../../util/requests';

import BotArmyList from './BotArmyList';

import './BotArmy.scss';

class BotArmy extends Component {
  state = {
    buidlArmy: [],
    supportArmy: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`bots`);

    this.setState({
      buidlArmy: this.army(data, 'buidl'),
      supportArmy: this.army(data, 'support'),
    });
  };

  army = (data, botType) => {
    const army = data
      .filter((bot) => {
        return bot.tokenType === botType && bot.hatched && bot;
      })
      .filter((bot) => {
        return bot.relatedPrimeBot === this.props.relatedPrimeBot;
      });

    return army;
  };

  render() {
    const { buidlArmy, supportArmy } = this.state;

    return (
      <div className="Contain">
        <h3>Buidl Bots ({buidlArmy.length})</h3>
        <BotArmyList army={buidlArmy} />
        <h3>Support Bots ({supportArmy.length})</h3>
        <BotArmyList army={supportArmy} />
      </div>
    );
  }
}

export default BotArmy;
