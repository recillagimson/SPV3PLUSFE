import * as React from 'react';

import Flex from 'app/components/Elements/Flex';
import Paragraph from 'app/components/Elements/Paragraph';

import { numberCommas } from 'app/components/Helpers';
import { ComponentProps } from './types';

export default function PagIbigFund({ data, formData }: ComponentProps) {
  return (
    <>
      <Flex style={{ width: '100%', marginTop: 32 }} wrap="wrap">
        <Paragraph size="small">Account Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {data.account_number || 'None'}
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
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Payment Type</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {formData['otherInfo.PaymentType'].name ||
            data.payment_type ||
            'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Bill Date</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {formData['otherInfo.BillDate'].value || data.payment_type || 'None'}
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
          {formData['otherInfo.DueDate'].value || data.payment_type || 'None'}
        </Paragraph>
      </Flex>
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph size="small">Contact Number</Paragraph>
        <Paragraph
          align="right"
          padding="0 0 0 5px"
          size="small"
          style={{ flex: 1 }}
        >
          {formData['otherInfo.ContactNo'].value ||
            data.contact_number ||
            'None'}
        </Paragraph>
      </Flex>
    </>
  );
}
