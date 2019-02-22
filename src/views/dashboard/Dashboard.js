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
        <div className="Dashboard Contain Columns">
          <div className="Columns__Column--50">
            <h4>Generate a Prime Bot</h4>
            <Generator
              account={context.account}
              web3={new Web3(context.web3js.givenProvider)}
            />
          </div>
          <div className="Columns__Column--50">
            <h3>Your Bots</h3>
            <DashboardBots
              address={context.account}
              web3={new Web3(context.web3js.givenProvider)}
            />
          </div>
        </div>
      )}
    </Web3Consumer>
  );
}

export default Dashboard;
