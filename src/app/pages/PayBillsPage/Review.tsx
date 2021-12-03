import * as React from 'react';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Paragraph from 'app/components/Elements/Paragraph';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';

import bayadLogo from 'app/components/Assets/paybills/bayad-partner.png';

import { numberCommas } from 'app/components/Helpers';

import { BillersState, ValidateSuccessResponse } from './slice/types';
import H5 from 'app/components/Elements/H5';

type ReviewProps = {
  biller: BillersState;
  details: {
    form: { [name: string]: { label: string; value: string } };
    validate: ValidateSuccessResponse;
    payload: { [name: string]: string };
  };
};

export default function Review({ biller, details }: ReviewProps) {
  const keys = details ? Object.keys(details.form) : [];

  return (
    <Box title="Review Payment" titleBorder withPadding>
      <Flex
        alignItems="center"
        justifyContent="flex-start"
        direction="column"
        style={{ maxWidth: 400, margin: '0 auto' }}
      >
        <CircleIndicator size="large" color="primary">
          {biller ? biller.name.charAt(0) : 'SP'}
        </CircleIndicator>
        <H3 margin="12px 0 40px">{biller ? biller.name : 'Biller Name'}</H3>
        {details &&
          keys.length > 0 &&
          keys.map(k => (
            <Flex key={k} style={{ width: '100%' }} wrap="wrap">
              <Paragraph>{details.form[k].label}</Paragraph>
              <Paragraph align="right" padding="0 0 0 5px" style={{ flex: 1 }}>
                {details.form[k].label.toLowerCase() === 'amount'
                  ? `PHP ${numberCommas(details.form[k].value)}`
                  : details.form[k].value}
              </Paragraph>
            </Flex>
          ))}
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          direction="column"
          style={{ marginTop: 50 }}
        >
          <Paragraph margin="0 0 3px">Total Amount</Paragraph>
          <H5 margin="0 0 2px">
            PHP {numberCommas(details.payload.amount || '0')}
          </H5>
          <Paragraph size="small" margin="0 0 2px">
            Service Fee: {numberCommas(details.validate.serviceFee || '0')}
          </Paragraph>
          <Paragraph size="small" margin="0 0 32px">
            Other Charges: {numberCommas(details.validate.otherCharges || '0')}
          </Paragraph>
          <img
            src={bayadLogo}
            alt="Bayad Partner"
            style={{
              width: 95,
              display: 'block',
              margin: '0 auto',
              padding: '0 0 16px',
            }}
          />

          <Button variant="contained" color="primary" size="large">
            Pay Bill
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
}
