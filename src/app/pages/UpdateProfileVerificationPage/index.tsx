/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This page is for updating of profile of user if he/she has no profile created yet
 * as per required by the Business Process
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Wrapper from 'app/components/Layouts/AuthWrapper';

import UpdateProfile from 'app/components/UpdateProfile/Profile';

import { appActions } from 'app/App/slice';
import { deleteCookie, doSignOut, getCookie } from 'app/components/Helpers';

export function UpdateProfileVerificationPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  React.useEffect(() => {
    const isForce = getCookie('spv_uat_f');
    if (!isForce) {
      window.location.replace('/');
    }
  }, []);

  const onCancelUpdate = () => {
    deleteCookie('spv_uat_f');
    doSignOut();
    // window.location.replace('/');
  };

  const onSuccessUpdate = () => {
    deleteCookie('spv_uat_f');
    dispatch(appActions.getIsAuthenticated(true)); // set the store state to true as user is already authenticated
    history.push('/dashboard');
  };

  return (
    <Wrapper bg>
      <Helmet title="User Info" />
      {/* <Note>
          You need to update your basic profile information to continue using
          our services.
        </Note> */}
      <UpdateProfile
        onSuccess={onSuccessUpdate}
        onCancel={onCancelUpdate}
        firstTime
        isBronze
      />
    </Wrapper>
  );
}
