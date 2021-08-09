import * as React from 'react';
import { Helmet } from 'react-helmet-async';
// import { Redirect } from 'react-router-dom';
import { DateTime } from 'luxon';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
// import H2 from 'app/components/Elements/H2';
import H3 from 'app/components/Elements/H3';
// import H5 from 'app/components/Elements/H5';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
// import A from 'app/components/Elements/A';
import Avatar from 'app/components/Elements/Avatar';
import Flex from 'app/components/Elements/Flex';
import Textarea from 'app/components/Elements/Textarea';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
// import Ratio from 'app/components/Elements/Ratio';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
// import IconButton from 'app/components/Elements/IconButton';
// import PinInput from 'app/components/Elements/PinInput';
import Card from 'app/components/Elements/Card/Card';
import VerifyOTP from 'app/components/VerifyOTP';

import Receipt from 'app/components/Receipt';

// From this folder
import Wrapper from './Wrapper';

// Framework
import Grid from '@material-ui/core/Grid';

import {
  validateEmail,
  regExMobile,
  regExIsGonnaBeEmail,
} from 'app/components/Helpers';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectValidateData,
  selectValidateError,
  selectValidateLoading,
  selectGenerateData,
  // selectGenerateError,
  selectGenerateLoading,
} from './slice/selectors';

