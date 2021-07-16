import * as React from 'react';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import Button from 'app/components/Elements/Button';

import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import Logo from 'app/components/Assets/Logo';

import { selectUser } from 'app/App/slice/selectors';

export function AddMoney() {
  const history = useHistory();
  const user: any = useSelector(selectUser);

  const [showEmailUpdate, setShowEmailUpdate] = React.useState(false); // added by habs

  const onClickDragonpay = () => {
    if (user) {
      if (!user.email || (user.email && user.email === '')) {
        setShowEmailUpdate(true);
      } else {
        history.push('/add-money/dragonpay');
      }
    }
  };

  return (
    <ProtectedContent>
      <Box title="Web Banking" titleBorder withPadding>
        <List divider>
          <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={onClickDragonpay}
              primary="Dragonpay"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem>
          {/* <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={() => alert('Feature coming soon')}
              primary="BPI"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem> */}
        </List>
      </Box>

      <Dialog show={showEmailUpdate} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />

          <H3 margin="0 0 10px">Email Address Required</H3>
          <p style={{ marginBottom: 35 }}>
            Dragonpay transaction requires a valid email address, click continue
            to update your email address.
          </p>
          <Button
            fullWidth
            onClick={() =>
              history.push({
                pathname: '/profile/update-email',
                state: '/add-money',
              })
            }
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '10px',
            }}
          >
            Continue
          </Button>
          <Button
            fullWidth
            onClick={() => setShowEmailUpdate(false)}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
