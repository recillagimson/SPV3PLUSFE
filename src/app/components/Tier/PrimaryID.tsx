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

/** slices */
import { useContainerSaga } from 'app/pages/TierUpgradePage/slice';
import {
  selectLoading,
  selectData,
} from 'app/pages/TierUpgradePage/slice/selectors';

type PrimaryIDsComponentProps = {
  tierID: string;
  onSuccess: () => void;
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
  const [showIDSelection, setShowIDSelection] = React.useState(true);
  const [showIDInput, setShowIDInput] = React.useState(false);

  React.useEffect(() => {
    if (data && Object.keys(data).length > 0 && data.primary.length === 0) {
      dispatch(actions.getFetchLoading());
    }
  }, [actions, data, dispatch]);

  const toggleShowInput = (typeID: string) => {
    setShowIDInput(prev => !prev);
    setShowIDSelection(prev => !prev);
    setID(typeID);
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
        <Box title="Choose a Primary ID" titleBorder withPadding>
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
              <Button variant="contained" color="primary" size="large">
                Next
              </Button>
            </>
          }
        >
          <InputIconWrapper left>
            <FontAwesomeIcon icon="id-card" className="icon" />
            <Input type="text" value="1111" />
          </InputIconWrapper>
        </Box>
      )}
    </>
  );
}
