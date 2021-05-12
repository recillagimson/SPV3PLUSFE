/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Logo from 'app/components/Assets/Logo';
import H3 from 'app/components/Elements/H3';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import VerifyOTP from 'app/components/VerifyOTP';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import Wrapper from 'app/components/Layouts/AuthWrapper';
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
  selectResendCodeLoading,
  selectResendCodeError,
  selectResendCodeData,
} from './slice/selectors';

export function LoginPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

  const resendLoading = useSelector(selectResendCodeLoading);
  const resendError: any = useSelector(selectResendCodeError);
  const resendSuccess = useSelector(selectResendCodeData);

  // api related error
  const [isError, setIsError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  // show resend
  const [resendDialog, setResendDialog] = React.useState(false);

  // login, show verification and success
  const [showLogin, setShowLogin] = React.useState(true);
  const [toVerify, setToVerify] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false); // use to show the success message after activation

  // fields related states
  const [showPass, setShowPass] = React.useState(false);
  const [isEmail, setIsEmail] = React.useState(false);
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [password, setPassword] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
    };
  }, []);

  React.useEffect(() => {
    // set error message based on error code from api
    let apiError: string | undefined;
    if (error && Object.keys(error).length > 0) {
      if (error.code && error.code === 422) {
        if (error.errors && error.errors.error_code) {
          error.errors.error_code.find(i => i === 101);
          apiError = error.errors.error_code.map((i: any) => {
            if (i === 101 || i === 103 || i === 113) {
              return isEmail
                ? 'Email and password is invalid. Please try again.'
                : 'Mobile number and password is invalid. Please try again.';
            }
            if (i === 102) {
              setToVerify(true);
              return 'Your login account is not yet verified. Click OK to Verify your Account.';
            }
            if (i === 104) {
              return 'You are attempting to login from an untrusted client. Please check your internet connection';
            }
            if (i === 105) {
              return 'Your Account has been locked, Please contact Squidpay Support for assistance in unlocking your account.';
            }
            return undefined;
          });
        }
        if (error.errors && !error.errors.error_code) {
          if (error.errors.password && error.errors.password.length > 0) {
            apiError += error.errors.password.join('\n');
          }

          if (error.errors.email && error.errors.email.length > 0) {
            apiError += error.errors.email.join('\n');
          }
          if (
            error.errors.mobile_number &&
            error.errors.mobile_number.length > 0
          ) {
            apiError += error.errors.mobile_number.join('\n');
          }
        }

        setApiErrorMsg(apiError || '');
        setIsError(true);
      }

      if (error.code && error.code !== 422) {
        apiError = error.response.statusText;
        setApiErrorMsg(apiError || '');
        setIsError(true);
      }
      if (!error.response && (!error.code || error.code !== 422)) {
        apiError = error.message;
        setApiErrorMsg(apiError || '');
        setIsError(true);
      }
    }

    if (resendError && Object.keys(resendError).length > 0) {
      setResendDialog(true);
    }
  }, [error, resendError]);

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
      // set error message we did't pass email validation
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

    if (password.value === '') {
      error = true;
      setPassword({
        ...password,
        error: true,
        msg: 'Please enter your password.',
      });
    }

    if (!error) {
      const data = {
        email: anEmail ? email.value : undefined,
        mobile_number: !anEmail ? email.value : undefined,
        password: password.value,
      };

      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onCloseDialog = () => {
    setIsError(false);
    setApiErrorMsg('');
    dispatch(actions.getFetchReset());

    if (toVerify) {
      setShowLogin(false);
      setShowVerify(true);
    }
  };

  const onResendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // since we already have the login information, send the user email or mobile number to receive activation code
    const data = {
      email: isEmail ? email.value : undefined,
      mobile_number: !isEmail ? email.value : undefined,
      otp_type: 'registration',
    };

    dispatch(actions.getResendCodeLoading(data));
  };

  const onSuccessVerify = () => {
    setToVerify(false);
    setShowVerify(false);
    setShowSuccess(true);
  };

  const onClickSuccess = () => {
    // reset the previous user input and show the login form
    setShowPass(false);
    setIsEmail(false);
    setEmail({
      value: '',
      error: false,
      msg: '',
    });
    setPassword({
      value: '',
      error: false,
      msg: '',
    });
    setShowSuccess(false);
    setShowLogin(true);
  };

  const onSuccessResendCode = () => {
    dispatch(actions.getResendCodeReset());
  };

  if (success && Object.keys(success).length > 0) {
    return <Redirect to={success.redirect} />;
  }

  let resendErrorMsg =
    'We are encountering a problem behind our server. Please bear with use and try again later.';
  if (resendError && Object.keys(resendError).length > 0) {
    if (resendError.errors && resendError.errors.error_code) {
      resendErrorMsg = resendError.errors.error_code.map(i =>
        i === 103
          ? `The ${
              isEmail ? 'email' : 'mobile number'
            } you have entered doesn't exists. Please try again.`
          : 'We are encountering a problem behind our server. Please bear with use and try again later.',
      );
    }
  }

  return (
    <Wrapper>
      <Helmet title="Login" />
      <div className="form-container">
        {loading && <Loading position="fixed" />}
        {resendLoading && <Loading position="fixed" />}
        {/* <H1 margin="0 0 5px">We're glad you're back!</H1>
        <Label>Login to manage your account.</Label> */}
        <Logo size="medium" />

        {showLogin && (
          <form>
            <Field>
              <Label>
                Email or Mobile No. <i>*</i>
              </Label>
              <Input
                required
                type="text"
                value={email.value}
                onChange={e =>
                  setEmail({
                    value: e.currentTarget.value,
                    error: false,
                    msg: '',
                  })
                }
                placeholder="Email or Mobile No."
                className={email.error ? 'error' : undefined}
              />
              {email.error && <ErrorMsg formError>{email.msg}</ErrorMsg>}
            </Field>
            <Field>
              <Label>
                Password <i>*</i>
              </Label>
              <InputIconWrapper>
                <Input
                  type={showPass ? 'text' : 'password'}
                  value={password.value}
                  placeholder="Password"
                  required
                  onChange={e =>
                    setPassword({
                      value: e.currentTarget.value,
                      error: false,
                      msg: '',
                    })
                  }
                  className={password.error ? 'error' : undefined}
                />
                <IconButton
                  type="button"
                  onClick={() => setShowPass(prev => !prev)}
                >
                  <FontAwesomeIcon icon={showPass ? 'eye-slash' : 'eye'} />
                </IconButton>
              </InputIconWrapper>

              {password.error && <ErrorMsg formError>{password.msg}</ErrorMsg>}
            </Field>

            <Button
              type="submit"
              onClick={onSubmit}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              LOGIN
            </Button>
            <Field className="text-center" margin="10px 0 0">
              <A to="/forgotpassword">Forgot Password?</A>
            </Field>

            <Field className="text-center f-small" margin="30px 0 0">
              Not yet a member?{' '}
              <A to="/register" underline="true">
                Sign up
              </A>
            </Field>
          </form>
        )}
        {showVerify && (
          <div className="text-center">
            <H3 margin="35px 0 10px">Account Activation</H3>
            <p className="f-small">
              Check your mobile or email for the activation code
            </p>

            <VerifyOTP
              onSuccess={onSuccessVerify}
              isEmail={isEmail}
              viaValue={email.value}
              apiURL="/auth/verify/account"
            />

            <Field className="text-center f-small" margin="20px 0 10px">
              Need a new code?{' '}
              <button className="link" onClick={onResendCode}>
                Resend Code
              </button>
            </Field>
          </div>
        )}
        {showSuccess && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <CircleIndicator size="large">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H3 margin="25px 0 25px">
              You've successfully activated your account.
            </H3>

            <Button
              type="button"
              onClick={onClickSuccess}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Login
            </Button>
          </div>
        )}
      </div>

      {/* Show login errors */}
      <Dialog show={isError} size="small">
        <div className="text-center" style={{ padding: '20px 30px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Login Error</H3>
          <p>{apiErrorMsg}</p>
          <Button
            fullWidth
            onClick={onCloseDialog}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      <Dialog show={resendSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 30px' }}>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Activation Code Sent</H3>
          <p>
            We have sent the code. Please check your{' '}
            {isEmail ? `email ${email.value}` : `mobile number ${email.value}`}{' '}
            for the activation code.
          </p>
          <Button
            fullWidth
            onClick={onSuccessResendCode}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      {/* show resend code error */}
      <Dialog show={resendDialog} size="small">
        <div className="text-center" style={{ padding: '20px 30px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Activation Code Resend Error</H3>
          <p>{resendErrorMsg}</p>
          <Button
            fullWidth
            onClick={() => {
              setResendDialog(false);
              dispatch(actions.getResendCodeReset());
            }}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </Wrapper>
  );
}
