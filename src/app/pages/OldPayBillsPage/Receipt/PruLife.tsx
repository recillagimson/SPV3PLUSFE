import * as React from 'react';
import { DateTime } from 'luxon';

import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';

import { maskCharacters, numberCommas } from 'app/components/Helpers';
import { ComponentProps } from './types';

export default function PruLife({ data }: ComponentProps) {
  return (
    <>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Account Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {maskCharacters(data.account_number) || 'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Account Name</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.account_name || 'None'}
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
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Amount</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          PHP {numberCommas(data.amount) || '0.00'}
        </Paragraph>
      </Flex>
    </>
  );
}
