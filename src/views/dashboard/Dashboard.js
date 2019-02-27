import React from 'react';
import { Web3Consumer } from 'web3-react';

import Generator from '../../components/shared/generator/generator';

import './Dashboard.scss';
import DashboardBots from '../../components/shared/dashboard-bots/DashboardBots';

function Dashboard() {
  return (
    <Web3Consumer>
      {(context) =>
        context.active ? (
          <div className="Dashboard Contain Columns">
            <div className="Columns__Column--50">
              <h4>Generate a Prime Bot</h4>
              <Generator account={context.account} />
            </div>
            <div className="Columns__Column--50">
              <h3>Your Bots</h3>
              <DashboardBots
                authenticated={context.active}
                address={context.account}
              />
            </div>
          </div>
        ) : (
          <p>* Please activate metamask</p>
        )
      }
    </Web3Consumer>
  );
}

export default Dashboard;
