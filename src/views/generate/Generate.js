import React, { Component } from 'react';
import GenerationForm from '../../components/forms/generation/GenerationForm';

import { post } from '../../util/requests';

class Generate extends Component {
  state = {
    tokenId: null,
  };

  handleSubmit = async (bot) => {
    const newBot = {
      repo: bot.repo,
      repoOwner: bot.repoOwner,
      tokenType: 'master',
      address: '0x83aB8e31df35AA3281d630529C6F4bf5AC7f7aBF',
      generation: '0',
    };

    const res = await post('tokens/new', newBot);

    console.log(res);

    this.setState({ tokenId: res.data.tokenId });
  };

  render() {
    const { tokenId } = this.state;

    return (
      <div>
        {tokenId ? (
          <div>
            <p>{tokenId} HAS BEEN CREATED</p>
            <img
              src="https://s3.amazonaws.com/odyssy-assets/Gittron__BotCube.png"
              alt={tokenId}
              height="300px"
            />
          </div>
        ) : (
          <GenerationForm onSubmit={this.handleSubmit} />
        )}
      </div>
    );
  }
}

export default Generate;
