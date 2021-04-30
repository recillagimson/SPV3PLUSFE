import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

export function SettingsPage() {
  const history = useHistory();

  return (
    <ProtectedContent>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <Box title="Settings" titleBorder withPadding>
        <H5 border>Security</H5>
        <List divider>
          <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={() => history.push('/settings/change-password')}
              primary="Change Password"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              role="presentation"
              onClick={() => {
                alert('Not yet available');
              }}
              primary="Pin Code"
              style={{
                flexGrow: 1,
              }}
              icon
            />
          </ListItem>
        </List>
      </Box>
    </ProtectedContent>
  );
}
