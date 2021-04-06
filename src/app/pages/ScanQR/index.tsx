import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Flex from 'app/components/Elements/Flex';
import Textarea from 'app/components/Elements/Textarea';
import Ratio from 'app/components/Elements/Ratio';

import Wrapper from './Wrapper';

import Card from 'app/components/Elements/Card/Card';

// get our fontawesome imports
import { faQrcode } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export function ScanQR() {
  const action = (
    <>
      <Flex justifyContent="flex-end">
        <Button type="submit" color="primary" size="large" variant="contained">
          <FontAwesomeIcon icon={faQrcode} className="mr-2" />
          Scan QR Code
        </Button>
        <Button
          type="submit"
          color="secondary"
          size="large"
          variant="outlined"
          className="ml-3"
        >
          <FontAwesomeIcon icon={faQrcode} className="mr-2" />
          Generate QR Code
        </Button>
      </Flex>
    </>
  );

  return (
    <>
      <Helmet>
        <title>Send Money</title>
      </Helmet>

      <Wrapper>
        <Card title="Send Money" footer={action} size="medium">
          <Ratio size="16x9">
            <img
              src="https://source.unsplash.com/random/120x120"
              alt="SquidPay"
              className="logo"
            />
          </Ratio>
        </Card>
      </Wrapper>
    </>
  );
}
