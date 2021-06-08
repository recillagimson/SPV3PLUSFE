/**
 * This component will display an Secondary ID list and Upload component
 * @prop {string}   tierID        tierID
 * @prop {function} onSuccess     callback when user successfully uploaded an id
 */
import * as React from 'react';

import Box from 'app/components/Box';
import Note from 'app/components/Elements/Note';
import Button from 'app/components/Elements/Button';
import Dropzone from 'app/components/Dropzone';
// import IDUploadList from 'app/components/Elements/IDUploadList';

import SelfieUpload from './SelfieUpload';

type SecondaryIDsComponentProps = {
  tierID: string;
  onSuccess: (ids: string[]) => void;
  onBack: () => void;
};

export default function SelfieComponent({
  onSuccess,
  tierID,
  onBack,
}: SecondaryIDsComponentProps) {
  const [files, setFiles] = React.useState<any>(false);

  const onGoBack = () => {
    setFiles(false);
    onBack();
  };

  const onSelectFiles = (files: any) => {
    setFiles(files);
  };

  const onSuccessUpload = (ids: string[] = []) => {
    setFiles(false);
    // return success to parent component with the ids
    console.log(ids);
    onSuccess(ids);
  };

  return (
    <>
      <Box
        title="Upload Selfie"
        titleBorder
        withPadding
        footerAlign="right"
        footer={
          <>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              onClick={onGoBack}
            >
              Previous
            </Button>
            <Button variant="contained" color="primary" size="large" disabled>
              Next
            </Button>
          </>
        }
      >
        <Dropzone onSelectFiles={onSelectFiles} />
        {files && files.length && (
          <SelfieUpload files={files} onSuccess={onSuccessUpload} />
        )}

        <Note>
          - Selfie with ID
          <br />
          - Max file size: 1MB (1024kb)
          <br />- Formats accepted: JPG, PNG and PDF
        </Note>
      </Box>
    </>
  );
}
