import * as React from 'react';

import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';

import { maskCharacters, numberCommas } from 'app/components/Helpers';
import { ComponentProps } from './types';

export default function Meralco({ data }: ComponentProps) {
  return (
    <>
      <Flex style={{ width: '100%', marginTop: 32 }} wrap="wrap">
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
        <Paragraph size="small">Customer Account Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {maskCharacters(data.account_number) ||
            maskCharacters(data.accountNumber) ||
            'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Reference Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.reference_number || 'None'}
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
