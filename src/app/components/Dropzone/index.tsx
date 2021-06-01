/**
 * Drag and Drop Uploader UI only
 * This will only return the files drop or selected from the UI
 * NOTE: This component will not store the recent dragged or selected files,
 *       No validation or handling of files will be done in this component
 *       It's up to the parent component to handle the uploading and validation of selected files
 *
 * @prop {function}   onSelectFiles         Callback for handling the selected files
 */
import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';

import Wrapper from './Wrapper';

type DropzoneProps = {
  onSelectFiles: (files: any) => void;
};

export default function Dropzone({ onSelectFiles }: DropzoneProps) {
  const [showLoading, setShowLoading] = React.useState(false);
  const fileRef = React.useRef<any>(null);

  const onDropFiles = e => {
    if (e && e.preventDefault) e.preventDefault();

    setShowLoading(true);
    const files = e.dataTransfer.files;

    setTimeout(() => {
      onSelectFiles(files);
      setShowLoading(false);
    }, 1000);
  };

  const selectFiles = e => {
    if (e && e.preventDefault) e.preventDefault();

    if (fileRef && fileRef.current.files.length) {
      setShowLoading(true);
      const files = fileRef.current.files;

      setTimeout(() => {
        onSelectFiles(files);
        setShowLoading(false);
      }, 1000);
    }
  };

  const onDragPreventDefault = e => {
    if (e && e.preventDefault) e.preventDefault();
  };

  const onClickToBrowse = e => {
    if (e && e.preventDefault) e.preventDefault();
    if (fileRef) {
      fileRef?.current.click();
    }
  };

  return (
    <Wrapper
      onDrop={onDropFiles}
      onDragLeave={onDragPreventDefault}
      onDragOver={onDragPreventDefault}
      onDragEnter={onDragPreventDefault}
    >
      <input ref={fileRef} type="file" multiple onChange={selectFiles} />
      {showLoading && <Loading position="absolute" />}
      <FontAwesomeIcon icon="upload" />
      <p>
        Drag and drop image here
        <br />
        or{' '}
        <button className="btn-upload" onClick={onClickToBrowse}>
          browse
        </button>{' '}
        files on your computer
      </p>
    </Wrapper>
  );
}
