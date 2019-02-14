import React, { Component } from 'react';
import RepoListItem from './RepoListItem';
import './RepoList.scss';

class RepoList extends Component {
  renderRepos() {
    return this.props.repos.map((repo) => {
      return (
        <RepoListItem repo={repo} key={repo.ghid} web3={this.props.web3} />
      );
    });
  }

  render() {
    const repos = this.renderRepos();

    return (
      <table>
        <thead>
          <tr>
            <th>Repo</th>
            <th>Generation</th>
            <th>Worker Bots</th>
            <th>Support Bots</th>
          </tr>
        </thead>
        <tbody>{repos}</tbody>
      </table>
    );
  }
}

export default RepoList;
