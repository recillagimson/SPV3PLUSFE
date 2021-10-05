/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Upload List UI
 * @prop {}         files     file list to be uploaded
 * @prop {number}   index     index from the file list
 * @prop {string}   name      file name
 * @prop {size}     number    file size
 * @prop {string}   idType    idType id retrieve from the API
 * @prop {function} onSuccess return the index if upload is successfull
 */
import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { StyleConstants } from 'styles/StyleConstants';

import imgIcon from 'app/components/Assets/ImgIcon.png';
import IconButton from 'app/components/Elements/IconButton';
import { fileSize } from 'app/components/Helpers';

import { selectUserToken } from 'app/App/slice/selectors';

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

    .anim {
      display: block;
      position: relative;
      height: 8px;
      transition: width 0.3s ease-in-out;
      border-radius: ${StyleConstants.BORDER_RADIUS};
      /* animation-name: ${animate};
      animation-duration: 3s;
      animation-iteration-count: infinite;
      animation-timing-function: ease-in-out; */
    }
  }
`;

export default function IDUploadListComponent({
  files,
  index,
  name,
  size,
  idType,
  idNumber,
}: {
  files: any;
  index: number;
  name?: string;
  size?: number;
  idType?: string;
  idNumber?: string;
}) {
  const token: any = useSelector(selectUserToken);

  const [percent, setPercent] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);
  const [success, setSuccess] = React.useState(false);

  React.useEffect(() => {
    if (files && files.length > 0) {
      uploadFile();
    }
  }, [files]);

  const uploadFile = async () => {
    setError(false);
    setLoading(true);
    setPercent(0);
    const fileData = new FormData();
    fileData.append('id_type_id', idType || '');
    if (idNumber) {
      fileData.append('id_number', idNumber);
    }
    fileData.append('id_photos[]', files[index]);

    const options = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token.access_token}`,
      },
      body: fileData,
    };

    try {
      const response: any = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/user/verification`,
        options,
      );

      if (response && response.status !== 422) {
        const reader = response.body.getReader();
        const contentLengthHeader: any =
          response.headers.get('Content-Length') || 0;
        const resourceSize = parseInt(contentLengthHeader, 10);

        const read = async (reader, totalChunkSize = 0, chunkCount = 0) => {
          const {
            value: { length } = { length: 0 },
            done,
          } = await reader.read();

          if (done) {
            setLoading(false);
            setSuccess(true);
            return chunkCount;
          }

          const runningTotal = totalChunkSize + length;
          const percentComplete = Math.round(
            (runningTotal / resourceSize) * 100,
          );

          setPercent(percentComplete);

          return read(reader, runningTotal, chunkCount + 1);
        };
        const chunkCount = await read(reader);
      }
    } catch (error: any) {
      // console.log(error.message);
      setError(error);
    }
  };

  return (
    <Wrapper>
      <img src={imgIcon} alt="" />
      <div className="file-info">
        <span>{name}</span>
        <small>{fileSize(size)}</small>
        <p className="loader">
          <span
            className="anim"
            style={{
              width: `${percent}%` || 0,
              backgroundColor: !loading
                ? StyleConstants.NEGATIVE
                : StyleConstants.POSITIVE,
            }}
          />
        </p>
      </div>
      <IconButton
        size="small"
        className="btn-file-stat"
        onClick={() => uploadFile()}
      >
        <FontAwesomeIcon icon={!loading ? 'redo' : 'times'} />
      </IconButton>
    </Wrapper>
  );
}
