/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Render a private routes
 *
 */
import * as React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from './slice/selectors';

export default function PrivateRoute({ ...rest }) {
  // check if user is logged in
  let isAuthenticated = useSelector(selectIsAuthenticated);

  // return the proper path
  // if user is logged in, render the page else redirect to "/"
  if (!isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}
