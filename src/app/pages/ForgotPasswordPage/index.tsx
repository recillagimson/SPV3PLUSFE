/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Forgot Password Page
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Flex from 'app/components/Elements/Flex';

import Wrapper from 'app/components/Layouts/AuthWrapper';

import { validateEmail, validatePhone } from 'app/components/Helpers';

import VerifyOTP from 'app/components/VerifyOTP';
import UpdatePassword from 'app/components/UpdatePassword';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

export function ForgotPasswordPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const [subTitle, setSubTitle] = React.useState(
    'We got you! Let us know which contact detail should we use to reset your password',
  );
  const [showChoose, setShowChoose] = React.useState(true);
  const [showMobile, setShowMobile] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [showUpdate, setShowUpdate] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  const [email, setEmail] = React.useState({ value: '', error: false });
  const [mobile, setMobile] = React.useState({ value: '', error: false });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    // if we have successfully requested a code, show verify
    if (success) {
      setSubTitle(
        `The recovery code has been sent to your ${
          isEmail ? 'email address' : 'mobile number'
        }`,
      );
      setShowVerify(true);
      setShowEmail(false);
      setShowMobile(false);
      dispatch(actions.getFetchReset());
    }
  }, [success]);

  const onClickViaSms = () => {
    setShowChoose(false);
    setShowMobile(true);
    setIsEmail(false);
    setSubTitle(
      "Simply enter your mobile number associated with your account and we'll send you the code",
    );
  };

  const onClickEmail = () => {
    setShowChoose(false);
    setShowEmail(true);
    setIsEmail(true);
    setSubTitle(
      "Simply enter your email associated with your account and we'll send you the code",
    );
  };

  const onSuccessVerify = () => {
    setShowVerify(false);
    setShowUpdate(true);
  };

  const onSuccessUpdate = () => {
    setShowUpdate(false);
    setShowSuccess(true);
    setIsEmail(false);
    setSubTitle(
      "All set! You've successfully reset your password. Please try logging in again.",
    );
  };

  // submit
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;

    if (isEmail) {
      if (email.value === '') {
        error = true;
        setEmail({ ...email, error: true });
      }

      if (email.value !== '' && !validateEmail(email.value)) {
        error = true;
        setEmail({ ...email, error: true });
      }
    }

    if (!isEmail) {
      // validate as mobile number
      if (mobile.value !== '' && !/^0(9)/.test(mobile.value)) {
        error = true;
        setMobile({ ...mobile, error: true });
      }

      if (
        mobile.value !== '' &&
        /^0(9)/.test(mobile.value) &&
        !validatePhone(mobile.value)
      ) {
        error = true;
        setMobile({ ...mobile, error: true });
      }
    }

    if (!error) {
      const data = {
        mobile_number: !isEmail ? mobile.value : undefined,
        email: isEmail ? email.value : undefined,
      };
      console.log(data);
      // enable code below to integrate api
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onResendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // send the previous entered information if this is the approach for this
    // if (e && e.preventDefault) e.preventDefault();
    // const data = {
    //   mobile_number: !isEmail ? mobile.value : undefined,
    //   email: isEmail ? email.value : undefined,
    // };
    // dispatch(actions.getFetchLoading(data));

    // redirect user to choosing via sms or email code sending
    setShowChoose(true);
    setShowVerify(false);
    setShowEmail(false);
    setShowMobile(false);
    setIsEmail(false);
    setEmail({ value: '', error: false });
    setMobile({ value: '', error: false });
  };

  const gotoLogin = () => {
    setEmail({ value: '', error: false });
    setMobile({ value: '', error: false });
    window.location.replace('/');
  };

  return (
    <Wrapper>
      <Helmet title="Forgot Password" />
      <div className="form-container">
        {loading && <Loading position="absolute" />}

        <div className="text-center">
          <CircleIndicator size="large">
            <FontAwesomeIcon icon={showSuccess ? 'check' : 'lock'} />
          </CircleIndicator>
        </div>

        <H1 className="text-center" margin="20px 0 0">
          {showVerify
            ? 'Enter 4-Digit recovery code'
            : showSuccess
            ? 'Password reset successful'
            : 'Forgot Password?'}
        </H1>
        <p className="text-center">{subTitle}</p>
        {showChoose && (
          <div className="content">
            <Flex alignItems="center" justifyContent="center">
              <Button
                type="button"
                onClick={onClickViaSms}
                color="primary"
                fullWidth={true}
                size="large"
                variant="contained"
              >
                <FontAwesomeIcon icon="mobile" /> Via SMS
              </Button>
              <span
                style={{ textAlign: 'center', margin: '5px', minWidth: 30 }}
              >
                Or
              </span>
              <Button
                type="button"
                onClick={onClickEmail}
                color="primary"
                fullWidth={true}
                size="large"
                variant="contained"
              >
                <FontAwesomeIcon icon="envelope" /> Email
              </Button>
            </Flex>
          </div>
        )}
        {showMobile && (
          <div className="content">
            <Field>
              <Label>Mobile Number</Label>
              <Input
                type="text"
                value={mobile.value}
                onChange={e =>
                  setMobile({ value: e.currentTarget.value, error: false })
                }
                placeholder="09xxxxxxxxx"
              />
              {mobile.error && (
                <ErrorMsg formError>
                  * Please enter your mobile (ie: 09xxxxxxxxx)
                </ErrorMsg>
              )}
            </Field>
            {error && Object.keys(error).length > 0 && (
              <ErrorMsg formError>
                *{' '}
                {error.code && error.code === 422
                  ? error.errors.account.join(' ')
                  : error.message}
              </ErrorMsg>
            )}
            <Button
              type="submit"
              onClick={onSubmit}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              SEND
            </Button>
          </div>
        )}
        {showEmail && (
          <div className="content">
            <Field>
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email.value}
                onChange={e =>
                  setEmail({ value: e.currentTarget.value, error: false })
                }
                placeholder="Email address"
              />
              {email.error && (
                <ErrorMsg formError>
                  * Please enter your email address and in valid format
                </ErrorMsg>
              )}
            </Field>
            {error && Object.keys(error).length > 0 && (
              <ErrorMsg formError>
                *{' '}
                {error.code && error.code === 422
                  ? error.errors.account.join(' ')
                  : error.message}
              </ErrorMsg>
            )}
            <Button
              type="submit"
              onClick={onSubmit}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              SEND
            </Button>
          </div>
        )}
        {showVerify && (
          <div className="content">
            <VerifyOTP
              mount={showVerify}
              onSuccess={onSuccessVerify}
              isEmail={isEmail}
              viaValue={isEmail ? email.value : mobile.value}
            />

            <Field className="text-center" margin="20px 0 10px">
              Need a new code?{' '}
              <button className="link" onClick={onResendCode}>
                Resend Code
              </button>
            </Field>
          </div>
        )}
        {showUpdate && (
          <div className="content">
            <UpdatePassword
              mount={showUpdate}
              onSuccess={onSuccessUpdate}
              isEmail={isEmail}
              viaValue={isEmail ? email.value : mobile.value}
            />
          </div>
        )}
        {showSuccess && (
          <div className="content">
            <Button
              type="button"
              onClick={gotoLogin}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              LOGIN
            </Button>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
