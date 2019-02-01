import React, { Component } from 'react';

import { get } from '../../util/requests';

class Repos extends Component {
  state = {
    repos: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      repos: data,
    });
  };

  renderRepos() {
    //might want to build this up differently or look at a better query in api
    let hash = {};

    return this.state.repos
      .filter((repo) => {
        if (hash[repo.ghid]) {
          return false;
        }
        hash[repo.ghid] = true;
        return true;
      })
      .map((repo) => {
        return (
          <div key={repo.uuid}>
            <h3>{repo.repo}</h3>
            <p>ghid: {repo.ghid}</p>
            <p>owner: {repo.repoOwner}</p>
          </div>
        );
      });
  }

  render() {
    const repos = this.state.repos.length ? this.renderRepos() : null;
    return (
      <div>
        <h1>The Repos</h1>
        {repos}
      </div>
    );
  }
}

export default Repos;
