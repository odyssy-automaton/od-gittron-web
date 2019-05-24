import React, { Component } from 'react';
import Select from 'react-select';

import { GittronWeb3Consumer } from '../../../contexts/Gittronweb3Context';
import { Web3Consumer } from 'web3-react';

import BotList from '../bot-list/BotList';

import './BotFilter.scss';

class BotFilter extends Component {
  defaultValues = {
    typeOptions: [
      { value: 'all', label: 'All Bots' },
      { value: 'prime', label: 'Prime Bots' },
      { value: 'buidl', label: 'Buidl Bots' },
      { value: 'support', label: 'Support Bots' },
    ],
    type: { value: 'all', label: 'All Bots' },
    repo: { value: 'all', label: 'All Repos' },
  };

  state = {
    selected: {
      type: this.defaultValues.type,
      repo: this.defaultValues.repo,
      verified: this.defaultValues.verified,
    },
  };

  handleChange = (selectionCategory, selection) => {
    const selected = selection || this.defaultValues[selectionCategory];
    const newSelections = { ...this.state.selected };
    newSelections[selectionCategory] = selected;

    this.setState({ selected: newSelections });
  };

  withFilters = () => {
    const typeBots =
      this.state.selected.type.value === 'all'
        ? this.props.bots
        : this.props.bots.filter((bot) => {
            return bot.tokenType === this.state.selected.type.value;
          });

    return this.state.selected.repo.value === 'all'
      ? typeBots
      : typeBots.filter((bot) => {
          return bot.ghid === this.state.selected.repo.value;
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
    const { selected } = this.state;
    const { typeOptions } = this.defaultValues;
    const filteredBots = this.withFilters();
    const repoOptions = this.genRepoOptions();

    return (
      <div>
        <div>
          <div className="BotFilter__filters">
            <div className="Title">
              <h4>{filteredBots.length} Bots</h4>
            </div>
            <div className="BotFilter__filters--Fields">
              <h4>Filters</h4>
              <Select
                className="BotFilter__select"
                options={repoOptions}
                onChange={(e) => this.handleChange('repo', e)}
                value={selected.repo}
                isClearable={true}
              />
              <Select
                className="BotFilter__select"
                options={typeOptions}
                onChange={(e) => this.handleChange('type', e)}
                value={selected.type}
                isClearable={true}
              />
            </div>
          </div>
        </div>

        <div>
          <GittronWeb3Consumer>
            {(gtContext) => (
              <Web3Consumer>
                {(w3context) => (
                  <BotList
                    bots={filteredBots}
                    w3context={w3context}
                    context={gtContext}
                  />
                )}
              </Web3Consumer>
            )}
          </GittronWeb3Consumer>
        </div>
      </div>
    );
  }
}

export default BotFilter;
