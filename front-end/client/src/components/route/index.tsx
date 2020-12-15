import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Login from '../../views/login';
import Main from '../../views/main';
import SignUp from '../../views/signup';
import ResetPassword from '../../views/password-reset';
import UpdatePassword from '../../views/password-update';

export default () => (
  <>
    <Route path="/" exact render={() => <Redirect to="/login" />} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/reset_password" component={ResetPassword} />
    <Route path="/update_password" component={UpdatePassword} />
    <Route path="/app/main" component={Main} />
  </>
);
