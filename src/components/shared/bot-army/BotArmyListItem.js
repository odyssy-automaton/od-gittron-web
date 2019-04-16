import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';

import './BotArmyListItem.scss';


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
          <div className="ArmyBot">
            <Link to={`/bots/${armyBot.tokenId}`}>
              <div className="ArmyBotCard__Header">
                <p className="BotCard__Header--Name">{armyBot.tokenId}</p>
              </div>
              <img alt="army bot" src={armyBot.tokenUriData.image} height="210px" />
              <div className="BotCard__Footer">
                <p>Gen {armyBot.generation}</p>
              </div>
            </Link>
          </div>
        )}
        </Fragment>
    );
  }
}

export default RepoListItem;
