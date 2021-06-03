import * as React from 'react';

import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';

type UserInfoProps = {
  email: string;
};

export default function UserUpdateEmailComponent({ email }: UserInfoProps) {
  return (
    <Box title="Change Email Address" titleBorder>
      <div style={{ padding: '20px 25px' }}>
        <p>
          For account maintenance, send us a request at{' '}
          {'support|squid.ph'.replace('|', '@')}
        </p>
        <Field>
          <Label>Email Addres</Label>
          <Input value={email} disabled />
        </Field>
      </div>
    </Box>
  );
}
