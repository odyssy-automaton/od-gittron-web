import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FourOhFour from './views/404/404';
import Bots from './views/bots/Bots';
import Bot from './views/bot/Bot';
import Repos from './views/repos/Repos';
import RepoDetail from './views/repo-detail/RepoDetail';
import About from './views/about/About';
import Dashboard from './views/dashboard/Dashboard';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Bots} />
    <Route path="/bots/:tokenId" exact component={Bot} />
    <Route path="/repos" exact component={Repos} />
    <Route path="/repos/:ghid" exact component={RepoDetail} />
    <Route path="/about" exact component={About} />
    <Route path="/dashboard" exact component={Dashboard} />

    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
