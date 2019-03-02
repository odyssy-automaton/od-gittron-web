import React, { Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import PrimeGenerator from '../../components/shared/prime-generator/PrimeGenerator';

import './Dashboard.scss';
import DashboardBots from '../../components/shared/dashboard-bots/DashboardBots';
import { GittronWeb3Consumer } from '../../contexts/Gittronweb3Context';

function Dashboard() {
  return (
    <Web3Consumer>
      {(context) =>
        context.active ? (
          <Fragment>
            <GittronWeb3Consumer>
              {(gtContext) => (
                <div className="Dashboard Contain Columns">
                  <div className="Columns__Column--50">
                    <h4>Generate a Prime Bot</h4>
                    <PrimeGenerator
                      gtContext={gtContext}
                      account={context.account}
                    />
                  </div>
                  <div className="Columns__Column--50">
                    <h3>Your Bots</h3>
                    <DashboardBots
                      gtContext={gtContext}
                      authenticated={context.active}
                      address={context.account}
                    />
                  </div>
                </div>
              )}
            </GittronWeb3Consumer>
          </Fragment>
        ) : (
          <p>* Please activate metamask</p>
        )
      }
    </Web3Consumer>
  );
}

export default Dashboard;
