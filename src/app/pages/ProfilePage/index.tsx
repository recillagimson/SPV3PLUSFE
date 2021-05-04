import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import {
  selectLoggedInName,
  selectReferences,
  selectUser,
} from 'app/App/slice/selectors';

import UserInfo from './UserInfo';
import UserInfoList from './UserDetails';
import ProfileForm from './ProfileForm';

export function UserProfilePage() {
  const profile = useSelector(selectUser);
  const login = useSelector(selectLoggedInName);
  const refs = useSelector(selectReferences);

  const [showProfile, setShowProfile] = React.useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = React.useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = React.useState(false);
  const [showUpdateMobile, setShowUpdateMobile] = React.useState(false);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {showProfile && (
        <Box title="User Profile" titleBorder>
          <div style={{ padding: '20px 25px' }}>
            <UserInfo
              login={login}
              profile={profile}
              onEdit={() => {
                setShowProfile(prev => !prev);
                setShowUpdateProfile(prev => !prev);
              }}
            />
            <UserInfoList profile={profile} refs={refs} />
          </div>
        </Box>
      )}
      {showUpdateProfile && (
        <ProfileForm
          onCancel={() => {
            setShowUpdateProfile(prev => !prev);
            setShowProfile(prev => !prev);
          }}
          onSuccess={() => {
            setShowUpdateProfile(prev => !prev);
            setShowProfile(prev => !prev);
          }}
        />
      )}
    </ProtectedContent>
  );
}
