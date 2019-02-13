import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Web3Consumer } from 'web3-react';
import Web3 from 'web3';

import { get } from '../../util/requests';
import RepoList from '../../components/shared/repo-list/RepoList';

class Repos extends Component {
  state = {
    repos: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      repos: this.uniqueRepos(data),
    });
  };

  uniqueRepos = (data) => {
    let hash = {};

    //TODO: might filter by unverified here
    const repos = data.filter((bot) => {
      if (hash[bot.ghid]) {
        return false;
      }
      hash[bot.ghid] = true;
      return true;
    });

    return repos;
  };

  render() {
    const { repos } = this.state;

    return (
      <Web3Consumer>
        {(context) => (
          <div>
            <h3>Repos ({repos.length})</h3>
            <RepoList
              repos={repos}
              web3={new Web3(context.web3js.givenProvider)}
            />
          </div>
        )}
      </Web3Consumer>
    );
  }
}

export default Repos;
