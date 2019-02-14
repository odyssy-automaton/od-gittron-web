import React from 'react';
import { Web3Consumer } from 'web3-react';
import Web3 from 'web3';

import Generator from '../../components/shared/generator/generator';

import './Dashboard.scss';
import DashboardBots from '../../components/shared/dashboard-bots/DashboardBots';

function Dashboard() {
  return (
    <Web3Consumer>
      {(context) => (
        <div className="Dashboard">
          <div>
            <h3>Your Bots</h3>
            <DashboardBots
              address={context.account}
              web3={new Web3(context.web3js.givenProvider)}
            />
          </div>
          <div>
            <h3>Your Repos</h3>
            <p>There will be a list here</p>
            <h4>Register a new repo</h4>
            <Generator
              account={context.account}
              web3={new Web3(context.web3js.givenProvider)}
            />
          </div>
        </div>
      )}
    </Web3Consumer>
  );
}

export default Dashboard;
