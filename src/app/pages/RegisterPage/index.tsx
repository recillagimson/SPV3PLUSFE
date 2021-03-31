/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'app/components/Loading';
import H1 from 'app/components/Elements/H1';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import {
  validateEmail,
  validatePhone,
  regExStrongPassword,
} from 'app/components/Helpers';

/** slice */
import { useContainerSaga } from './slice';
import { selectLoading, selectError, selectData } from './slice/selectors';
import { Link } from 'react-router-dom';

export function RegisterPage() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const [apiError, setApiError] = React.useState('');
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    phoneError: false,
  });
  const [password, setPassword] = React.useState({ value: '', error: false });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: '',
    error: false,
  });
  const [passError, setPassError] = React.useState('');
  const [agree, setAgree] = React.useState({ value: false, error: false });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      apiErrorMessage();
    }
  }, [error]);

  // check the error payload
  const apiErrorMessage = () => {
    if (error.code && error.code === 422) {
      let emailError = '';
      let passError = '';
      if (error.errors) {
        if (error.errors.email && error.errors.email.length > 0) {
          emailError = error.errors.email.join(' ');
        }
        if (error.errors.password && error.errors.password.length > 0) {
          passError = error.errors.password.join(' ');
        }
      }

      let msg = `${emailError !== '' ? `* ${emailError}\n` : ''}* ${passError}`;
      setApiError(msg);
    }

    if (!error.code && error.response && error.response.status !== 422) {
      setApiError(error.response.statusText);
    }

    if (!error.response && (!error.code || error.code !== 422)) {
      setApiError(error.message);
    }
  };

  // submit
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    let isEmail = false;

    if (email.value === '') {
      error = true;
      setEmail({ ...email, error: true, phoneError: true });
    }

    if (email.value !== '' && validateEmail(email.value)) {
      isEmail = true;
    }

    if (
      email.value !== '' &&
      !validateEmail(email.value) &&
      !/^0(9)/.test(email.value)
    ) {
      setEmail({ ...email, error: true, phoneError: false });
    }

    if (
      email.value !== '' &&
      /^0(9)/.test(email.value) &&
      !validatePhone(email.value)
    ) {
      setEmail({ ...email, error: false, phoneError: true });
    }

    if (password.value === '') {
      error = true;
      setPassword({ ...password, error: true });
    }

    if (confirmPassword.value === '') {
      error = true;
      setConfirmPassword({ ...confirmPassword, error: true });
    }

    if (
      password.value !== '' &&
      confirmPassword.value !== '' &&
      password.value !== confirmPassword.value
    ) {
      error = true;
      setPassError(
        'Your password and confirm password did not match. Please enter again',
      );
    }

    if (
      password.value !== '' &&
      confirmPassword.value !== '' &&
      password.value === confirmPassword.value
    ) {
      if (!regExStrongPassword.test(password.value)) {
        error = true;
        setPassError(
          'Your password is too short and weak. A minimum of 12 characters and with a least one uppercase and lowercase alphabet, numeric and special character is needed',
        );
      }
    }

    if (!agree.value) {
      error = true;
      setAgree({ ...agree, error: true });
    }

    if (!error) {
      setApiError('');
      const data = {
        email: isEmail ? email.value : undefined,
        mobile_number: !isEmail ? email.value : undefined,
        password: password.value,
        password_confirmation: password.value,
      };

      // pass payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onClickSuccess = () => {
    dispatch(actions.getFetchReset()); // reset stote state first
    history.push('/'); // redirect to home
  };

  return (
    <Wrapper>
      <Helmet title="Register" />
      <div className="form-container">
        <H1 margin="0 0 5px">Create your account</H1>

        <form>
          {loading && <Loading position="absolute" />}
          <Field>
            <Label>Email or Mobile No.</Label>
            <Input
              type="text"
              value={email.value}
              autoComplete="off"
              onChange={e =>
                setEmail({
                  value: e.currentTarget.value,
                  error: false,
                  phoneError: false,
                })
              }
              placeholder="Email or Mobile No."
            />
            {(email.error || email.phoneError) && (
              <ErrorMsg formError>
                *{' '}
                {!email.error &&
                  email.phoneError &&
                  'Please enter phone in correct format ie: 09xxxxxxxxx'}
                {email.error &&
                  !email.phoneError &&
                  'Please enter your email in valid format or try your mobile number'}
                {email.error &&
                  email.phoneError &&
                  'Please enter your email or mobile number'}
              </ErrorMsg>
            )}
          </Field>
          <Field>
            <Label>Password</Label>
            <Input
              type="password"
              value={password.value}
              autoComplete="off"
              onChange={e => {
                setPassword({ value: e.currentTarget.value, error: false });
                setPassError('');
              }}
              placeholder="Password"
            />
            {password.error && (
              <ErrorMsg formError>* Please enter your password</ErrorMsg>
            )}
          </Field>
          <Field>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              value={confirmPassword.value}
              autoComplete="off"
              onChange={e => {
                setConfirmPassword({
                  value: e.currentTarget.value,
                  error: false,
                });
                setPassError('');
              }}
              placeholder="Confirm password"
            />
            {confirmPassword.error && (
              <ErrorMsg formError>* Please confirm your password</ErrorMsg>
            )}
            {passError !== '' && <ErrorMsg formError>* {passError}</ErrorMsg>}
          </Field>
          <Field className="agreement">
            <input
              type="checkbox"
              defaultChecked={agree.value}
              value="agree"
              onChange={() => setAgree({ value: !agree.value, error: false })}
            />
            <span>
              By creating an account, I agree to the{' '}
              <Link to="/card-member-agreement" target="_blank">
                Card Member Agreement
              </Link>{' '}
              and{' '}
              <Link to="/" target="_blank">
                Privacy Policy
              </Link>
            </span>
            {agree.error && (
              <ErrorMsg formError>
                * You must agree to continue creating your account.
              </ErrorMsg>
            )}
          </Field>

          {apiError !== '' && <ErrorMsg formError>{apiError}</ErrorMsg>}

          <Button
            type="submit"
            onClick={onSubmit}
            color="primary"
            fullWidth={true}
            size="large"
            variant="contained"
          >
            CREATE ACCOUNT
          </Button>
          <Field className="text-center" margin="20px 0 10px">
            Already have an account? <A to="/">Log In</A>
          </Field>
        </form>
      </div>

      <Dialog
        show={success}
        onClick={onClickSuccess}
        okText="OK"
        message="You have successfully registered your account. Click OK to go to the Login Page."
        title="REGISTRATION SUCCESS"
      />
    </Wrapper>
  );
}
