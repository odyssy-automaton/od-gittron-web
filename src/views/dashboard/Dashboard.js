import React, { Fragment } from 'react';
import { Web3Consumer } from 'web3-react';

import { GittronWeb3Consumer } from '../../contexts/Gittronweb3Context';

import PrimeGenerator from '../../components/shared/prime-generator/PrimeGenerator';
import Contact from '../../components/shared/contact/Contact';
import DashboardBots from '../../components/shared/dashboard-bots/DashboardBots';

import './Dashboard.scss';

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
                    <h3>Generate a Prime Bot</h3>
                    <p>
                      Enter the full URL for a Github repo that you own or
                      manage to receive a Gen 0 Prime Bot.
                    </p>
                    <p>
                      Supporters of your repo can donate to your fund of choice
                      and they'll get a clone in the form of a Support Bot.
                    </p>
                    <p>
                      Set a price for each Support bot and an address to receive
                      the funds.
                    </p>
                  </div>
                  <div className="Columns__Column--50">
                    <PrimeGenerator
                      gtContext={gtContext}
                      account={context.account}
                    />
                  </div>
                  <div className="Columns__Column--100">
                    <Contact
                      authenticated={context.active}
                      address={context.account}
                    />
                  </div>
                  <div className="Columns__Column--100">
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
