import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';

import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

export function MerchantInquiryPage() {
  return (
    <ProtectedContent>
      <Helmet>
        <title>Merchant Inquiry</title>
      </Helmet>

      <Box title="Merchant Inquiry" titleBorder withPadding>
        <List divider bordertop>
          <ListItem flex>
            <ListItemText
              label="Send us a Message"
              primary={'sales|squid.ph'.replace('|', '@')}
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
