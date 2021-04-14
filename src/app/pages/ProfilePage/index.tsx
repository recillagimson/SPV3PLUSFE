import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import IconButton from 'app/components/Elements/IconButton';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

import UserInfo from './UserInfo';

export function UserProfilePage() {
  return (
    <ProtectedContent>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Box
        title="User Profile"
        titleBorder
        footerBorder
        footer={
          <Button color="secondary" size="medium">
            Add Money
          </Button>
        }
        footerAlign="center"
      >
        <div style={{ padding: '20px 25px' }}>
          <UserInfo profile />
          <List divider>
            <ListItem flex>
              <ListItemText
                primary="Online Transfer"
                caption={`Fund transfer via Instapay`}
                style={{
                  flexGrow: 1,
                }}
                small
              />
              <IconButton onClick={() => alert('clicked')}>
                <FontAwesomeIcon icon="chevron-right" />
              </IconButton>
            </ListItem>
            <ListItem flex>
              <ListItemText
                primary="Online Transfer"
                caption={`Fund transfer via Instapay`}
                style={{
                  flexGrow: 1,
                }}
                small
              />
              <ListItemText
                align="right"
                primary="PHP 1,000.00"
                caption={`August 10, 2020\n03:46 PM`}
                small
              />
            </ListItem>
          </List>
        </div>
      </Box>
    </ProtectedContent>
  );
}
