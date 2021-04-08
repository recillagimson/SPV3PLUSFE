import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import IconButton from 'app/components/Elements/IconButton';
import Grid from 'app/components/Elements/Grid';
import List from 'app/components/List';
import ListItem from 'app/components/List/ListItem';
import ListItemText from 'app/components/List/ListItemText';

import Balance from './Balance';

export function DashboardPage() {
  return (
    <ProtectedContent>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Grid columns="35% 1fr" gap="30px">
        <Box
          title="Squid Balance"
          footerBorder
          footer={
            <Button color="secondary" size="medium">
              Add Money
            </Button>
          }
          footerAlign="center"
        >
          <Balance>
            <span className="currency">PHP</span>
            <span className="amount">10,000.00</span>
            <IconButton size="small" color="primary">
              <FontAwesomeIcon icon="plus" />
            </IconButton>
          </Balance>
        </Box>

        <Box
          title="Recent Transaction"
          titleAction={
            <IconButton onClick={() => alert('clicked')}>
              <FontAwesomeIcon icon="ellipsis-h" />
            </IconButton>
          }
          footerBorder
          footer={
            <Button color="secondary" size="medium">
              View Transaction History
            </Button>
          }
          footerAlign="center"
        >
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
              <ListItemText
                align="right"
                primary="PHP 1,000.00"
                caption={`August 10, 2020\n03:46 PM`}
                small
              />
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
        </Box>
      </Grid>
      <div>
        <Box
          title="Sample Container for Box UI"
          titleBorder
          footerBorder
          footer={
            <>
              <Button size="medium" color="primary" variant="contained">
                SEND
              </Button>
              <Button size="medium" color="secondary" variant="outlined">
                CANCEL
              </Button>
            </>
          }
          footerAlign="right"
        >
          <div style={{ padding: '25px' }}>
            <p>
              This element has a parent container that has a padding. The
              content element of this box component has no padding, so it's up
              to the child elements container to have the padding
            </p>
          </div>
          <div>
            <p>This element has a parent container that has no padding</p>
          </div>
        </Box>
      </div>
      <Grid columns="1fr 1fr" gap="0 25px" alignItems="start">
        <Box
          title="Box UI with Button in Title"
          titleBorder
          titleAction={
            <IconButton onClick={() => alert('clicked')}>
              <FontAwesomeIcon icon="trash" />
            </IconButton>
          }
          footerBorder
          footer={
            <>
              <Button size="medium" color="primary" variant="contained">
                SEND
              </Button>
              <Button size="medium" color="secondary" variant="outlined">
                CANCEL
              </Button>
            </>
          }
          footerAlign="center"
        >
          <div style={{ padding: '25px' }}>
            <p>
              This is inside a grid element with 2 columns and action footer
              aligned center
            </p>
          </div>
        </Box>
        <Box title="Box UI" titleBorder>
          <div style={{ padding: '25px' }}>
            <p>This element has no action footer buttons</p>
          </div>
        </Box>

        <Box>
          <div style={{ padding: '25px' }}>
            <p>this element are child elements only, no title and footer</p>
          </div>
        </Box>
      </Grid>
    </ProtectedContent>
  );
}
