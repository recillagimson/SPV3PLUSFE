/**
 * This component will display an Secondary ID list and Upload component
 * @prop {string}   tierID        tierID
 * @prop {function} onSuccess     callback when user successfully uploaded an id
 * @prop {function} onBack        callback when user click the back button in id selection
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

import { deleteCookie, setCookie } from 'app/components/Helpers';

/** slices */
import { useContainerSaga } from 'app/pages/TierUpgradePage/slice';
import {
  selectLoading,
  selectData,
} from 'app/pages/TierUpgradePage/slice/selectors';

import IDUploadFile from './IDUploadFile';

type SecondaryIDsComponentProps = {
  tierID: string;
  onSuccess: (ids: string[]) => void;
  onBack: () => void;
};

export default function SecondaryIDsComponent({
  onSuccess,
  tierID,
  onBack,
}: SecondaryIDsComponentProps) {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const data: any = useSelector(selectData);

  const [idCount, setIDCount] = React.useState(0); // will record if user has uploaded two types of id
  const [id, setID] = React.useState<{ id: string; current: boolean }[]>([]);
  const [idNumber, setIDNumber] = React.useState({ value: '', error: false });
  const [uploadedID, setUploadedID] = React.useState<string[]>([]);
  const [showIDSelection, setShowIDSelection] = React.useState(true);
  const [showIDInput, setShowIDInput] = React.useState(false);
  const [showUpload, setShowUpload] = React.useState(false);

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0 && data.secondary.length === 0) {
      dispatch(actions.getFetchLoading());
    }
  }, [actions, data, dispatch]);

  const toggleShowInput = (typeID: string) => {
    setShowIDInput(prev => !prev);
    setShowIDSelection(prev => !prev);
    if (typeID !== '') {
      if (id.length === 0) {
        setID([{ id: typeID, current: true }]);
        setIDCount(idCount + 1);
      }

      if (id.length === 1) {
        const newIDs = [...id];
        newIDs[0].current = false;
        newIDs.push({ id: typeID, current: true });
        setID(newIDs);
        setIDCount(idCount + 1);
      }
    }

    if (typeID === '') {
      setID([]);
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
    const guids = [...uploadedID, ...ids];
    if (idCount === 0 && id.length < 2) {
      setCookie('spv_sec_count', idCount.toString());
      setShowUpload(false);
      setShowIDSelection(true);
      setIDNumber({ value: '', error: false });
      setUploadedID(guids);
    }
    if (idCount === 1 && id.length < 2) {
      setCookie('spv_sec_count', idCount.toString());
      setShowUpload(false);
      setShowIDSelection(true);
      setIDNumber({ value: '', error: false });
      setUploadedID(guids);
    }
    if (id.length === 2) {
      // onSuccess(ids);
      onSuccess(guids);
      deleteCookie('spv_sec_count');
      setIDCount(0);
    }
  };

  const onGoBack = () => {
    onBack();
    setIDCount(0);
    setID([]);
    setUploadedID([]);
    setIDNumber({ value: '', error: false });
    setShowIDSelection(true);
    setShowIDInput(false);
    setShowUpload(false);
  };

  // currentID and idType
  let idType = '';
  const currentID: any = id.find(j => j.current);
  if (currentID) {
    idType = currentID.id;
  }

  // populate id
  let items: React.ReactChild | undefined;
  if (data && Object.keys(data).length > 0 && data.secondary.length > 0) {
    items = data.secondary.map((p: any) => (
      <ListItem flex key={p.id}>
        <ListItemButton
          onClick={() => toggleShowInput(p.id)}
          style={{
            flexGrow: 1,
          }}
          className={
            id.findIndex(j => j.id === p.id) !== -1 ? 'active' : undefined
          }
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
          title="Choose a Secondary ID"
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
                Back
              </Button>
              <Button variant="contained" color="primary" size="large">
                Next
              </Button>
            </>
          }
        >
          <Note>
            Verify your account now to unlock more features and services! All
            you have to do is to submit a valid ID and either a proof of billing
            or a secondary valid ID.
          </Note>
          <H5 margin="10px 0 20px">
            <FontAwesomeIcon icon="id-card" />
            Recommended ID
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
          title="Upload Secondary ID"
          idNumber={idNumber.value}
          idType={idType}
          onSuccess={onSuccessUpload}
          onPrevious={() => {
            setShowIDInput(true);
            setShowUpload(false);
          }}
        />
      )}
    </>
  );
}
