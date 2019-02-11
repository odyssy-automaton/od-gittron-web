import React, { Component } from 'react';
import { Web3Consumer } from 'web3-react';
import Web3 from 'web3';

import Generator from '../../components/shared/generator/generator';

class Generate extends Component {
  render() {
    return (
      <Web3Consumer>
        {(context) => (
          <Generator account={context.account} web3={context.web3js} />
        )}
      </Web3Consumer>
    );
  }
}

export default Generate;
