import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import Home from './screens/Home';
import Login from './screens/Login';


const AppRouter = () => (
  <BrowserRouter>
    <Switch>
      <Route strict exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/not-found" />
      <Redirect from="*" to="/not-found" />
    </Switch>
  </BrowserRouter>
);

export default AppRouter;
