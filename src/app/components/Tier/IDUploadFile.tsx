/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Upload List UI
 * @prop {string}   title       title
 * @prop {size}     number      id number inputted by the user
 * @prop {string}   idType      idType id retrieve from the API
 * @prop {function} onSuccess   return the index if upload is successfull
 * @prop {function} onPrevious  callback when user click the previous button
 * @prop {boolean}  isPrimary
 */
import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleConstants } from 'styles/StyleConstants';

import imgIcon from 'app/components/Assets/ImgIcon.png';
import imgIconError from 'app/components/Assets/ImgIconError.png';
import IconButton from 'app/components/Elements/IconButton';
import Dialog from 'app/components/Dialog';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';
import H3 from 'app/components/Elements/H3';
import Box from 'app/components/Box';
import Note from 'app/components/Elements/Note';
import Dropzone from 'app/components/Dropzone';

import { fileSize } from 'app/components/Helpers';

import { selectClientToken, selectUserToken } from 'app/App/slice/selectors';
import { appActions } from 'app/App/slice';
import { PassphraseState } from 'types/Default';
import { getResponsePassphrase } from './helpers';
import spdCrypto from '../Helpers/EncyptDecrypt';
import Paragraph from '../Elements/Paragraph';

const animate = keyframes`
   0% {
     left: -100%;
   }
   100% {
     left: 105%;
   }
 `;

const Wrapper = styled.div<{ invalid?: boolean }>`
  padding: 8px 10px;
  margin-bottom: 10px;
  background-color: ${p => (p.invalid ? '#ffd1cf' : '#fafafa')};
  color: ${p => (p.invalid ? '#ff645e' : 'inherit')};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  display: flex;
  align-items: center;
  justify-content: center;

  .file-preview {
    width: 90px;
    height: 64px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    border-radius: ${StyleConstants.BORDER_RADIUS};

    img {
      object-fit: cover;
    }
  }

  .file-info {
    flex-grow: 1;
    padding: 0 10px;

    small {
      color: ${p => (p.invalid ? '#ff645e' : StyleConstants.GRAY_TEXT)};
      display: inline-block;
    }
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
      width: 0;
      border-radius: ${StyleConstants.BORDER_RADIUS};

      &.animate {
        width: 100%;
        animation-name: ${animate};
        animation-duration: 1.5s;
        animation-iteration-count: infinite;
        animation-timing-function: ease-in-out;
      }

      &.success {
        width: 100%;
      }
    }
  }
`;

const dt = new DataTransfer();

