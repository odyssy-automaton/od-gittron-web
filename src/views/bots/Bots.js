import React, { Component } from 'react';

import { get } from '../../util/requests';
import BotFilter from '../../components/shared/bot-filter/BotFilter';

import './Bots.scss';

class Bots extends Component {
  state = {
    bots: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      bots: data.filter((bot) => !bot.disabled),
    });
  };

  render() {
    const { bots } = this.state;

    return <div>{bots ? <BotFilter bots={bots} /> : null}</div>;
  }
}

export default Bots;
