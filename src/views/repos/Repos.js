import React, { Component } from 'react';
import { Web3Consumer } from 'web3-react';

import { get } from '../../util/requests';
import RepoList from '../../components/shared/repo-list/RepoList';
import { GittronWeb3Consumer } from '../../contexts/Gittronweb3Context';

class Repos extends Component {
  state = {
    repos: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`bots`);

    this.setState({
      repos: this.uniqueRepos(data),
    });
  };

  uniqueRepos = (data) => {
    let hash = {};

    const repos = data
      .filter((bot) => {
        return bot.tokenType === 'prime' && bot;
      })
      .map((bot) => {
        bot.verified =
          bot.verified === undefined || !bot.verified ? false : true;
        return bot;
      })
      .sort((x, y) => {
        return y.verified - x.verified;
      })
      .filter((bot) => {
        if (hash[bot.ghid]) {
          return false;
        }
        hash[bot.ghid] = true;
        return true;
      })
      .map((bot) => {
        // this doesn't work because unverified duplicates
        bot.buidlCount = data.filter(
          (b) => b.tokenType === 'buidl' && b.ghid === bot.ghid,
        ).length;
        bot.supportCount = data.filter(
          (b) => b.tokenType === 'support' && b.ghid === bot.ghid,
        ).length;
        return bot;
      });

    return repos;
  };

  render() {
    const { repos } = this.state;

    return (
      <Web3Consumer>
        {(context) => (
          <GittronWeb3Consumer>
            {(gtContext) => (
              <div className="Contain">
                <h3>Repos ({repos.length})</h3>
                <RepoList repos={repos} gtContext={gtContext} />
              </div>
            )}
          </GittronWeb3Consumer>
        )}
      </Web3Consumer>
    );
  }
}

export default Repos;