export default function IDUploadListComponent({
  title,
  idType,
  idNumber,
  onSuccess,
  onPrevious,
  isPrimary,
}: {
  title: string;
  idType?: string;
  idNumber?: string;
  onSuccess: (ids: string[]) => void;
  onPrevious: () => void;
  isPrimary?: boolean;
}) {
  const dispatch = useDispatch();
  const token: any = useSelector(selectUserToken);
  const clientToken: any = useSelector(selectClientToken);

  const [arrayFiles, setArrayFiles] = React.useState<any[]>([]);
  const [invalidArray, setInvalidArray] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState<boolean>(false);
  const [responseData, setResponseData] = React.useState<{}[]>([]);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  React.useEffect(() => {
    return () => {
      dt.clearData();
      setArrayFiles([]);
      setInvalidArray([]);
    };
  }, []);

  const onSelectFiles = (files: any) => {
    const validFileTypes = ['image/jpeg', 'image/png', 'application/pdf'];
    if (files && files.length > 0) {
      const validFiles: any[] = [...arrayFiles];
      const invalidFiles: any[] = [...invalidArray];
      let count = validFiles.length;

      // loop through the drop files and check if already exists on our array,
      // if it exists, skip the file
      Object.keys(files).forEach(i => {
        if (
          validFileTypes.includes(files[i].type) &&
          files[i].size <= 5242880
        ) {
          const isExists = arrayFiles.findIndex(
            j => j.name === files[i].name && j.size === files[i].size,
          );

          if (isExists === -1 && count < 2) {
            count = count + 1;
            validFiles.push(files[i]);
            dt.items.add(files[i]);

            return;
          }
        }

        // if valid but excedeed the count
        if (
          validFileTypes.includes(files[i].type) &&
          files[i].size <= 5242880
        ) {
          const isInvalidExists = invalidArray.findIndex(
            j => j.name === files[i].name && j.size === files[i].size,
          );
          if (isInvalidExists === -1) {
            invalidFiles.push({
              file: files[i],
              msg: 'Exceeded maximum limit of upload',
            });
            return;
          }
        }
        // if invalid files
        if (
          !validFileTypes.includes(files[i].type) ||
          files[i].size > 5242880
        ) {
          const isInvalidExists = invalidArray.findIndex(
            j => j.name === files[i].name && j.size === files[i].size,
          );

          if (isInvalidExists === -1) {
            let errorMsg = '';
            if (
              validFileTypes.includes(files[i].type) &&
              files[i].size > 5242880
            ) {
              errorMsg = 'Maximum file size exceeded.';
            }
            if (
              !validFileTypes.includes(files[i].type) &&
              files[i].size <= 5242880
            ) {
              errorMsg =
                'Invalid file format. Accepted formats .jpg, .png, .pdf';
            }
            if (
              !validFileTypes.includes(files[i].type) &&
              files[i].size > 5242880
            ) {
              errorMsg = 'Maximum file size exceeded and invalid file format.';
            }

            invalidFiles.push({
              file: files[i],
              msg: errorMsg,
            });
            return;
          }
        }
      });
      setArrayFiles(validFiles);
      setInvalidArray(invalidFiles);
      // uploadFile();
    }
  };

  // delete file based on index
  const onDeleteFile = (i: number) => {
    const newArray = [...arrayFiles];
    const oldFiles = dt.files;

    dt.clearData();

    Object.keys(oldFiles).forEach(f => {
      if (
        oldFiles[f].name !== newArray[i].name &&
        oldFiles[f].size !== newArray[i].size
      ) {
        dt.items.add(oldFiles[f]);
      }
    });
    newArray.splice(i, 1);

    setArrayFiles(newArray);
  };

  // delete invalid file based on index
  const onDeleteInvalidFile = (i: number) => {
    const newArray = [...invalidArray];
    newArray.splice(i, 1);

    setInvalidArray(newArray);
  };

  const uploadFile = async () => {
    setError(false);
    setLoading(true);

    const dtFiles = dt.files;

    const fileData = new FormData();
    fileData.append('id_type_id', idType || '');
    if (idNumber) {
      fileData.append('id_number', idNumber);
    }
    Object.keys(dtFiles).forEach((i: any) => {
      fileData.append('id_photos[]', dtFiles[i]);
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
        `${process.env.REACT_APP_API_URL}/auth/user/verification`,
        options,
      );

      const resp = await req.json();

      if (resp && resp.data) {
        let decryptPhrase: PassphraseState = await getResponsePassphrase(
          resp.data.id,
          clientToken,
        );

        // decrypt payload data
        let decryptData = await spdCrypto.decrypt(
          resp.data.payload,
          decryptPhrase.passPhrase,
        );
        setResponseData(decryptData);
        setSuccess(true);
      }
      setLoading(false);
    } catch (err: any) {
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
        if (err.errors.id_type_id && err.errors.id_type_id.length > 0) {
          apiError += err.errors.id_type_id.join('\n');
        }
        if (err.errors.id_number && err.errors.id_number.length > 0) {
          apiError += err.errors.id_number.join('\n');
        }
        if (err.errors.id_number && err.errors.id_number.length > 0) {
          apiError += err.errors.id_number.join('\n');
        }
        if (err.errors.id_photos['0'] && err.errors.id_photos['0'].length > 0) {
          apiError += `\nFile must be jpeg, png or pdf and must not be greated than 1024kb (1mb).`;
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
      const ids: string[] = [];
      if (responseData && responseData.length > 0) {
        responseData.map((j: any) => ids.push(j.id));
      }

      onSuccess(ids);
      setSuccess(false);
      setArrayFiles([]);
      setResponseData([]);
      dt.clearData();
    }
  };

  let validItems: {} | null | undefined;
  let invalidItems: {} | null | undefined;
  if (arrayFiles && arrayFiles.length > 0) {
    validItems = arrayFiles.map((f: any, i: number) => {
      let imgPreview = f.type.includes('image')
        ? URL.createObjectURL(f)
        : imgIcon;

      return (
        <Wrapper key={f.name}>
          <div className="file-preview">
            <img src={imgPreview} alt={f.name} />
          </div>
          <div className="file-info">
            <span>{f.name}</span> <small>{fileSize(f.size)}</small>
            <p className="loader">
              <span
                className={
                  loading ? 'animate load' : success ? 'success load' : 'load'
                }
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
            onClick={() => onDeleteFile(i)}
            disabled={loading}
          >
            <FontAwesomeIcon icon={success ? 'check' : 'times'} />
          </IconButton>
        </Wrapper>
      );
    });
  }

  if (invalidArray && invalidArray.length > 0) {
    invalidItems = invalidArray.map((f: any, i: number) => {
      let imgPreview = f.file.type.includes('image')
        ? URL.createObjectURL(f.file)
        : imgIconError;

      return (
        <Wrapper invalid key={f.file.name}>
          <div className="file-preview">
            <img src={imgPreview} alt={f.file.name} />
          </div>
          <div className="file-info">
            <span>{f.file.name}</span> <small>{fileSize(f.file.size)}</small>
            <br />
            <small>{f.msg}</small>
          </div>
          <IconButton
            size="small"
            className="btn-file-stat"
            onClick={() => onDeleteInvalidFile(i)}
            disabled={loading}
          >
            <FontAwesomeIcon icon="times" />
          </IconButton>
        </Wrapper>
      );
    });
  }

  return (
    <div>
      <Box
        title={title}
        titleBorder
        withPadding
        footerAlign="right"
        footer={
          <>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={() => onPrevious()}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={uploadFile}
              disabled={arrayFiles.length < 2}
            >
              Upload
            </Button>
          </>
        }
      >
        <Dropzone
          onSelectFiles={onSelectFiles}
          message="Drag and drop both front and back side of your ID"
        />
        {validItems}
        <Paragraph align="right" weight="bold">
          {arrayFiles.length.toString()}/2 files ready for upload
        </Paragraph>
        {invalidItems}

        <Note>{isPrimary ? 'Government ID' : 'Secondary ID'}:</Note>
        <Note>
          <br />
          - Upload 2 Images (Front, Back).
          <br />
          - Maximum of 2 files upload.
          <br />
          - Must show all corners of the ID
          <br />
          - Must show front and back details of the ID
          <br />
          - Max file size: 5MB (5120kb)
          <br />- Formats accepted: JPG, PNG and PDF
        </Note>
      </Box>

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
            Your {isPrimary ? 'Primary' : 'Secondary'} ID has been successfully
            uploaded!
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
