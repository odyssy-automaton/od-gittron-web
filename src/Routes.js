import React from 'react';
import { Switch, Route } from 'react-router-dom';
import FourOhFour from './views/404';
import Home from './views/home';
import Repos from './views/repos';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Home} />
    <Route path="/repos" exact component={Repos} />
    <Route path="*" component={FourOhFour} />
  </Switch>
);

export default Routes;
