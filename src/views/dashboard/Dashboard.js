import React from 'react';
import { Web3Consumer } from 'web3-react';
import Web3 from 'web3';

import Generator from '../../components/shared/generator/generator';

function Dashboard() {
  return (
    <Web3Consumer>
      {(context) => (
        <Generator
          account={context.account}
          web3={new Web3(context.web3js.givenProvider)}
        />
      )}
    </Web3Consumer>
  );
}

export default Dashboard;
