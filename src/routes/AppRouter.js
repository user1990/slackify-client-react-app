import React from 'react';

import { Route, Switch } from 'react-router-dom';
import decode from 'jwt-decode';

import Home from '../components/Home';
import ViewTeam from '../components/ViewTeam';
import Register from '../components/Forms/Register';
import Login from '../components/Forms/Login';
import CreateTeam from '../components/Forms/CreateTeam';
import PrivateRoute from './PrivateRoute';
import DirectMessages from '../components/DirectMessages';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    decode(token);
    decode(refreshToken);
  } catch (err) {
    return false;
  }

  return true;
};

const App = () => (
  <div>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/login" component={Login} />
      <PrivateRoute
        path="/view-team/user/:teamId/:userId"
        exact
        component={DirectMessages}
      />
      <PrivateRoute
        path="/view-team/:teamId?/:channelId?"
        exact
        component={ViewTeam}
      />
      <PrivateRoute path="/create-team" exact component={CreateTeam} />
    </Switch>
  </div>
);

export default App;
