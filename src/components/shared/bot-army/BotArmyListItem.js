import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RepoListItem extends Component {
  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const { armyBot } = this.props;

    return (
      <tr>
        {armyBot && (
          <td>
            <Link to={`/bots/${armyBot.tokenId}`}>
              <p>ID: {armyBot.tokenId}</p>
              <p>image: {armyBot.tokenUriData.image}</p>
              <img alt="army bot" src={armyBot.tokenUriData.image} />
            </Link>
          </td>
        )}
      </tr>
    );
  }
}

export default RepoListItem;
