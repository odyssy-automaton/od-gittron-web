import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';

class RepoListItem extends Component {
  componentDidMount() {
    this._isMounted = true;

    this.GittronWeb3Service = new GittronWeb3Service();
    this.loadContract();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();

    if (this._isMounted) {
      this.setState({ contract });
    }
  };

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
