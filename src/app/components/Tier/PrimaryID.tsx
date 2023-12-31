/**
 * This component will display an Primary ID list and Upload component
 * @prop {string}   tierID        tierID
 * @prop {function} onSuccess     callback when user successfully uploaded an id
 */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import Note from 'app/components/Elements/Note';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemButton from 'app/components/List/ListItemButton';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import Input from 'app/components/Elements/Input';
import Button from 'app/components/Elements/Button';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
// import IDUploadList from 'app/components/Elements/IDUploadList';

/** slices */
import { useContainerSaga } from 'app/pages/TierUpgradePage/slice';
import {
  selectLoading,
  selectData,
} from 'app/pages/TierUpgradePage/slice/selectors';

import IDUploadFile from './IDUploadFile';

type PrimaryIDsComponentProps = {
  tierID: string;
  onSuccess: (bool: boolean, ids: string[]) => void;
};

export default function PrimaryIDsComponent({
  onSuccess,
  tierID,
}: PrimaryIDsComponentProps) {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const data: any = useSelector(selectData);

  const [id, setID] = React.useState('');
  const [idNumber, setIDNumber] = React.useState({ value: '', error: false });
  const [showIDSelection, setShowIDSelection] = React.useState(true);
  const [showIDInput, setShowIDInput] = React.useState(false);
  const [showUpload, setShowUpload] = React.useState(false);

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0 && data.primary.length === 0) {
      dispatch(actions.getFetchLoading());
    }
  }, [actions, data, dispatch]);

  const toggleShowInput = (typeID: string) => {
    setShowIDInput(prev => !prev);
    setShowIDSelection(prev => !prev);
    setID(typeID);
    if (typeID === '') {
      setIDNumber({ value: '', error: false });
    }
  };

  const onValidateIDInput = () => {
    let hasError = false;
    if (idNumber.value === '') {
      hasError = true;
      setIDNumber({ ...idNumber, error: true });
    }

    if (!hasError) {
      setShowUpload(true);
      setShowIDInput(false);
    }
  };

  const onSuccessUpload = (ids: string[] = []) => {
    onSuccess(true, ids);
  };

  // populate id
  let items: React.ReactChild | undefined;
  if (data && Object.keys(data).length > 0 && data.primary.length > 0) {
    items = data.primary.map((p: any) => (
      <ListItem flex key={p.id}>
        <ListItemButton
          onClick={() => toggleShowInput(p.id)}
          style={{
            flexGrow: 1,
          }}
        >
          {p.type} <FontAwesomeIcon icon="chevron-right" />
        </ListItemButton>
      </ListItem>
    ));
  }

  return (
    <>
      {showIDSelection && (
        <Box
          title="Choose a Primary ID"
          titleBorder
          withPadding
          footerAlign="right"
          footer={
            items && (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onSuccess(false, [])}
              >
                I don't have a Primary ID
              </Button>
            )
          }
        >
          <Note>
            Verify your account now to unlock more features and services! All
            you have to do is to submit a valid ID and either a proof of billing
            or a secondary valid ID.
          </Note>
          <H5 margin="10px 0 20px">
            <FontAwesomeIcon icon="id-card" />
            Primary ID
          </H5>
          {loading && <Loading />}
          <List divider>{items}</List>
        </Box>
      )}

      {showIDInput && (
        <Box
          title="ID Number"
          titleBorder
          withPadding
          footerAlign="right"
          footer={
            <>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={() => toggleShowInput('')}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => onValidateIDInput()}
              >
                Next
              </Button>
            </>
          }
        >
          <InputIconWrapper left>
            <FontAwesomeIcon icon="id-card" className="icon" />
            <Input
              type="text"
              value={idNumber.value}
              onChange={e =>
                setIDNumber({ value: e.currentTarget.value, error: false })
              }
              error={idNumber.error}
              placeholder="Enter ID Number"
            />
          </InputIconWrapper>
          {idNumber.error && (
            <ErrorMsg formError>Please enter ID Number</ErrorMsg>
          )}
        </Box>
      )}

      {showUpload && (
        <IDUploadFile
          title="Upload Primary ID"
          idNumber={idNumber.value}
          idType={id}
          onSuccess={onSuccessUpload}
          onPrevious={() => {
            setShowIDInput(true);
            setShowUpload(false);
          }}
          isPrimary
        />
      )}
    </>
  );
}
