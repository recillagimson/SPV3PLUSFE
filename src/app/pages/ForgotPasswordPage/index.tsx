/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactCodeInput from 'react-code-input';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Flex from 'app/components/Elements/Flex';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

// pin styles
import PinInputStyle from 'app/components/Elements/PinInput';

import { validateEmail, validatePhone } from 'app/components/Helpers';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectVerifyLoading,
  selectVerifyError,
  selectVerifyData,
} from './slice/selectors';

export function ForgotPasswordPage() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const verifyLoading = useSelector(selectVerifyLoading);
  const verifyError: any = useSelector(selectVerifyError);
  const verifySuccess = useSelector(selectVerifyData);

  const [subTitle, setSubTitle] = React.useState(
    'We got you! Let us know which contact detail should we use to reset your password',
  );
  const [showMobile, setShowMobile] = React.useState(false);
  const [showEmail, setShowEmail] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);

  const [isCodeValid, setIsCodeValid] = React.useState(true); // set to true

  const [email, setEmail] = React.useState({ value: '', error: false });
  const [mobile, setMobile] = React.useState({ value: '', error: false });
  const [code, setCode] = React.useState({ value: '', error: false });

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
    }
  }, [success]);

  React.useEffect(() => {
    if (verifyError && Object.keys(verifyError).length > 0) {
      setIsCodeValid(false);
    }
  }, [verifyError]);

  const onClickViaSms = () => {
    setShowMobile(true);
    setIsEmail(false);
    setSubTitle(
      "Simply enter your mobile number associated with your account and we'll send you the code",
    );
  };

  const onClickEmail = () => {
    setShowEmail(true);
    setIsEmail(true);
    setSubTitle(
      "Simply enter your email associated with your account and we'll send you the code",
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
    if (e && e.preventDefault) e.preventDefault();
    const data = {
      mobile_number: !isEmail ? mobile.value : undefined,
      email: isEmail ? email.value : undefined,
    };
    dispatch(actions.getFetchLoading(data));
  };

  const onChangePin = (val: any) => {
    console.log(val);
    setCode({ value: val, error: false });
  };

  const onSubmitVerify = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();
    let error = false;

    if (!error) {
      const data = {
        code_type: 'password_recovery',
        mobile_number: !isEmail ? mobile.value : undefined,
        email: isEmail ? email.value : undefined,
        code: isEmail ? code.value : undefined,
      };
      dispatch(actions.getVerifyLoading(data));
    }
  };

  const onClickVerifySuccess = () => {
    dispatch(actions.getFetchReset());
    dispatch(actions.getVerifyReset());
  };

  return (
    <Wrapper>
      <Helmet title="Forgot Password" />
      <div className="form-container">
        {loading && <Loading position="absolute" />}
        {verifyLoading && <Loading position="absolute" />}

        <div className="text-center">
          <CircleIndicator size="large">
            <FontAwesomeIcon icon="lock" />
          </CircleIndicator>
        </div>

        <H1 className="text-center" margin="20px 0 0">
          {showVerify ? 'Enter 4-Digit recovery code' : 'Forgot Password?'}
        </H1>
        <p className="text-center">{subTitle}</p>
        {!showVerify && !showMobile && !showEmail && (
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
            <Field className="code">
              <ReactCodeInput
                name="verify"
                inputMode="numeric"
                type="text"
                fields={4}
                onChange={onChangePin}
                className="pin-input"
                isValid={isCodeValid}
              />
              {email.error && (
                <ErrorMsg formError>
                  * Please enter your email address and in valid format
                </ErrorMsg>
              )}
            </Field>
            {verifyError && Object.keys(verifyError).length > 0 && (
              <ErrorMsg formError>
                *{' '}
                {verifyError.code && verifyError.code === 422
                  ? verifyError.errors.code.join(' ')
                  : verifyError.message}
              </ErrorMsg>
            )}

            <Button
              type="submit"
              onClick={onSubmitVerify}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              VERIFY
            </Button>

            <Field className="text-center" margin="20px 0 10px">
              Need a new code?{' '}
              <button className="link" onClick={onResendCode}>
                Resend Code
              </button>
            </Field>
          </div>
        )}
      </div>

      <Dialog
        show={verifySuccess}
        onClick={onClickVerifySuccess}
        okText="OK"
        message="You have successfully registered your account. Click OK to go to the Login Page."
        title="REGISTRATION SUCCESS"
      />
    </Wrapper>
  );
}
