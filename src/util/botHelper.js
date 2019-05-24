class BotHelper {

  countSupports = (primeBotId, bots) => {
    return bots
      .filter((bot) => !bot.disabled)
      .filter((bot) => bot.tokenType === 'support')
      .filter((bot) => bot.relatedPrimeBot === primeBotId).length;
  };

  countBuidls = (primeBotId, bots) => {
    return bots
      .filter((bot) => !bot.disabled)
      .filter((bot) => bot.tokenType === 'buidl')
      .filter((bot) => bot.relatedPrimeBot === primeBotId).length;
  };

  firstAncestor = (primeBotId, bots) => {
    let bot = bots.find((bot) => bot.tokenId === primeBotId);
    if (bot && bot.relatedAncestorBot) {
      return this.firstAncestor(bot.relatedAncestorBot, bots);
    }
    return primeBotId;
  };

  generations = (primeBotId, bots, generations = []) => {
    generations.push(primeBotId);
    let bot = bots.find((bot) => bot.tokenId === primeBotId);
    if (bot && bot.relatedChildBot) {
      return this.generations(bot.relatedChildBot, bots, generations);
    }

    return generations;
  };

  latestBot = (primeBotId, bots) => {
    const fa = this.firstAncestor(primeBotId, bots);
    const gens = this.generations(fa, bots);
    return gens[gens.length-1];
  }

  totalSupports = (primeBotId, bots) => {
    const fa = this.firstAncestor(primeBotId, bots);
    const gens = this.generations(fa, bots);
    return gens
      .map((id) => this.countSupports(id, bots))
      .reduce((total, num) => total + num);
  };
}

export default new BotHelper();
