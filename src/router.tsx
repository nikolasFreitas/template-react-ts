import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Home from './screens/Home';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route strict exact path="/">
        <Home />
      </Route>
      <Route exact path="/not-found" />
      <Route path="*">
        <Redirect to="/not-found" />
      </Route>
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
