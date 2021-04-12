/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import H3 from 'app/components/Elements/H3';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import Wrapper from 'app/components/Layouts/AuthWrapper';
import { validateEmail } from 'app/components/Helpers';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';

export function LoginPage() {
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const [isError, setIsError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');
  const [email, setEmail] = React.useState({ value: '', error: false });
  const [password, setPassword] = React.useState({
    value: '',
    error: false,
    isWeak: false,
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
          apiError = error.errors.error_code.map((i: any) => {
            if (i === 101 || i === 103) {
              return 'Email or Mobile number and password is invalid. Please try again.';
            }
            if (i === 102) {
              return 'Your login account is not yet verified. Please check your email/mobile number for verification process.';
            }
            if (i === 104) {
              return 'You are attempting to login from an untrusted client. Please check your internet connection';
            }
            if (i === 105) {
              return 'Too many failed login attempts. This device is temporarily blocked. Please try again later.';
            }
            return undefined;
          });
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
  }, [error]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    let isEmail = false;

    if (email.value === '') {
      error = true;
      setEmail({ ...email, error: true });
    }

    // if (email.value !== '' && !validateEmail(email.value)) {
    //   error = true;
    //   setEmail({ ...email, error: true });
    // }

    if (email.value !== '' && validateEmail(email.value)) {
      isEmail = true;
    }

    if (password.value === '') {
      error = true;
      setPassword({ ...password, error: true });
    }

    // enable if we need to verify password rules in login
    // if (password.value !== '' && !regExStrongPassword.test(password.value)) {
    //   error = true;
    //   setPassword({ ...password, error: false, isWeak: true });
    // }

    if (!error) {
      const data = {
        email: isEmail ? email.value : undefined,
        mobile_number: !isEmail ? email.value : undefined,
        password: password.value,
      };

      // enable code below to integrate api
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onCloseDialog = () => {
    setIsError(false);
    dispatch(actions.getFetchReset());
  };

  if (success) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <Helmet title="Login" />
      <div className="form-container">
        <H1 margin="0 0 5px">We're glad you're back!</H1>
        <Label>Login to manage your account.</Label>

        <form>
          {loading && <Loading position="absolute" />}
          <Field>
            <Label>
              Email or Mobile No. <i>*</i>
            </Label>
            <Input
              type="text"
              value={email.value}
              autoComplete="off"
              onChange={e =>
                setEmail({ value: e.currentTarget.value, error: false })
              }
              placeholder="Email or Mobile No."
              required
            />
            {email.error && (
              <ErrorMsg formError>
                * Please enter your email or mobile number
              </ErrorMsg>
            )}
          </Field>
          <Field>
            <Label>
              Password <i>*</i>
            </Label>
            <Input
              type="password"
              value={password.value}
              autoComplete="off"
              onChange={e =>
                setPassword({
                  value: e.currentTarget.value,
                  error: false,
                  isWeak: false,
                })
              }
              placeholder="Password"
              required
            />
            {password.error && (
              <ErrorMsg formError>* Please enter your password</ErrorMsg>
            )}
            {password.isWeak && (
              <ErrorMsg formError>
                * You have entered a short and weak password, password must be a
                minimum of 12 characters and with at least one uppercase and
                lowercase alphabet, numeric and special character.
              </ErrorMsg>
            )}
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
          <Field className="text-center" margin="20px 0 10px">
            Not yet a member? <A to="/register">Sign up</A>
          </Field>
          <Field className="text-center">
            <A to="/forgotpassword">Forgot Password?</A>
          </Field>
        </form>
      </div>
      <Dialog show={isError} size="small">
        <div className="text-center">
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
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </Wrapper>
  );
}
