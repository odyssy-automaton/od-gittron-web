import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { get } from '../../util/requests';

class Repos extends Component {
  state = {
    repos: [],
  };

  componentDidMount = async () => {
    const { data } = await get(`tokens`);
    this.setState({
      repos: this.uniqueRepos(data),
    });

    //need to turn this into a repo list
  };

  uniqueRepos = (data) => {
    let hash = {};

    const repos = data
      .filter((bot) => {
        if (hash[bot.ghid]) {
          return false;
        }
        hash[bot.ghid] = true;
        return true;
      })
      .map((bot) => {
        return { repo: bot.repo, ghid: bot.ghid };
      });

    return repos;
  };

  repoList = () => {
    return this.state.repos.map((repo) => {
      return (
        <Link to={`repos/${repo.ghid}`}>
          <p>{repo.repo}</p>
        </Link>
      );
    });
  };

  render() {
    // const { repos } = this.state;
    const repoList = this.repoList();

    return <div>{repoList}</div>;
  }
}

export default Repos;
