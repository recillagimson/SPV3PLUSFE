import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import H2 from 'app/components/Elements/H2';
import H3 from 'app/components/Elements/H3';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import A from 'app/components/Elements/A';
import Avatar from 'app/components/Elements/Avatar';
import Flex from 'app/components/Elements/Flex';
import Textarea from 'app/components/Elements/Textarea';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Ratio from 'app/components/Elements/Ratio';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';
import PinInput from 'app/components/Elements/PinInput';
import Card from 'app/components/Elements/Card/Card';

// From this folder
import Wrapper from './Wrapper';

// Framework
import Grid from '@material-ui/core/Grid';

import {
  validateEmail,
  regExMobile,
  regExIsGonnaBeEmail,
} from 'app/components/Helpers';

export function SendMoney() {
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [message, setMessage] = React.useState({ value: '', error: false });
  const [pin, setPin] = React.useState({ value: '', error: false });

  const [isVerification, setIsVerification] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);

  const [isEmail, setIsEmail] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    // first check if field is not empty
    if (email.value === '') {
      error = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Please enter your email/mobile number',
      });
    }

    // check if field is not empty and we are typing in an email format
    if (
      email.value !== '' && // check if not empty
      (!/\d/g.test(email.value) || regExIsGonnaBeEmail.test(email.value)) && // check if we are typing into an email format ie: asb@
      !validateEmail(email.value) // check if what we type is a valid email format ie: email@example.com
    ) {
      // set error message we didn't pass email validation
      error = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Please enter your email in valid format ie: email@example.com',
      });
    }

    // check if value is not empty
    if (
      email.value !== '' && // check if not empty
      !regExIsGonnaBeEmail.test(email.value) && // check if we are not typing into an email format
      !validateEmail(email.value) && // validate if it's not valid email
      /\d/g.test(email.value) // check if we started with a digit
    ) {
      // we have typed a digit and did not pass the email validation
      // now check if it's in valid mobile format ie: 09 + 9 digit number
      if (!regExMobile.test(email.value)) {
        error = true;
        setEmail({
          ...email,
          error: true,
          msg:
            'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
        });
      }
    }

    // if we pass the validation above, set if we are going to pass an email or mobile
    if (email.value !== '' && validateEmail(email.value)) {
      // anEmail = true;
      setIsEmail(true);
    } else if (email.value !== '' && regExMobile.test(email.value)) {
      setIsEmail(false);
    }

    // Check amount if it's valid
    if (amount.value === '') {
      error = true;
      setAmount({ ...amount, error: true });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      error = true;
      setAmount({ ...amount, error: true });
    }

    if (!error) {
      setIsVerification(true);
    }
  };

  const onSendMoney = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    setIsSuccess(true);

    const data = {
      email: isEmail ? email.value : undefined,
      mobile_number: !isEmail ? email.value : undefined,
      amount: parseFloat(amount.value),
      message: message.value,
    };
    console.log(data);
    // enable code below to integrate api
    // dispatch(actions.getFetchLoading(data));
  };

  // if validation passed, show the reenter pin
  const onPinNext = () => {
    if (pin.value !== '' && pin.value.length === 4) {
      setIsVerification(false);
      setIsReview(true);
    } else {
      setPin({ ...pin, error: true });
    }
  };

  // Replace the first 7 digit of mobile number in the review send money
  let replaceFirst7 = (mobile: string) => {
    return mobile.replace(/^.{1,7}/, m => '*'.repeat(m.length));
  };

  // Add spoce every 4 digit
  let format = (value: string) => {
    return value.toString().replace(/\d{4}(?=.)/g, '$& ');
  };

  // Close the success dialog by click 'OK'
  const onCloseSuccessDialog = () => {
    setIsSuccess(false);
    setIsReview(false);
    setEmail({ value: '', error: false, msg: '' });
    setAmount({ value: '', error: false });
    setPin({ value: '', error: false });
    setMessage({ value: '', error: false });
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
        <Card
          title={
            isVerification
              ? 'PIN Code'
              : isReview
              ? 'Review Send Money'
              : 'Send Money'
          }
          footer={!isVerification && !isReview ? action : undefined}
          size="medium"
        >
          {!isVerification && !isReview && (
            <>
              <Field>
                <Label>Send to</Label>
                <Input
                  type="text"
                  placeholder="Email or Mobile No."
                  value={email.value}
                  autoComplete="off"
                  onChange={e =>
                    setEmail({
                      value: e.currentTarget.value,
                      error: false,
                      msg: '',
                    })
                  }
                />
                {email.error && <ErrorMsg formError>* {email.msg}</ErrorMsg>}
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
                {amount.error && (
                  <ErrorMsg formError>* Invalid Amount</ErrorMsg>
                )}
                <small>
                  Your daily limit is 20,000 PHP and monthly limit is 100,000
                  PHP
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
            </>
          )}

          {isVerification && (
            <div className="verification">
              <Grid container justify="center">
                <Grid item md={8}>
                  <Flex justifyContent="center">
                    <Field>
                      <PinInput
                        length={4}
                        onChange={p => setPin({ value: p, error: false })}
                        value={pin.value}
                        isValid={!pin.error}
                      />
                    </Field>
                  </Flex>
                  <p className="text-center">Please enter your pin code</p>
                  {pin.error && <ErrorMsg formError>* Error</ErrorMsg>}
                  <Button
                    type="button"
                    onClick={onPinNext}
                    color="primary"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    Next
                  </Button>
                  <br />
                  <br />
                  <small className="text-center">Forgot your pin code?</small>
                  <br />
                </Grid>
              </Grid>
            </div>
          )}

          {isReview && (
            <>
              <div className="review-load">
                <Grid container justify="center" spacing={3}>
                  <Grid item xs={12} md={8}>
                    <Avatar
                      image="https://source.unsplash.com/random/120x120"
                      size="medium"
                    />
                    <p className="email">heywassup@gmail.com</p>
                    <p className="number">{replaceFirst7(email.value)}</p>

                    <br />
                    <Grid container>
                      <Grid item xs={6} className="item">
                        <span className="name">Amount</span>
                      </Grid>
                      <Grid item xs={6} className="item">
                        <span className="value"> PHP {amount.value}.00</span>
                      </Grid>
                      {/* <Grid item xs={6} className="item">
                        <span className="name">Service Fee</span>
                      </Grid>
                      <Grid item xs={6} className="item">
                        <span className="value"> PHP 0.00</span>
                      </Grid> */}
                      <Grid item xs={6} className="item">
                        <span className="name">Purpose</span>
                      </Grid>
                      <Grid item xs={6} className="item">
                        <span className="value"> Fund Transfer</span>
                      </Grid>
                    </Grid>
                    <br />
                    <br />
                    <p>Total amount plus service fee</p>
                    <H3 className="total-amount">PHP {amount.value}.00</H3>
                    <br />
                    <Button
                      type="submit"
                      onClick={onSendMoney}
                      color="primary"
                      size="large"
                      variant="contained"
                      fullWidth={true}
                      className="mb-3"
                    >
                      SEND MONEY
                    </Button>
                  </Grid>
                </Grid>
              </div>
            </>
          )}

          <Dialog show={isSuccess} size="small">
            <div className="text-center">
              <CircleIndicator size="medium" color="primary">
                <FontAwesomeIcon icon="check" />
              </CircleIndicator>
              <H3 margin="15px 0 10px">Success</H3>

              <Button
                fullWidth
                onClick={onCloseSuccessDialog}
                variant="outlined"
                color="secondary"
              >
                Ok
              </Button>
            </div>
          </Dialog>
        </Card>
      </Wrapper>
    </>
  );
}
