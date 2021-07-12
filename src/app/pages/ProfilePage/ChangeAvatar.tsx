/**
 * This is for upload avatar only
 * Will not use a redux-saga approach for this
 *
 * @prop {any}      selectedPhoto       the selected photo to be uploaded
 * @prop {function} onSuccess           callback for upload success
 */
import * as React from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Avatar from 'app/components/Elements/Avatar';
import Dialog from 'app/components/Dialog';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';
import H3 from 'app/components/Elements/H3';

import { selectUserToken } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';

export default function ChangeAvatarComponent({
  selectedPhoto,
  onSuccess,
}: {
  selectedPhoto: any;
  onSuccess: () => void;
}) {
  const token: any = useSelector(selectUserToken);
  const dispatch = useDispatch();

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  const onSubmitAvatar = async () => {
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
      selectedPhoto &&
      selectedPhoto.length > 0 &&
      acceptImage.includes(selectedPhoto[0].type)
    ) {
      setLoading(true);

      const fileData = new FormData();
      fileData.append('avatar_photo', selectedPhoto[0], selectedPhoto[0].name);

      const options = {
        method: 'POST',
        headers: {
          // Accept: 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
        body: fileData,
      };

      try {
        const req: any = await fetch(
          `${process.env.REACT_APP_API_URL}/user/change_avatar`,
          options,
        );

        const resp = await req.json();
        if (resp && resp.data) {
          setSuccess(true);
        }
        setLoading(false);
      } catch (err) {
        // special case, check the 422 for invalid data (account already exists)
        if (err && err.response && err.response.status === 422) {
          const body = await err.response.json();
          const newError = {
            code: 422,
            ...body,
          };
          onApiError(newError);
        } else if (err && err.response && err.response.status === 401) {
          dispatch(appActions.getIsSessionExpired(true));
        } else {
          onApiError(err);
        }
        setLoading(false);
      }
    }
  };

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
    if (err.code && err.code !== 422) {
      apiError = err.response.statusText;
      setApiErrorMsg(apiError || '');
    }
    if (!err.response && (!err.code || err.code !== 422)) {
      apiError = err.message;
      setApiErrorMsg(apiError || '');
    }
    setError(true);
  };

  const onCloseUploadDialog = (refresh: boolean) => {
    setApiErrorMsg('');
    setError(false);

    if (refresh) {
      onSuccess();
      setSuccess(false);
    }
  };

  let avatar = '';
  if (selectedPhoto && selectedPhoto.length > 0) {
    avatar = URL.createObjectURL(selectedPhoto[0]);
  }

  return (
    <>
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
          <Avatar image={avatar || undefined} size="xxlarge" />
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

      <Dialog show={error} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Update Photo Failed</H3>
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
    </>
  );
}
