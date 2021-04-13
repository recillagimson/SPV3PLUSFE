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

import Wrapper from './Wrapper';

import Card from 'app/components/Elements/Card/Card';

export function SendMoney() {
  const [mobile, setMobile] = React.useState({ value: '', error: false });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [message, setMessage] = React.useState({ value: '', error: false });

  // Error Message
  const [errorMobile, setShowErrorMobile] = React.useState(false);
  const [errorEmail, setShowErrorEmail] = React.useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (mobile.value === '') {
      error = true;
      setMobile({ ...mobile, error: true });
    }
    // if (parseFloat(amount.value) <= 0) {
    //   error = true;
    //   setAmount({ ...amount, error: true });
    // }

    // if (message.value === '') {
    //   error = true;
    //   setMessage({ ...message, error: true });
    // }

    if (!error) {
      const data = {
        mobile: mobile.value,
        amount: parseFloat(amount.value),
        message: message.value,
      };
      console.log(data);
      // enable code below to integrate api
      // dispatch(actions.getFetchLoading(data));
    }
  };

  const action = (
    <>
      <Flex justifyContent="flex-end">
        <Button
          type="submit"
          onClick={onSubmit}
          color="primary"
          size="large"
          variant="contained"
        >
          SEND
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
        <Card title="Send Money" footer={action} size="small">
          <Field>
            <Label>Send to</Label>
            <Input
              type="text"
              placeholder="Email or Mobile No."
              value={mobile.value}
              autoComplete="off"
              onChange={e =>
                setMobile({ value: e.currentTarget.value, error: false })
              }
            />
            {mobile.error && <ErrorMsg formError>* Invalid Amount</ErrorMsg>}
          </Field>
          <Field>
            <Label>Amount</Label>
            <Input
              type="number"
              min="1"
              placeholder="0.00"
              value={amount.value}
              autoComplete="off"
              onChange={e =>
                setAmount({ value: e.currentTarget.value, error: false })
              }
            />
            <small>
              Your daily limit is 20,000 PHP and monthly limit is 100,000 PHP
            </small>
          </Field>

          <Field>
            <Label>Message (Optional)</Label>
            <Textarea
              value={message.value}
              autoComplete="off"
              onChange={e =>
                setMessage({ value: e.currentTarget.value, error: false })
              }
              maxLength={64}
            ></Textarea>
            <small>{message.value.length}/64</small>
          </Field>
        </Card>
      </Wrapper>
    </>
  );
}
