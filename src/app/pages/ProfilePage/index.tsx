import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import UserInfo from './UserInfo';
import UserInfoList from './UserDetails';
import ProfileForm from './ProfileForm';

/** selectors, slice */
import { selectReferences } from 'app/App/slice/selectors';

export function UserProfilePage() {
  const refs = useSelector(selectReferences);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* <Box title="User Profile" titleBorder>
        <div style={{ padding: '20px 25px' }}>
          <UserInfo profile onEdit={() => alert('edit')} />
          <UserInfoList />
        </div>
      </Box> */}

      <ProfileForm />
    </ProtectedContent>
  );
}
