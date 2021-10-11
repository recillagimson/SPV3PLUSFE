import * as React from 'react';

import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import { IconExclamation } from 'app/components/Icons';
import H3 from 'app/components/Elements/H3';
import Paragraph from 'app/components/Elements/Paragraph';

type UserInfoProps = {
  mobile: string;
};

export default function UserUpdateMobileComponent({ mobile }: UserInfoProps) {
  const [showMessage, setShowMessage] = React.useState(false);

  return (
    <>
      <Box
        title="Change Mobile Number"
        titleBorder
        footer={
          <Button
            color="primary"
            variant="contained"
            onClick={() => setShowMessage(true)}
            size="large"
          >
            Send Request
          </Button>
        }
        footerAlign="right"
      >
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
      <Dialog show={showMessage} size="small">
        <div className="text-center" style={{ padding: '40px 20px 30px' }}>
          <CircleIndicator size="large" color="primary">
            <IconExclamation />
          </CircleIndicator>
          <H3 margin="30px 0 10px" align="center">
            Update your Mobile Number
          </H3>
          <Paragraph align="center" margin="0 0 35px">
            Hi Squidee! Updating your mobile number requires you to send us an
            email for us to evaluate your request. If you wish to proceed, you
            will receive feedback within the next 24-48 hours.
          </Paragraph>
          <Button
            fullWidth
            onClick={() => {
              setShowMessage(false);
              window.open(
                `mailto:${'support|squid.ph'.replace('|', '@')}`,
                'sendEmail',
              );
            }}
            variant="contained"
            color="primary"
            size="large"
          >
            Send Email
          </Button>
        </div>
      </Dialog>
    </>
  );
}
