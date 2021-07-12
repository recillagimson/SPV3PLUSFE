import * as React from 'react';
// import styled from 'styled-components/macro';
// import { useHistory } from 'react-router-dom';
// import { StyleConstants } from 'styles/StyleConstants';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';

type UserInfoProps = {
  firstName: string;
  middleName: string;
  lastName: string;
};

export default function UserUpdateNameComponent({
  firstName,
  middleName,
  lastName,
}: UserInfoProps) {
  return (
    <Box title="Change Name" titleBorder>
      <div style={{ padding: '20px 25px' }}>
        <p>
          For account maintenance, send us a request at{' '}
          {'support|squid.ph'.replace('|', '@')}
        </p>
        <Field>
          <Label>First Name</Label>
          <Input value={firstName} disabled />
        </Field>
        <Field>
          <Label>Middle Name</Label>
          <Input value={middleName} disabled />
        </Field>
        <Field>
          <Label>Last Name</Label>
          <Input value={lastName} disabled />
        </Field>
      </div>
    </Box>
  );
}
