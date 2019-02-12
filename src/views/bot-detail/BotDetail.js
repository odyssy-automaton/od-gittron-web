import React from 'react';
import { Web3Consumer } from 'web3-react';

function BotDetail() {
  return (
    <Web3Consumer>
      {(context) => (
        <div>
          <h1>Poopin</h1>
        </div>
      )}
    </Web3Consumer>
  );
}

export default BotDetail;
