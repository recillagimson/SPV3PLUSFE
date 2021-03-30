/**
 * Render a private routes
 *
 */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from './slice/selectors';

export default function PrivateRoute({ component: Component, ...rest }) {
  // check if user is logged in
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // return the proper path
  // if user is logged in, render the page else redirect to "/"
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
}
