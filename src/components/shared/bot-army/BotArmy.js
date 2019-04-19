import React, { Component, Fragment } from 'react';

import { get } from '../../../util/requests';

import BotArmyList from './BotArmyList';

import './BotArmy.scss';

class BotArmy extends Component {
  state = {
    buidlArmy: [],
    supportArmy: [],
    generations: [],
  };

  componentDidMount = () => {
    this.getArmy();
  };

  // componentWillUpdate = (nextProps, nextState) => {
  //   if (
  //     this.props.primeBot &&
  //     this.props.primeBot.tokenId !== nextProps.primeBot.tokenId
  //   ) {
  //     this.getArmy();
  //   }
  // };

  getArmy = async () => {
    const { data } = await get(`bots`);

    this.setState({
      buidlArmy: this.army(data, 'buidl'),
      supportArmy: this.army(data, 'support'),
      generations: this.generations(data),
    });
  };

  army = (data, botType) => {
    const army = data
      .filter((bot) => {
        return bot.tokenType === botType && bot.hatched && bot && !bot.disabled;
      })
      .filter((bot) => {
        return bot.relatedPrimeBot === this.props.primeBot.tokenId;
      });

    return army;
  };

  generations = (data) => {
    const generations = data
      .filter((bot) => bot.tokenType === 'prime')
      .filter((bot) => {
        return (
          bot.tokenId === this.props.primeBot.relatedChildBot ||
          bot.tokenId === this.props.primeBot.relatedAncestorBot
        );
      });

    return generations;
  };

  render() {
    const { buidlArmy, supportArmy, generations } = this.state;

    return (
      <div className="Contain">
        {generations.length ? (
          <Fragment>
            <h3>Generations ({generations.length})</h3>
            <BotArmyList army={generations} />
          </Fragment>
        ) : null}

        <h3>Support Bots ({supportArmy.length})</h3>
        <BotArmyList army={supportArmy} />
        {supportArmy.length < 1 && (
          <p>No Support Bots have been generated for this repo.</p>
        )}
        <h3>Buidl Bots ({buidlArmy.length})</h3>
        <BotArmyList army={buidlArmy} />
        {buidlArmy.length < 1 && (
          <p>No Buidl Bots have been generated by this repo.</p>
        )}
      </div>
    );
  }
}

export default BotArmy;
