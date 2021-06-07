import * as React from 'react';
import styled from 'styled-components/macro';
import { useHistory } from 'react-router-dom';
import { StyleConstants } from 'styles/StyleConstants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';

type UserBirthDateProps = {
  birthDate: string;
};

export default function UserUpdateBirthDateComponent({
  birthDate,
}: UserBirthDateProps) {
  let bdate = '-';
  if (birthDate) {
    let bd = birthDate.split('-');
    bdate = `${bd[1]}/${bd[2]}/${bd[0]}`;
  }
  return (
    <Box title="Change Date of Birth" titleBorder>
      <div style={{ padding: '20px 25px' }}>
        <p>
          For account maintenance, send us a request at{' '}
          {'support|squid.ph'.replace('|', '@')}
        </p>
        <Field>
          <Label>Date of Birth</Label>
          <Input value={bdate} disabled />
        </Field>
      </div>
    </Box>
  );
}
