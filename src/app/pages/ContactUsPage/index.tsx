import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { useHistory } from 'react-router-dom';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

export function ContactUsPage() {
  // const history = useHistory();

  return (
    <ProtectedContent>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>

      <Box title="Contact Us" titleBorder withPadding>
        <List divider bordertop>
          <ListItem flex>
            <ListItemText
              label="Business Address"
              primary="2402-D West Tower, Philippine Stock Exchange Building Ortigas Pasig City, Philippines 1600"
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Website"
              primary="https://squidpay.ph"
              style={{
                flexGrow: 1,
              }}
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Phone"
              primary="(02) 8517035"
              style={{
                flexGrow: 1,
              }}
              icon="phone"
            />
          </ListItem>
          <ListItem flex>
            <ListItemText
              label="Send us a Message"
              primary={'support|squid.ph'.replace('|', '@')}
              style={{
                flexGrow: 1,
              }}
              icon="envelope"
            />
          </ListItem>
        </List>
      </Box>
    </ProtectedContent>
  );
}
