import * as React from 'react';

import Paragraph from 'app/components/Elements/Paragraph';
import Flex from 'app/components/Elements/Flex';

import { numberCommas } from 'app/components/Helpers';

import { ComponentProps } from './types';

export default function RenderReceipt({
  billerCode,
  data,
  formData,
}: ComponentProps) {
  const keys = formData ? Object.keys(formData) : [];

  return (
    <>
      {formData &&
        keys.length > 0 &&
        keys.map(k => {
          let val = formData[k].name || formData[k].value;
          if (formData[k].label.toLowerCase() === 'amount') {
            val = `PHP ${numberCommas(formData[k].value)}`;
          }
          if (formData[k].date) {
            val = formData[k].date;
          }
          return (
            <Flex key={k} style={{ width: '100%' }} wrap="wrap">
              <Paragraph>{formData[k].label}</Paragraph>
              <Paragraph align="right" padding="0 0 0 5px" style={{ flex: 1 }}>
                {val}
              </Paragraph>
            </Flex>
          );
        })}
      <Flex style={{ width: '100%' }} wrap="wrap">
        <Paragraph>Reference Number</Paragraph>
        <Paragraph align="right" padding="0 0 0 5px" style={{ flex: 1 }}>
          {data.reference_number || 'None'}
        </Paragraph>
      </Flex>
    </>
  );
}
