/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Upload List UI
 * @prop {}         files     file list to be uploaded
 * @prop {size}     number    file size
 * @prop {string}   idType    idType id retrieve from the API
 * @prop {function} onSuccess return the index if upload is successfull
 * @prop {boolean}  isPrimary
 */
import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleConstants } from 'styles/StyleConstants';

import imgIcon from 'app/components/Assets/ImgIcon.png';
import IconButton from 'app/components/Elements/IconButton';
import Dialog from 'app/components/Dialog';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';
import H3 from 'app/components/Elements/H3';

import { fileSize } from 'app/components/Helpers';

import { selectUserToken } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';

const animate = keyframes`
    0% {
      left: -100%;
    }
    100% {
      left: 105%;
    }
  `;

const Wrapper = styled.div`
  padding: 8px 10px;
  margin-bottom: 10px;
  background-color: #fafafa;
  border-radius: ${StyleConstants.BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 90px;
  }

  .file-info {
    flex-grow: 1;
    padding: 0 10px;

    small {
      color: ${StyleConstants.GRAY_TEXT};
      display: inline-block;
      margin-left: 10px;
    }
  }

  .btn-file-stat {
  }

  .loader {
    margin: 4px 0 0;
    width: 100%;
    height: 8px;
    background-color: #e0e0e0;
    border-radius: ${StyleConstants.BORDER_RADIUS};
    overflow: hidden;

    .load {
      display: block;
      position: relative;
      height: 8px;
      width: 100%;
      border-radius: ${StyleConstants.BORDER_RADIUS};

      &.animate {
        animation-name: ${animate};
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }
    }
  }
`;

export default function SelfieUploadComponent({
  files,
  onSuccess,
}: {
  files: any;
  onSuccess: () => void;
}) {
  const dispatch = useDispatch();
  const token: any = useSelector(selectUserToken);

  const [arrayFiles, setArrayFiles] = React.useState<{}[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  React.useEffect(() => {
    if (files && files.length > 0) {
      setArrayFiles([...files]);
      uploadFile();
    }
  }, [files]);

  const uploadFile = async () => {
    setError(false);
    setLoading(true);

    const fileData = new FormData();
    Object.keys(files).forEach((i: any) => {
      fileData.append('selfie_photo', files[i]);
    });

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: fileData,
    };

    try {
      const req: any = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/user/selfie`,
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
    setError(true);

    if (refresh) {
      onSuccess();
      setSuccess(false);
      setArrayFiles([]);
    }
  };

  let items;
  if (arrayFiles && arrayFiles.length) {
    items = arrayFiles.map((i: any) => (
      <Wrapper key={i.name}>
        <img src={imgIcon} alt="" />
        <div className="file-info">
          <span>{i.name}</span>
          <small>{fileSize(i.size)}</small>
          <p className="loader">
            <span
              className={loading ? 'animate load' : 'load'}
              style={{
                backgroundColor: error
                  ? StyleConstants.NEGATIVE
                  : StyleConstants.POSITIVE,
              }}
            />
          </p>
        </div>
        <IconButton
          size="small"
          className="btn-file-stat"
          onClick={error ? () => uploadFile() : undefined}
        >
          <FontAwesomeIcon
            icon={error ? 'redo' : success ? 'check' : 'times'}
          />
        </IconButton>
      </Wrapper>
    ));
  }

  return (
    <div>
      {items}
      <Dialog show={Boolean(apiErrorMsg)} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="25px 0">Update Photo Failed</H3>
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
          <H3 margin="25px 0">
            Selfie with ID has been successfully uploaded!
          </H3>
          <Button
            fullWidth
            onClick={() => onCloseUploadDialog(true)}
            variant="contained"
            color="primary"
            size="large"
          >
            Next
          </Button>
        </div>
      </Dialog>
    </div>
  );
}
