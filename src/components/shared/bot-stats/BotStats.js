import React, { Component } from 'react';

class BotStats extends Component {
  renderStat = (bot, traitType) => {
    if (bot.tokenUriData) {
      const attr = bot.tokenUriData.attributes.find((trait) => {
        return trait.trait_type === traitType;
      });

      if (attr.value) {
        return (
          <p>
            {attr.trait_type}: {attr.value}
          </p>
        );
      }
    }
  };

  render() {
    const { bot } = this.props;

    return (
      <div className="BotStats">
        <p>Repo = {bot.repo}</p>
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
          {this.renderStat(bot, 'planet')}
          {this.renderStat(bot, 'energy')}
          {this.renderStat(bot, 'back')}
        </div>
      </div>
    );
  }
}

export default BotStats;
