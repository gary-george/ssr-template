import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AppWrapper from './pages/appWrapper';
import HomeComponent from './pages/home/component';

export default () => (
  <Switch>
    <AppWrapper>
      <Route path="/home" exact component={HomeComponent} />
    </AppWrapper>
  </Switch>
);
