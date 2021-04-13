/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
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

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import VerifyOTP from 'app/components/VerifyOTP';

import {
  validateEmail,
  regExMobile,
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

  const [isError, setIsError] = React.useState(false);
  const [apiError, setApiError] = React.useState('');
  const [showChoose, setShowChoose] = React.useState(true);
  const [isEmail, setIsEmail] = React.useState(false);
  const [username, setUsername] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [password, setPassword] = React.useState({ value: '', error: false });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: '',
    error: false,
  });
  const [passError, setPassError] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);
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

    // validate as email
    if (isEmail) {
      if (username.value === '') {
        error = true;
        setUsername({
          ...username,
          error: true,
          msg: 'Kindly enter your email address',
        });
      }

      if (username.value !== '' && !validateEmail(username.value)) {
        error = true;
        setUsername({
          ...username,
          error: true,
          msg:
            'Oops, please enter your email in valid format ie: email@example.com',
        });
      }
    }

    // validate as phone
    if (!isEmail) {
      if (username.value === '') {
        error = true;
        setUsername({
          ...username,
          error: true,
          msg: 'Kindly enter your mobile number',
        });
      }

      if (username.value !== '' && !regExMobile.test(username.value)) {
        error = true;
        setUsername({
          ...username,
          error: true,
          msg:
            'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
        });
      }
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
          'Your password is too short and weak. A minimum of 12 characters and with at least one uppercase and lowercase alphabet, numeric and special character is needed',
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
        email: isEmail ? username.value : undefined,
        mobile_number: !isEmail ? username.value : undefined,
        password: password.value,
        password_confirmation: password.value,
      };

      // pass payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onClickSuccess = () => {
    dispatch(actions.getFetchReset()); // reset stote state first
    history.replace('/'); // redirect to home
  };

  const onShowForm = (bool: boolean) => {
    setShowChoose(prev => !prev);
    setIsEmail(bool);
  };

  return (
    <Wrapper>
      <Helmet title="Register" />
      <div className="form-container">
        {loading && <Loading position="absolute" />}
        {showChoose && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <H3>Create your Account</H3>
            <p className="sub-title">
              We got you! Let us know which contact detail you want to use to
              create your account
            </p>
            <Button
              type="button"
              onClick={() => onShowForm(false)}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              <FontAwesomeIcon icon="mobile" /> Mobile Number
            </Button>
            <Field margin="10px 0">Or</Field>
            <Button
              type="button"
              onClick={() => onShowForm(true)}
              color="primary"
              fullWidth={true}
              size="large"
              variant="contained"
            >
              <FontAwesomeIcon icon="envelope" /> Email
            </Button>

            <VerifyOTP
              mount
              onSuccess={() => {}}
              isEmail={isEmail}
              viaValue="1234"
            />
          </div>
        )}

        {!showChoose && (
          <>
            <H1 margin="0 0 5px">Create your account</H1>

            <form>
              <Field>
                <Label>{isEmail ? 'Email' : 'Mobile No.'}</Label>
                <Input
                  hidespinner
                  required
                  type={isEmail ? 'text' : 'number'}
                  value={username.value}
                  autoComplete="off"
                  min={0}
                  onChange={e =>
                    setUsername({
                      value: e.currentTarget.value,
                      error: false,
                      msg: '',
                    })
                  }
                  placeholder={
                    isEmail
                      ? 'Ex: email@example.com'
                      : 'Ex: 09 + 9 digit (09xxxxxxxxx)'
                  }
                />
                {username.error && (
                  <ErrorMsg formError>{username.msg}</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label>
                  Password <i>*</i>
                </Label>
                <InputIconWrapper>
                  <Input
                    type={showPass ? 'text' : 'password'}
                    value={password.value}
                    autoComplete="off"
                    placeholder="Password"
                    required
                    onChange={e => {
                      setPassword({
                        value: e.currentTarget.value,
                        error: false,
                      });
                      setPassError('');
                    }}
                  />
                  <IconButton onClick={() => setShowPass(prev => !prev)}>
                    <FontAwesomeIcon icon={showPass ? 'eye-slash' : 'eye'} />
                  </IconButton>
                </InputIconWrapper>

                {password.error && (
                  <ErrorMsg formError>Please enter your password</ErrorMsg>
                )}
              </Field>
              <Field>
                <Label>Confirm Password</Label>
                <InputIconWrapper>
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    value={confirmPassword.value}
                    autoComplete="off"
                    placeholder="Password"
                    required
                    onChange={e => {
                      setConfirmPassword({
                        value: e.currentTarget.value,
                        error: false,
                      });
                      setPassError('');
                    }}
                  />
                  <IconButton onClick={() => setShowConfirm(prev => !prev)}>
                    <FontAwesomeIcon icon={showConfirm ? 'eye-slash' : 'eye'} />
                  </IconButton>
                </InputIconWrapper>

                {confirmPassword.error && (
                  <ErrorMsg formError>Please confirm your password</ErrorMsg>
                )}
                {passError !== '' && <ErrorMsg formError>{passError}</ErrorMsg>}
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
              <Field className="agreement text-center" margin="25px 0 0">
                <span>
                  By creating an account, I agree to the{' '}
                  <Link to="/terms-and-conditions" target="_blank">
                    Terms and Condition
                  </Link>{' '}
                  and{' '}
                  <Link to="/" target="_blank">
                    Privacy Policy
                  </Link>
                </span>
              </Field>
            </form>
          </>
        )}
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
