import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import GittronWeb3Service from '../../../util/gittronWeb3';

class RepoListItem extends Component {
  componentDidMount() {
    this._isMounted = true;
    console.log('web3 account', this.props.account);

    this.GittronWeb3Service = new GittronWeb3Service(this.props.web3);
    this.loadContract();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  loadContract = async () => {
    const contract = await this.GittronWeb3Service.initContracts();
    console.log('load contract', contract);

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
        <td>{repo.generation}</td>
        <td>2</td>
        <td>2</td>
      </tr>
    );
  }
}

export default RepoListItem;
