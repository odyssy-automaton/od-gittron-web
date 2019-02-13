import React, { Component, Fragment } from 'react';

import './BotVerfication.scss';

class BotVerfication extends Component {
  render() {
    const { bot } = this.props;

    return (
      <Fragment>
        <div className="BotVerfication">
          <h6>Verify ownership</h6>
          <p>Repo = {bot.repo}</p>
        </div>
      </Fragment>
    );
  }
}

export default BotVerfication;
