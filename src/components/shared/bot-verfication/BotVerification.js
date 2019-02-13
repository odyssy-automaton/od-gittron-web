import React, { Component, Fragment } from 'react';

import './BotVerification.scss';

class BotVerfication extends Component {
  async checkOwnership() {
    console.log('unverified');
  }

  render() {
    const { bot } = this.props;

    return (
      <Fragment>
        <div className="BotVerfication">
          <h6>Verify ownership</h6>
          <p>Repo = {bot.repo}</p>
          <p>
            To enable Worker and Support clones of your Master Bot, you need to
            verify ownership of this repo.
          </p>
          <p>
            To verity you own or manage a repo, create a file in your root
            directory called '.gittron' that contains your public key used to
            register this bot.
          </p>
          <button>Check Ownership</button>
        </div>
      </Fragment>
    );
  }
}

export default BotVerfication;
