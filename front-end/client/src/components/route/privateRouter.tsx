/* eslint-disable react/jsx-props-no-spreading */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ isLogin, component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={
      (props) => (
        isLogin
          ? <Component {...props} />
          : <Redirect to="/user/login" />
      )
    }
  />
);
