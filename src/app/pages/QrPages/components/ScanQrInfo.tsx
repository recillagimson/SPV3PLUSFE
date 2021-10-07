import React from 'react';
import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';
import { numberCommas, maskMobileNumber } from 'app/components/Helpers';
import Grid from '@material-ui/core/Grid';

type Props = {
  scanQrResponse: {
    mobile_number: string;
    amount: string;
    message: string;
    first_name: string;
    last_name: string;
    middle_name: string;
    name_extension: string;
    selfie_location: string;
    user_account_id: string;
  };
};

export default function ScanQrInfo({ scanQrResponse }: Props) {
  const { first_name, last_name, mobile_number, amount } = scanQrResponse;
  return (
    <Flex direction="column" alignItems="center">
      <Flex
        direction="row"
        justifyContent="center"
        style={{ width: '100%', marginBlockEnd: '72px' }}
      >
        <Flex direction="column">
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            {first_name} {last_name}
          </Paragraph>
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            {maskMobileNumber(mobile_number)}
          </Paragraph>
        </Flex>
      </Flex>
      <Grid
        container
        justify="center"
        style={{ marginBlockEnd: '48px', width: '473px', maxWidth: '473px' }}
      >
        <Grid item md={3} justify="flex-start">
          <Flex direction="column" alignItems="flex-start">
            {amount && <span> Amount</span>}
          </Flex>
        </Grid>
        <Grid item md={2} />
        <Grid item md={7}>
          <Flex direction="column" alignItems="flex-end">
            {amount && (
              <span> PHP {amount !== '' ? numberCommas(amount) : 0}</span>
            )}
          </Flex>
        </Grid>
      </Grid>
      <Flex
        direction="row"
        justifyContent="center"
        style={{ width: '100%', marginBlockStart: '90px' }}
      >
        <Flex direction="column">
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            Total Amount
          </Paragraph>
          <Paragraph align="center" weight="light" style={{ width: '100%' }}>
            <span> PHP {amount !== '' ? numberCommas(amount) : 0}</span>
          </Paragraph>
        </Flex>
      </Flex>
    </Flex>
  );
}
