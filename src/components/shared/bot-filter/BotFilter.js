import React, { Component } from 'react';
import Select from 'react-select';

import BotList from '../bot-list/BotList';

class BotFilter extends Component {
  state = {
    options: [
      { value: 'all', label: 'All Bots' },
      { value: 'master', label: 'Master Bot' },
      { value: 'worker', label: 'Worker Bot' },
      { value: 'support', label: 'Support Bot' },
    ],
    selectedOption: { value: 'all', label: 'All Bots' },
  };

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  };

  withFilters = () => {
    return this.state.selectedOption.value === 'all'
      ? this.props.bots
      : this.props.bots.filter((bot) => {
          return bot.tokenType === this.state.selectedOption.value;
        });
  };

  render() {
    const { options } = this.state;
    const filteredBots = this.withFilters();

    return (
      <div>
        <div>
          <p>{filteredBots.length} bots</p>

          <h4>Filters</h4>
          <Select options={options} onChange={this.handleChange} />
        </div>
        <div>
          <BotList bots={filteredBots} />
        </div>
      </div>
    );
  }
}

export default BotFilter;
