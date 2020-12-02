import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../../views/login';
import Main from '../../views/main';
import SignUp from '../../views/signup';

export default () => (
  <>
    <Route path="/" exact render={() => <Redirect to="/signup" />} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/app/main" component={Main} />
  </>
);
