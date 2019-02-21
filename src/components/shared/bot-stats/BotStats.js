import React, { Component } from 'react';

class BotStats extends Component {
  renderStat = (bot, traitType) => {
    if (bot.tokenUriData) {
      const attr = bot.tokenUriData.attributes.find((trait) => {
        return trait.trait_type === traitType;
      });
      return (
        <p className="Stats">
          {attr.trait_type} = {attr.value || 'None'}
        </p>
      );
    }
  };

  render() {
    const { bot } = this.props;

    return (
      <div className="BotStats">
        <p>Repo = <a href={`https://github.com/${bot.repoOwner}/${bot.repo}`}>{bot.repo}</a></p>
        <p>DNA = {bot.dna}</p>
        <p>
          Gen <strong>{bot.generation}</strong>
        </p>
        {this.renderStat(bot, 'primaryColor')}
        {this.renderStat(bot, 'secondaryColor')}
        {this.renderStat(bot, 'type')}
        {this.renderStat(bot, 'language')}

        <div className="BotDetail__Info--Rares">
          <h5>Rares</h5>
          {this.renderStat(bot, 'armor')}
          {this.renderStat(bot, 'origin')}
          {this.renderStat(bot, 'energy')}
          {this.renderStat(bot, 'backGear')}
        </div>
      </div>
    );
  }
}

export default BotStats;
