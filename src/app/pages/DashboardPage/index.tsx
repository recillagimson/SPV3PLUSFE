import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import IconButton from 'app/components/Elements/IconButton';
import Grid from 'app/components/Elements/Grid';

import Balance from './Balance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function DashboardPage() {
  const sampleButtons = (
    <>
      <Button color="secondary" size="medium">
        CANCEL
      </Button>
      <Button color="primary" size="medium">
        SEND
      </Button>
    </>
  );
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>

      <Grid columns="40% 60%" gap="30px">
        <Box
          title="Squid Balance"
          footerBorder
          footer={sampleButtons}
          footerAlign="right"
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
          footerBorder
          footer={sampleButtons}
          footerAlign="center"
        >
          <p>PHP 10,000.00</p>
          <p>PHP 10,000.00</p>
          <p>PHP 10,000.00</p>
          <p>PHP 10,000.00</p>
          <p>PHP 10,000.00</p>
          <p>PHP 10,000.00</p>
        </Box>
      </Grid>
    </>
  );
}
