import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RepoListItem extends Component {
  componentDidMount() {
    this._isMounted = true;

    this.gittronWeb3Service = this.props.gtContext.gittronWeb3Service;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { repo } = this.props;

    return (
      <tr>
        <td>
          <Link to={`repos/${repo.ghid}`}>
            <p>{repo.repo}</p>
          </Link>
        </td>
        <td>{repo.verified.toString()}</td>
        <td>{repo.generation}</td>
        <td>{repo.buidlCount}</td>
        <td>{repo.supportCount}</td>
      </tr>
    );
  }
}

export default RepoListItem;
