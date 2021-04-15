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
                primary="Change Email Address"
                style={{
                  flexGrow: 1,
                }}
              />
              <IconButton onClick={() => alert('clicked')}>
                <FontAwesomeIcon icon="chevron-right" />
              </IconButton>
            </ListItem>
            <ListItem flex>
              <ListItemText
                primary="Change Mobile Number"
                style={{
                  flexGrow: 1,
                }}
              />
              <IconButton onClick={() => alert('clicked')}>
                <FontAwesomeIcon icon="chevron-right" />
              </IconButton>
            </ListItem>
            <ListItem flex>
              <ListItemText
                primary="Upload ID"
                style={{
                  flexGrow: 1,
                }}
              />
              <IconButton onClick={() => alert('clicked')}>
                <FontAwesomeIcon icon="chevron-right" />
              </IconButton>
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Birthdate"
                primary="02/17/1995"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Birthplace"
                primary="East Avenue Medical Center"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Country"
                primary="Philippines"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Address"
                primary="11 De Castro Avenue, De Castro Subdivision, Sta. Lucia 1600"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Province / State"
                primary="Bohol"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="City"
                primary="Quezon City"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Postal Code"
                primary="1101"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Source of Funds"
                primary="Work"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
            <ListItem flex>
              <ListItemText
                label="Nature of Work"
                primary="Office"
                style={{
                  flexGrow: 1,
                }}
              />
            </ListItem>
          </List>
        </div>
      </Box>
    </ProtectedContent>
  );
}
