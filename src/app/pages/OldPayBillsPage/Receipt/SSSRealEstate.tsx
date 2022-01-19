import * as React from 'react';
import { DateTime } from 'luxon';

import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';

import { numberCommas } from 'app/components/Helpers';
import { ComponentProps } from './types';

export default function SSSRealEstate({ data }: ComponentProps) {
  return (
    <>
      <Flex style={{ width: '100%', marginTop: 32 }} wrap="wrap">
        <Paragraph size="small">Payment Reference Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.biller_reference_number || 'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Employer Name</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.employer_name ? data.employer_name : 'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Total Remittance Paid</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          PHP {numberCommas(data.amount) || '0.00'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Due Date</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.due_date
            ? DateTime.fromISO(data.due_date).toFormat('LL/dd/yyyy HH:mm')
            : 'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%', marginTop: 32 }} wrap="wrap">
        <Paragraph size="small">Transaction Reference Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.reference_number || 'None'}
        </Paragraph>
      </Flex>
    </>
  );
}
