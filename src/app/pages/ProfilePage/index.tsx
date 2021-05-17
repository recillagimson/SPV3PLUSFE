import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import ProfileBronze from 'app/components/UpdateProfile/Bronze';
import ProfileSilver from 'app/components/UpdateProfile/Silver';

import { TierIDs, Tiers } from 'app/components/Helpers/Tiers';

/** selectors, slice */
import {
  selectLoggedInName,
  selectReferences,
  selectUser,
} from 'app/App/slice/selectors';

import UserInfo from './UserInfo';
import UserInfoList from './UserDetails';
// import ProfileForm from './ProfileForm';

export function UserProfilePage() {
  const profile: any = useSelector(selectUser);
  const login = useSelector(selectLoggedInName);
  const refs = useSelector(selectReferences);

  const [showProfile, setShowProfile] = React.useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = React.useState(false);
  const [showUpdateEmail, setShowUpdateEmail] = React.useState(false);
  const [showUpdateMobile, setShowUpdateMobile] = React.useState(false);

  if (!profile || (refs && Object.keys(refs).length === 0)) {
    return (
      <ProtectedContent>
        <Helmet>
          <title>Profile</title>
        </Helmet>
        <Box title="User Profile" titleBorder withPadding>
          <Loading />
        </Box>
      </ProtectedContent>
    );
  }

  let tierName = '';
  let tierID = '';
  if (
    profile &&
    profile.user_account &&
    profile.user_account.tier_id &&
    profile.user_account.tier_id !== ''
  ) {
    const tierIndex = Tiers.findIndex(
      j => j.id === profile.user_account.tier_id,
    );
    tierID = profile.user_account.tier_id;
    tierName = tierIndex !== -1 ? Tiers[tierIndex].class : '';
  }

  let updateForm = (
    <ProfileBronze
      onCancel={() => {
        setShowUpdateProfile(prev => !prev);
        setShowProfile(prev => !prev);
      }}
      onSuccess={() => {
        setShowUpdateProfile(prev => !prev);
        setShowProfile(prev => !prev);
      }}
    />
  );

  if (Boolean(tierID) && tierID !== TierIDs.bronze.id) {
    updateForm = (
      <ProfileSilver
        onCancel={() => {
          setShowUpdateProfile(prev => !prev);
          setShowProfile(prev => !prev);
        }}
        onSuccess={() => {
          setShowUpdateProfile(prev => !prev);
          setShowProfile(prev => !prev);
        }}
      />
    );
  }

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
              tier={`${tierName} Member`}
            />
            <UserInfoList
              profile={profile}
              refs={refs}
              isBronze={Boolean(tierID) && tierID === TierIDs.bronze.id}
            />
          </div>
        </Box>
      )}
      {showUpdateProfile && updateForm}
    </ProtectedContent>
  );
}
