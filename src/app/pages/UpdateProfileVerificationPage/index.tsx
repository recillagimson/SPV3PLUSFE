/* eslint-disable react-hooks/exhaustive-deps */
/**
 * This page is for updating of profile of user if he/she has no profile created yet
 * as per required by the Business Process
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import H3 from 'app/components/Elements/H3';

import Wrapper from 'app/components/Layouts/AuthWrapper';
import UpdateProfile from 'app/components/UpdateProfile/Bronze';
import Note from 'app/components/Elements/Note';

import { appActions } from 'app/App/slice';
import { deleteCookie, doSignOut } from 'app/components/Helpers';

export function UpdateProfileVerificationPage() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onCancelUpdate = () => {
    deleteCookie('spv_uat_f');
    doSignOut();
    // window.location.replace('/');
  };

  const onSuccessUpdate = () => {
    alert('success');
    deleteCookie('spv_uat_f');
    dispatch(appActions.getIsAuthenticated(true)); // set the store state to true as user is authenticated
    history.push('/dashboard');
  };

  return (
    <Wrapper>
      <Helmet title="Update Profile" />
      <div>
        <H3>Update Profile</H3>
        <Note>
          You need to update your basic profile information to continue using
          our services.
        </Note>
        <UpdateProfile onSuccess={onSuccessUpdate} onCancel={onCancelUpdate} />
      </div>
    </Wrapper>
  );
}
