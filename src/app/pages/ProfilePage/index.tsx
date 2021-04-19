import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import UserInfo from './UserInfo';
import UserInfoList from './UserDetails';

export function UserProfilePage() {
  return (
    <ProtectedContent>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Box title="User Profile" titleBorder>
        <div style={{ padding: '20px 25px' }}>
          <UserInfo profile onEdit={() => alert('edit')} />
          <UserInfoList />
        </div>
      </Box>
    </ProtectedContent>
  );
}
