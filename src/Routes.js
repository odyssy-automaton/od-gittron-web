import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FourOhFour from './views/404/404';
import Home from './views/home/Home';
import Repos from './views/repos/Repos';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repos" exact component={Repos} />
    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
