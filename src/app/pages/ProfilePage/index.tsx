/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Avatar from 'app/components/Elements/Avatar';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';
import H3 from 'app/components/Elements/H3';

import ProfileBronze from 'app/components/UpdateProfile/Bronze';
import ProfileSilver from 'app/components/UpdateProfile/Silver';

import { TierIDs, Tiers } from 'app/components/Helpers/Tiers';

/** selectors, slice */
import {
  selectLoggedInName,
  selectReferences,
  selectUser,
} from 'app/App/slice/selectors';
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

import UserInfo from './UserInfo';
import UserInfoList from './UserDetails';
import UserUpdateName from './UserUpdateName';
import UserUpdateBirthdate from './UserUpdateBirthdate';

import Button from 'app/components/Elements/Button';
import { appActions } from 'app/App/slice';
// import ProfileForm from './ProfileForm';

export function UserProfilePage() {
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const profile: any = useSelector(selectUser);
  const login = useSelector(selectLoggedInName);
  const refs = useSelector(selectReferences);

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const [showProfile, setShowProfile] = React.useState(true);
  const [showUpdateProfile, setShowUpdateProfile] = React.useState(false);
  const [showUploadAvatar, setShowUploadAvatar] = React.useState(false);
  const [selectedAvatar, setSelectedAvatar] = React.useState<any>(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  const [showUpdateName, setShowUpdateName] = React.useState(true);

  React.useEffect(
    () => () => {
      dispatch(actions.getFetchReset());
    },
    [],
  );

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
  }, [error]);

  const onApiError = (err: any) => {
    let apiError: string | undefined = '';

    if (err.code && err.code === 422) {
      if (err.errors && !err.errors.error_code) {
        if (err.errors.selfie_photo && err.errors.selfie_photo.length > 0) {
          apiError += err.errors.selfie_photo.join('\n');
        }
      }

      setApiErrorMsg(apiError || '');
    }
    if (error.code && error.code !== 422) {
      apiError = error.response.statusText;
      setApiErrorMsg(apiError || '');
    }
    if (!error.response && (!error.code || error.code !== 422)) {
      apiError = error.message;
      setApiErrorMsg(apiError || '');
    }
  };
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

  const onSubmitAvatar = () => {
    const acceptImage = [
      'image/gif',
      'image/jpeg',
      'image/png',
      'image/jpg',
      'image/bmp',
      'image/tiff',
      'image/webp',
    ];

    if (
      selectedAvatar &&
      selectedAvatar.length > 0 &&
      acceptImage.includes(selectedAvatar[0].type)
    ) {
      const fileData = new FormData();
      fileData.append(
        'avatar_photo',
        selectedAvatar[0],
        selectedAvatar[0].name,
      );

      dispatch(actions.getFetchLoading(fileData));
    }
  };

  const onCloseUploadDialog = (refresh: boolean) => {
    setApiErrorMsg('');

    if (refresh) {
      setShowProfile(true);
      setSelectedAvatar(false);
      setShowUploadAvatar(false);
      dispatch(appActions.getLoadUserProfile());
    }
    dispatch(actions.getFetchReset());
  };

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

  let avatar = '';
  if (selectedAvatar && selectedAvatar.length > 0) {
    avatar = URL.createObjectURL(selectedAvatar[0]);
  }

  return (
    <ProtectedContent>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {showUpdateName && (
        <>
          <UserUpdateName
            firstName={profile.first_name}
            middleName={profile.middle_name}
            lastName={profile.last_name}
          />
          <UserUpdateBirthdate birthDate={profile.birth_date} />
        </>
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
            <UserInfoList
              profile={profile}
              refs={refs}
              isBronze={Boolean(tierID) && tierID === TierIDs.bronze}
            />
          </div>
        </Box>
      )}
      {showUpdateProfile && updateForm}
      {showUploadAvatar && (
        <Box title="Upload Profile Picture" titleBorder withPadding>
          {loading && <Loading position="absolute" />}
          <div
            style={{
              width: 230,
              margin: '0 auto',
              textAlign: 'center',
              paddingBottom: 20,
            }}
          >
            <Avatar image={avatar || undefined} size="xlarge" />
            <Button
              size="large"
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: 20 }}
              onClick={onSubmitAvatar}
            >
              Submit
            </Button>
          </div>
        </Box>
      )}

      <Dialog show={error && Object.keys(error).length > 0} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Update Profile Failed</H3>
          <p>{apiErrorMsg}</p>
          <Button
            fullWidth
            onClick={() => onCloseUploadDialog(false)}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>

      <Dialog show={success} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Successfully updated!</H3>
          <p>All set! You have successfully updated your profile picture.</p>
          <Button
            fullWidth
            onClick={() => onCloseUploadDialog(true)}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