export function SendMoney() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

  const validateError: any = useSelector(selectValidateError);
  const validateSuccess: any = useSelector(selectValidateData);
  const validateLoading = useSelector(selectValidateLoading);

  // const generateError: any = useSelector(selectGenerateError);
  const generateSuccess: any = useSelector(selectGenerateData);
  const generateLoading = useSelector(selectGenerateLoading);

  // console.log(success);
  const [validateApiMsg, setValidateApiMsg] = React.useState({
    msg: '',
    code: '',
    error: false,
  });

  // api related state
  // const [isError, setIsError] = React.useState(false);
  // const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [amount, setAmount] = React.useState({ value: '', error: false });
  const [message, setMessage] = React.useState({ value: '', error: false });

  const [isVerification, setIsVerification] = React.useState(false);
  const [isReview, setIsReview] = React.useState(false);
  const [resendOTPCode, setResendOTPCode] = React.useState(false);

  const [isEmail, setIsEmail] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    let anEmail = false;

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
      anEmail = true;
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
      const data = {
        email: anEmail ? email.value : undefined,
        mobile_number: !anEmail ? email.value : undefined,
        amount: parseFloat(amount.value),
        message: message.value,
      };

      // console.log(data);
      // dispatch payload to saga
      dispatch(actions.getValidateLoading(data));
      // setIsVerification(true);
    }
  };

  const generateOTP = () => {
    const otp_type = 'send_money';
    const getOTP = {
      otp_type: otp_type,
    };

    // dispatch payload to saga
    dispatch(actions.getGenerateLoading(getOTP));
    // enable code below to integrate api
  };

  const resendOTP = () => {
    setResendOTPCode(true);
    const otp_type = 'send_money';
    const getOTP = {
      otp_type: otp_type,
    };

    // dispatch payload to saga
    dispatch(actions.getGenerateLoading(getOTP));
    // enable code below to integrate api
  };

  const finalSend = () => {
    const data = {
      email: isEmail ? email.value : undefined,
      mobile_number: !isEmail ? email.value : undefined,
      amount: parseFloat(amount.value),
      message: message.value,
    };

    // dispatch payload to saga
    dispatch(actions.getFetchLoading(data));
    // enable code below to integrate api
  };

  const onCodeVerified = () => {
    finalSend();
  };

  // setIsReview(false);
  //   setIsVerification(false);

  // clicking the success dialog
  // const onClickSuccess = () => {
  //   history.replace('/'); // redirect to home
  // };
  // if validation passed, show the reenter pin
  // const onPinNext = () => {
  //   if (pin.value !== '' && pin.value.length === 4) {
  //     setIsVerification(false);
  //     setIsReview(true);
  //   } else {
  //     setPin({ ...pin, error: true });
  //   }
  // };

  // Add spoce every 4 digit
  // let format = (value: string) => {
  //   return value.toString().replace(/\d{4}(?=.)/g, '$& ');
  // };

  // Close the success dialog by click 'OK'
  const onCloseSuccessDialog = () => {
    setIsVerification(false);
    setIsSuccess(false);
    setEmail({ value: '', error: false, msg: '' });
    setAmount({ value: '', error: false });
    setMessage({ value: '', error: false });
    setValidateApiMsg({ msg: '', code: '', error: false });
    dispatch(actions.getFetchReset());
    dispatch(actions.getGenerateReset());
    dispatch(actions.getValidateReset());
  };

  // React.useEffect(() => {
  //   return () => {
  //     dispatch(actions.getFetchReset()); // reset store state on unmount
  //   };
  // }, []);

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
      dispatch(actions.getGenerateReset());
      dispatch(actions.getValidateReset());
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    // set error message based on error code from api

    if (validateError && Object.keys(validateError).length > 0) {
      if (validateError.code && validateError.code === 422) {
        if (validateError.errors && validateError.errors.error_code) {
          validateError.errors.error_code.forEach((i: any) => {
            if (i === 103) {
              setValidateApiMsg({
                msg: 'Recipient does not have a Squidpay account',
                code: '103',
                error: true,
              });
            }
            if (i === 301) {
              setValidateApiMsg({
                msg: 'Not allowed to send to your own account.',
                code: '301',
                error: true,
              });
            }
            if (i === 402) {
              setValidateApiMsg({
                msg: 'You do not have enough balance',
                code: '402',
                error: true,
              });
            }
            if (i === 404) {
              setValidateApiMsg({
                msg: 'Oops! User not found',
                code: '404',
                error: true,
              });
            }
            if (i === 405) {
              setValidateApiMsg({
                msg: 'Oh No! You have exceeded your monthly limit.',
                code: '405',
                error: true,
              });
            }
            if (i === 409) {
              setValidateApiMsg({
                msg: 'Receiver Transaction Limit reached.',
                code: '409',
                error: true,
              });
            }
          });
        }
      }
    }

    // First validation success
    if (validateSuccess) {
      setIsReview(true);
    }

    // Generate OTP Success
    if (generateSuccess) {
      setResendOTPCode(false);
      setIsReview(false);
      setIsVerification(true);
    }

    if (success) {
      setIsSuccess(true);
    }
  }, [validateError, validateSuccess, generateSuccess, error, success]);

  const date = DateTime.fromISO(success.transaction_date);
  const humanReadable = date.toLocaleString(DateTime.DATETIME_MED);

  const action = (
    <>
      <Flex justifyContent="space-between" alignItems="center">
        <div>
          <span style={{ color: '#A9B1B8' }}>
            {!isVerification && !isReview
              ? 'Please make sure that the information entered is correct.'
              : undefined}
          </span>
        </div>
        <Button
          type="submit"
          onClick={onSubmit}
          color="primary"
          size="large"
          variant="contained"
        >
          Next
        </Button>
      </Flex>
    </>
  );

  return (
    <>
      <ProtectedContent>
        <Helmet>
          <title>Send Money</title>
        </Helmet>

        <Wrapper>
          {validateLoading && <Loading position="absolute" />}
          {generateLoading && <Loading position="absolute" />}
          {loading && <Loading position="absolute" />}

          <Card
            title={
              isReview
                ? 'Review Send Money'
                : isVerification
                ? '4-Digit One Time PIN'
                : 'Send Money'
            }
            footer={!isVerification && !isReview ? action : undefined}
            // footer={!isReview ? action : undefined}
            size="medium"
          >
            {!isReview && !isVerification && (
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
                    error={
                      validateApiMsg.code === '103' ||
                      validateApiMsg.code === '301' ||
                      validateApiMsg.code === '404' ||
                      validateApiMsg.code === '405' ||
                      validateApiMsg.code === '409'
                        ? true
                        : undefined
                    }
                  />
                  {email.error && <ErrorMsg formError>* {email.msg}</ErrorMsg>}

                  {/* API Error Message */}
                  {validateApiMsg.code === '103' && !email.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}

                  {validateApiMsg.code === '301' && !email.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}

                  {validateApiMsg.code === '404' && !email.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}

                  {validateApiMsg.code === '405' && !email.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}

                  {validateApiMsg.code === '409' && !email.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}
                </Field>
                <Field>
                  <Label>Amount</Label>
                  <InputTextWrapper>
                    <Input
                      type="number"
                      min="1"
                      placeholder="0.00"
                      value={amount.value}
                      autoComplete="off"
                      onChange={e =>
                        setAmount({
                          value: e.currentTarget.value,
                          error: false,
                        })
                      }
                      error={validateApiMsg.code === '402' ? true : undefined}
                    />

                    <span>PHP</span>
                  </InputTextWrapper>
                  {amount.error && (
                    <ErrorMsg formError>* Invalid Amount</ErrorMsg>
                  )}

                  {/* API Error Message */}
                  {validateApiMsg.code === '402' && !amount.error && (
                    <ErrorMsg formError>{validateApiMsg.msg}</ErrorMsg>
                  )}
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
                        <div className="text-center">
                          <CircleIndicator size="large">
                            <FontAwesomeIcon icon="lock" />
                          </CircleIndicator>
                          <H1 className="text-center" margin="20px 0 8px">
                            Enter 4-digit One-Time PIN
                          </H1>

                          <p>
                            A One-Time PIN has been sent to your mobile number
                          </p>
                        </div>
                        {/* <PinInput
                        length={4}
                        onChange={p => setOTP({ value: p, error: false })}
                        value={otp.value}
                        isValid={!otp.error}
                      /> */}
                        <VerifyOTP
                          onSuccess={onCodeVerified}
                          apiURL="/auth/verify/otp"
                          otpType="send_money"
                          isUserToken
                        />

                        <Field className="text-center" margin="20px 0 10px">
                          Need a new code?{' '}
                          <button className="link" onClick={resendOTP}>
                            <span style={{ color: '#E0AC3B' }}>
                              Resend Code
                            </span>
                          </button>
                        </Field>
                      </Field>
                    </Flex>
                    {/* <p className="text-center">Please enter your pin code</p>
                  {otp.error && <ErrorMsg formError>* Error</ErrorMsg>}
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
                  <br /> */}
                  </Grid>
                </Grid>
              </div>
            )}

            {isReview && !resendOTPCode && (
              <>
                <div className="review-send-money">
                  <Grid container justify="center" spacing={3}>
                    <Grid item xs={12} md={8}>
                      <Avatar
                        image={validateSuccess.selfie_location}
                        size="large"
                      />
                      <p className="email">{validateSuccess.first_name}</p>
                      <p className="number">{email.value}</p>

                      <br />
                      <Grid container>
                        <Grid item xs={6} className="item">
                          <span className="name">Amount</span>
                        </Grid>
                        <Grid item xs={6} className="item">
                          <span className="value">
                            {' '}
                            PHP{' '}
                            {Number.isInteger(validateSuccess.amount)
                              ? validateSuccess.amount + '.00'
                              : validateSuccess.amount}
                          </span>
                        </Grid>
                        <Grid item xs={6} className="item">
                          <span className="name">Message</span>
                        </Grid>
                        <Grid item xs={6} className="item">
                          <span className="value">
                            {message.value ? message.value : '...'}
                          </span>
                        </Grid>
                      </Grid>
                      <br />
                      <br />
                      <p>Total amount</p>
                      <H3 className="total-amount">
                        PHP{' '}
                        {Number.isInteger(validateSuccess.amount)
                          ? validateSuccess.amount + '.00'
                          : validateSuccess.amount}
                      </H3>
                      <br />
                      <Button
                        type="submit"
                        onClick={generateOTP}
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

            {/* {apiErrorMsg && (
            <>
              <Dialog show={success} size="small">
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
            </>
          )} */}
            {/* <Dialog show={success} size="small">
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
          </Dialog> */}
            {/* fsdkjjgdlk */}

            <Dialog show={isSuccess} size="small">
              <Receipt
                title="Money successfully sent to"
                total={success.total_amount}
                onClick={onCloseSuccessDialog}
                date={humanReadable}
              >
                <Grid container>
                  <Grid item xs={6}>
                    <span className="description">Name</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="value">
                      {success.first_name} {success.last_name}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="description">
                      {isEmail ? 'Email address' : 'Mobile number'}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="value">
                      {isEmail ? success.email : success.mobile_number}
                    </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="description">Message </span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="value">{success.message}</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="description">Transaction Number</span>
                  </Grid>
                  <Grid item xs={6}>
                    <span className="value">{success.reference_number}</span>
                  </Grid>
                </Grid>
              </Receipt>
            </Dialog>
          </Card>
        </Wrapper>
      </ProtectedContent>
    </>
  );
}
