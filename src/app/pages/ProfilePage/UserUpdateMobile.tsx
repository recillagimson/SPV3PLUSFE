import * as React from 'react';

import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';

type UserInfoProps = {
  mobile: string;
};

export default function UserUpdateMobileComponent({ mobile }: UserInfoProps) {
  return (
    <Box title="Change Mobile Number" titleBorder>
      <div style={{ padding: '20px 25px' }}>
        <p>
          For account maintenance, send us a request at{' '}
          {'support|squid.ph'.replace('|', '@')}
        </p>
        <Field>
          <Label>Mobile Number</Label>
          <Input value={mobile} disabled />
        </Field>
      </div>
    </Box>
  );
}
