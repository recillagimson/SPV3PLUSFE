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
  const [email, setEmail] = React.useState({ value: '', error: false });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [message, setMessage] = React.useState({ value: '', error: false });

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (email.value === '') {
      error = true;
      setEmail({ ...email, error: true });
    }
    if (amount.value === '') {
      error = true;
      setAmount({ ...amount, error: true });
    }

    if (message.value === '') {
      error = true;
      setMessage({ ...message, error: true });
    }

    if (!error) {
      const data = {
        email: email.value,
        amount: amount.value,
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
        <meta name="description" content="A Boilerplate application homepage" />
      </Helmet>

      <Wrapper>
        <Card title="Send Money" footer={action} size="small">
          <Field>
            <Label>Send to</Label>
            <Input
              type="text"
              placeholder="Email or Mobile No."
              value={email.value}
              autoComplete="off"
              onChange={e =>
                setEmail({ value: e.currentTarget.value, error: false })
              }
            />
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
            ></Textarea>
          </Field>
        </Card>
      </Wrapper>

      {/* <Wrapper>
        <Card>
          <div className="card-header">
            <h3>Send Money</h3>
          </div>

          <div className="card-body">
            <Field>
              <Label>Send to</Label>
              <Input type="text" placeholder="Email or Mobile No." />
            </Field>

            <Field>
              <Label>Amount</Label>
              <Input type="text" placeholder="0.00" />
            </Field>

            <Field>
              <Label>Description (Optional)</Label>
              <Input type="text" placeholder="Message" />
            </Field>

            <div className="button-right">
              <Button
                type="submit"
                color="primary"
                fullWidth={false}
                size="large"
                variant="contained"
              >
                SEND
              </Button>
            </div>
          </div>
        </Card>
      </Wrapper> */}
    </>
  );
}
