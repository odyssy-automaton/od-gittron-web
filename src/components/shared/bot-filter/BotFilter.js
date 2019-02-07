import React, { Component } from 'react';
import Select from 'react-select';

import BotList from '../bot-list/BotList';

import './BotFilter.scss';

class BotFilter extends Component {
  state = {
    typeOptions: [
      { value: 'all', label: 'All Types' },
      { value: 'master', label: 'Master Bot' },
      { value: 'worker', label: 'Worker Bot' },
      { value: 'support', label: 'Support Bot' },
    ],
    selectedType: { value: 'all', label: 'All Types' },
    selectedRepo: { value: 'all', label: 'All Repos' },
  };

  handleTypeChange = (selection) => {
    const selectedType = selection || { value: 'all', label: 'All Types' };
    this.setState({ selectedType });
  };

  handleRepoChange = (selection) => {
    const selectedRepo = selection || { value: 'all', label: 'All Repos' };
    this.setState({ selectedRepo });
  };

  withFilters = () => {
    const typeBots =
      this.state.selectedType.value === 'all'
        ? this.props.bots
        : this.props.bots.filter((bot) => {
            return bot.tokenType === this.state.selectedType.value;
          });

    return this.state.selectedRepo.value === 'all'
      ? typeBots
      : typeBots.filter((bot) => {
          return bot.ghid === this.state.selectedRepo.value;
        });
  };

  genRepoOptions = () => {
    let hash = {};

    const repos = this.props.bots
      .filter((bot) => {
        if (hash[bot.ghid]) {
          return false;
        }
        hash[bot.ghid] = true;
        return true;
      })
      .map((bot) => {
        return { value: bot.ghid, label: bot.repo };
      });

    return [{ value: 'all', label: 'All Repos' }, ...repos];
  };

  render() {
    const { typeOptions, selectedType, selectedRepo } = this.state;
    const filteredBots = this.withFilters();
    const repoOptions = this.genRepoOptions();

    return (
      <div>
        <div>
          <p>{filteredBots.length} bots</p>

          <h4>Filters</h4>
          <div className="BotFilter__filters">
            <Select
              className="BotFilter__select"
              options={repoOptions}
              onChange={this.handleRepoChange}
              value={selectedRepo}
              isClearable={true}
            />
            <Select
              className="BotFilter__select"
              options={typeOptions}
              onChange={this.handleTypeChange}
              value={selectedType}
              isClearable={true}
            />
          </div>
        </div>
        <div>
          <BotList bots={filteredBots} />
        </div>
      </div>
    );
  }
}

export default BotFilter;
