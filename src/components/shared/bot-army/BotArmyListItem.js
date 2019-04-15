import React, { Component, Fragment } from 'react';
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
        <Fragment>
        {armyBot && (
          <div>
            <Link to={`/bots/${armyBot.tokenId}`}>
              <p>ID: {armyBot.tokenId}</p>
              <p>generation: {armyBot.generation}</p>
              <img alt="army bot" src={armyBot.tokenUriData.image} height="300px" />
            </Link>
          </div>
        )}
        </Fragment>
    );
  }
}

export default RepoListItem;
