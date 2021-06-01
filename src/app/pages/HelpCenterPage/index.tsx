import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemButton from 'app/components/List/ListItemButton';

export function HelpCenterPage() {
  const history = useHistory();

  return (
    <ProtectedContent>
      <Helmet>
        <title>Settings</title>
      </Helmet>

      <Box title="Help Center" titleBorder withPadding>
        <List divider bordertop>
          <ListItem flex>
            <ListItemButton
              onClick={() => alert('Feature coming soon')}
              style={{
                flexGrow: 1,
              }}
            >
              FAQ <FontAwesomeIcon icon="chevron-right" />
            </ListItemButton>
          </ListItem>
          <ListItem flex>
            <ListItemButton
              onClick={() => history.push('/chat-support')}
              style={{
                flexGrow: 1,
              }}
            >
              Chat Support <FontAwesomeIcon icon="chevron-right" />
            </ListItemButton>
          </ListItem>
          <ListItem flex>
            <ListItemButton
              as="a"
              href="https://squidpay.ph/privacypolicy"
              target="_blank"
              style={{
                flexGrow: 1,
              }}
            >
              Privacy Policy <FontAwesomeIcon icon="chevron-right" />
            </ListItemButton>
          </ListItem>
          <ListItem flex>
            <ListItemButton
              as="a"
              onClick={() => history.push('/terms-and-condition')}
              style={{
                flexGrow: 1,
              }}
            >
              Terms and Conditions <FontAwesomeIcon icon="chevron-right" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </ProtectedContent>
  );
}
