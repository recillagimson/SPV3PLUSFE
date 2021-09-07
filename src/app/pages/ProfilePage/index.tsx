/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import ProfileBronze from 'app/components/UpdateProfile/Bronze';
import ProfileSilver from 'app/components/UpdateProfile/Silver';

import { TierIDs, Tiers } from 'app/components/Helpers/Tiers';

/** selectors, slice */
import { appActions } from 'app/App/slice';
import {
  selectLoggedInName,
  selectReferences,
  selectUser,
} from 'app/App/slice/selectors';

import UserInfo from './UserInfo';
import UserDetails from './UserDetails';
import ChangeAvatar from './ChangeAvatar';

import UserUpdateMobile from './UserUpdateMobile';
import UserUpdateEmail from './UserUpdateEmail';
import UserUpdateBirthdate from './UserUpdateBirthdate';
import UserUpdateName from './UserUpdateName';

// import ProfileForm from './ProfileForm';

export function UserProfilePage() {
  const dispatch = useDispatch();
  const profile: any = useSelector(selectUser);
  const login = useSelector(selectLoggedInName);
  const refs: any = useSelector(selectReferences);

  const [loading, setLoading] = React.useState(true);

  const [showProfile, setShowProfile] = React.useState(false);
  const [showUpdateProfile, setShowUpdateProfile] = React.useState(false);
  const [showUploadAvatar, setShowUploadAvatar] = React.useState(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState<any>(false);

  const [showName, setShowName] = React.useState(false);
  const [showBirthday, setShowBirthday] = React.useState(false);
  const [showMobile, setShowMobile] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);

  React.useEffect(() => {
    // if (!refs || Object.keys(refs).length === 0) {
    //   dispatch(appActions.getLoadAllReferences());
    // }

    if (refs && Object.keys(refs).length > 0 && profile) {
      let loadRef = false;

      // double check every references
      // TODO: on refactor, separate the retrieval of references in saga
      //       so user can continue and we will only just load the missing references
      if (!refs.maritalStatus || Object.keys(refs.maritalStatus).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadMaritalRef());
      }
      if (!refs.nationalities || Object.keys(refs.nationalities).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadNationalityRef());
      }
      if (!refs.countries || Object.keys(refs.countries).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadCountryRef());
      }
      if (!refs.sourceOfFunds || Object.keys(refs.sourceOfFunds).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadSourceOfFundsRef());
      }
      if (!refs.natureOfWork || Object.keys(refs.natureOfWork).length === 0) {
        loadRef = true;
        dispatch(appActions.getLoadNatureOfWorkRef());
      }

      // if (loadRef) {
      //   dispatch(appActions.getLoadAllReferences());
      // }

      // all references exists continue on edit profile
      if (!loadRef) {
        setLoading(false);
        setShowProfile(true);
      }
    }
  }, [refs]);

  const onChangeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;

    if (file && file.length > 0) {
      setSelectedAvatar(file);
      setShowProfile(false);
      setShowUploadAvatar(true);
    } else {
      setShowProfile(true);
      setShowUploadAvatar(false);
    }
  };

  const onSuccessUpload = () => {
    setShowProfile(true);
    setSelectedAvatar(false);
    setShowUploadAvatar(false);
    dispatch(appActions.getLoadUserProfile());
  };

  const onUpdateOtherFields = (
    name: 'mobile' | 'email' | 'birthday' | 'name',
  ) => {
    if (name === 'mobile') {
      setShowMobile(true);
    }
    if (name === 'email') {
      setShowEmail(true);
    }
    if (name === 'birthday') {
      setShowBirthday(true);
    }
    if (name === 'name') {
      setShowName(true);
    }
    setShowProfile(false);
  };

  let tierName = '';
  let tierID = '';
  if (
    Tiers &&
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

  if (Boolean(tierID) && tierID !== TierIDs.bronze) {
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
      {loading && (
        <Box title="User Profile" titleBorder withPadding>
          <Loading position="relative" />
        </Box>
      )}
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
              onChangeAvatar={onChangeAvatar}
            />
            <UserDetails
              profile={profile}
              refs={refs}
              isBronze={Boolean(tierID) && tierID === TierIDs.bronze}
              onUpdate={onUpdateOtherFields}
            />
          </div>
        </Box>
      )}
      {showUpdateProfile && updateForm}
      {showUploadAvatar && (
        <ChangeAvatar
          onSuccess={onSuccessUpload}
          selectedPhoto={selectedAvatar}
        />
      )}

      {showMobile && <UserUpdateMobile mobile={profile.mobile_number || '-'} />}
      {showEmail && <UserUpdateEmail email={profile.email || '-'} />}
      {showName && (
        <UserUpdateName
          firstName={profile.first_name || ''}
          middleName={profile.middle_name || ''}
          lastName={profile.last_name || ''}
        />
      )}
      {showBirthday && (
        <UserUpdateBirthdate birthDate={profile.birth_date || '-'} />
      )}
    </ProtectedContent>
  );
}
