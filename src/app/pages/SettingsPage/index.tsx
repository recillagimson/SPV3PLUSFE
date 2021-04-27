import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import H5 from 'app/components/Elements/H5';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';
import IconButton from 'app/components/Elements/IconButton';

export function SettingsPage() {
  return (
    <ProtectedContent>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <Box title="Settings" titleBorder withPadding>
        <H5>Security</H5>
        <List divider>
          <ListItem flex>
            <ListItemText
              primary="Change Email Address"
              style={{
                flexGrow: 1,
              }}
            />
            <IconButton onClick={() => alert('clicked')}>
              <FontAwesomeIcon icon="chevron-right" />
            </IconButton>
          </ListItem>
        </List>
      </Box>
    </ProtectedContent>
  );
}
