/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, Link } from 'react-router-dom';
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
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import VerifyOTP from 'app/components/VerifyOTP';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import PinInput from 'app/components/Elements/PinInput';

import {
  validateEmail,
  regExMobile,
  regExStrongPassword,
} from 'app/components/Helpers';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectValidateError,
  selectValidateData,
  selectResendCodeData,
  selectResendCodeError,
} from './slice/selectors';

export function RegisterPage() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);
  const validateError: any = useSelector(selectValidateError);
  const validateSuccess = useSelector(selectValidateData);
  const resendSuccess: any = useSelector(selectResendCodeData);
  const resendError: any = useSelector(selectResendCodeError);

  // API related states
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [apiError, setApiError] = React.useState('');
  const [resendDialog, setResendDialog] = React.useState(false);

  // show proper forms
  const [showChoose, setShowChoose] = React.useState(true);
  const [showCreate, setShowCreate] = React.useState(false);
  const [showPin, setShowPin] = React.useState(false);
  const [showPinConfirm, setShowPinConfirm] = React.useState(false);
  const [showPinCreated, setShowPinCreated] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  // form fields
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
  const [agree, setAgree] = React.useState({ value: false, error: false });
  const [showPass, setShowPass] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const [pin, setPin] = React.useState({ value: '', error: false });
  const [pinConfirm, setPinConfirm] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
      dispatch(actions.getValidateReset()); // reset validate object
      dispatch(actions.getResendCodeReset()); // reset re-send object
    };
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (success) {
      setShowPinCreated(false);
      setShowVerify(true);
    }
    if (error && Object.keys(error).length > 0) {
      apiErrorMessage();
    }

    if (validateError && Object.keys(validateError).length > 0) {
      setIsLoading(false);
      // return the errors
      const i112 = validateError.errors.error_code
        ? validateError.errors.error_code.find(j => j === 112)
        : -1;
      if (i112 !== -1) {
        setUsername({
          ...username,
          error: true,
          msg: isEmail
            ? 'Oops, this email address is already taken. Please try again.'
            : 'Oops, this mobile number is already taken. Please try again.',
        });
      }

      if (
        validateError.errors &&
        validateError.errors.password &&
        validateError.errors.password.length > 0
      ) {
        setPassError(
          'Your password is too short and weak. A minimum of 12 characters, with at least one uppercase and lowercase letter, one numeric and one special character (@$!%*#?&_) are needed',
        );
      }
    }

    if (validateSuccess) {
      setShowCreate(false);
      setShowPin(true);
      setIsLoading(false);
    }
  }, [success, error, validateError, validateSuccess]);

  React.useEffect(() => {
    if (resendSuccess || (resendError && Object.keys(resendError).length > 0)) {
      setIsLoading(false);
      setResendDialog(true);
    }
  }, [resendSuccess, resendError]);

  // check the error payload
  const apiErrorMessage = () => {
    if (error.code && error.code === 422) {
      let emailError = '';
      let passError = '';
      let mobileError = '';
      if (error.errors) {
        if (error.errors.email && error.errors.email.length > 0) {
          emailError = error.errors.email.join(' ');
        }
        if (error.errors.password && error.errors.password.length > 0) {
          passError = error.errors.password.join(' ');
        }
        if (
          error.errors.mobile_number &&
          error.errors.mobile_number.length > 0
        ) {
          mobileError = error.errros.mobile_number.join(' ');
        }
      }

      let msg = `${emailError !== '' ? `${emailError}\n` : ''} ${
        passError !== '' ? `${passError}\n` : ''
      } ${mobileError !== '' ? mobileError : ''}`;
      setApiError(msg);
    }

    if (!error.code && error.response && error.response.status !== 422) {
      setApiError(error.response.statusText);
    }

    if (!error.response && (!error.code || error.code !== 422)) {
      setApiError(error.message);
    }

    setIsError(true);
  };

  // show the correct form based on selection (email or mobile)
  const onShowForm = (bool: boolean) => {
    setIsEmail(bool);
    setShowChoose(false);
    setShowCreate(true);
  };

  // validate the entered information (email/mobile, password)
  const onValidateFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;

    // validate first the user inputs in the create account form
    // validate as email
    if (isEmail) {
      if (username.value === '') {
        hasError = true;
        setUsername({
          ...username,
          error: true,
          msg: 'Kindly enter your email address',
        });
      }

      if (username.value !== '' && !validateEmail(username.value)) {
        hasError = true;
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
        hasError = true;
        setUsername({
          ...username,
          error: true,
          msg: 'Kindly enter your mobile number',
        });
      }

      if (username.value !== '' && !regExMobile.test(username.value)) {
        hasError = true;
        setUsername({
          ...username,
          error: true,
          msg:
            'Please enter valid mobile number (09 + 9 digit number) ie: 09xxxxxxxxx',
        });
      }
    }

    if (password.value === '') {
      hasError = true;
      setPassword({ ...password, error: true });
    }

    if (confirmPassword.value === '') {
      hasError = true;
      setConfirmPassword({ ...confirmPassword, error: true });
    }

    if (
      password.value !== '' &&
      confirmPassword.value !== '' &&
      password.value !== confirmPassword.value
    ) {
      hasError = true;
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
        hasError = true;
        setPassError(
          'Your password is too short and weak. A minimum of 12 characters, with at least one uppercase and lowercase letter, one numeric and one special character (@$!%*#?&_) are needed',
        );
      }
    }

    if (!agree.value) {
      hasError = true;
      setAgree({ ...agree, error: true });
    }

    if (!hasError) {
      setIsLoading(true);
      const data = {
        email: isEmail ? username.value : undefined,
        mobile_number: !isEmail ? username.value : undefined,
        password: password.value,
        password_confirmation: password.value,
      };
      dispatch(actions.getValidateLoading(data));
    }
  };

  // if validation passed, show the reenter pin
  const onPinNext = () => {
    if (pin.value !== '' && pin.value.length === 4) {
      setShowPin(false);
      setShowPinConfirm(true);
      dispatch(actions.getValidateReset());
    } else {
      setPin({ ...pin, error: true });
    }
  };

  // validate the re-entered pin and then show PIN created
  const onPinConfirmNext = () => {
    let hasError = false;
    // validate the pin if they are the same
    // notify user
    if (pinConfirm.value === '') {
      hasError = true;
      setPinConfirm({
        ...pinConfirm,
        error: true,
        msg: 'You have not re-entered your PIN. Please try again.',
      });
    }

    if (pinConfirm.value !== '') {
      if (pinConfirm.value.length < 4) {
        hasError = true;
        setPinConfirm({
          ...pinConfirm,
          error: true,
          msg: 'You have not re-entered your PIN correctly. Please try again.',
        });
      }

      if (pinConfirm.value.length === 4 && pinConfirm.value !== pin.value) {
        hasError = true;
        setPinConfirm({
          ...pinConfirm,
          error: true,
          msg: 'Uh-oh! The PIN you entered is incorrect. Please try again.',
        });
      }
    }

    if (!hasError) {
      setIsLoading(true);

      setTimeout(() => {
        setShowPinConfirm(false);
        setShowPinCreated(true);
        setIsLoading(false);
      }, 800);
    }
  };

  // submit data to api
  const onSubmitCreateAccount = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    const data = {
      email: isEmail ? username.value : undefined,
      mobile_number: !isEmail ? username.value : undefined,
      password: password.value,
      password_confirmation: password.value,
      pin_code: pin.value,
    };

    // pass payload to saga
    dispatch(actions.getFetchLoading(data));
  };

  const onCodeVerified = () => {
    setShowVerify(false);
    setShowSuccess(true);
  };

  // clicking the success dialog
  const onClickSuccess = () => {
    history.replace('/'); // redirect to home
  };

  // close error dialog
  const onCloseErrorDialog = () => {
    dispatch(actions.getFetchReset());
    dispatch(actions.getValidateReset());
    setIsError(false);
    setApiError('');
  };

  const onResendCode = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setIsLoading(true);
    // since we already have the information, send the user email or mobile number to receive activation code
    const data = {
      email: isEmail ? username.value : undefined,
      mobile_number: !isEmail ? username.value : undefined,
      otp_type: 'registration',
    };
    dispatch(actions.getResendCodeLoading(data));
  };

  const onCloseResendDialog = () => {
    setResendDialog(false);
    dispatch(actions.getResendCodeReset());
  };

  // resend code error message
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
      <Helmet title="Register" />
      <div className="form-container">
        {loading && <Loading position="absolute" />}
        {isLoading && <Loading position="absolute" />}
        {showChoose && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <H3>Create your Account</H3>
            <p className="f-small">
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
          </div>
        )}

        {showCreate && (
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
                  className={username.error ? 'error' : undefined}
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
                    className={
                      Boolean(passError) || password.error ? 'error' : undefined
                    }
                  />
                  <IconButton
                    type="button"
                    onClick={() => setShowPass(prev => !prev)}
                    tabIndex={-1}
                  >
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
                    className={
                      Boolean(passError) || confirmPassword.error
                        ? 'error'
                        : undefined
                    }
                  />
                  <IconButton
                    type="button"
                    onClick={() => setShowConfirm(prev => !prev)}
                    tabIndex={-1}
                  >
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
                onClick={onValidateFields}
                color="primary"
                fullWidth={true}
                size="large"
                variant="contained"
              >
                Next
              </Button>
              <Field className="text-center" margin="20px 0 10px">
                Already have an account?{' '}
                <A to="/" underline="true">
                  Log In
                </A>
              </Field>
              <Field className="agreement text-center" margin="25px 0 0">
                <span>
                  <input
                    type="checkbox"
                    value={agree.value ? 'yes' : 'no'}
                    onChange={() =>
                      setAgree({ value: !agree.value, error: false })
                    }
                    checked={agree.value}
                  />
                  By creating an account, I agree to the{' '}
                  <a
                    href="https://squidpay.ph/tac"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Terms and Condition
                  </a>{' '}
                  and{' '}
                  <a
                    href="https://squidpay.ph/privacypolicy"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Privacy Policy
                  </a>
                </span>
                {agree.error && (
                  <ErrorMsg formError>
                    You must agree to continue creating your account.
                  </ErrorMsg>
                )}
              </Field>
            </form>
          </>
        )}

        {showPin && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <CircleIndicator size="large">
              <FontAwesomeIcon icon="lock" />
            </CircleIndicator>
            <H3 margin="20px 0 10px">Setup your unique PIN</H3>
            <p className="f-small">
              This will be used every time you login to your SquidPay account
            </p>
            <Field margin="5px 0 25px">
              <PinInput
                length={4}
                onChange={p => setPin({ value: p, error: false })}
                value={pin.value}
                isValid={!pin.error}
              />
              {pin.error && <ErrorMsg>{pinConfirm.msg}</ErrorMsg>}
            </Field>
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
          </div>
        )}
        {showPinConfirm && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <CircleIndicator size="large">
              <FontAwesomeIcon icon="lock" />
            </CircleIndicator>
            <H3 margin="20px 0 10px">Retype your unique PIN</H3>
            <p className="f-small">
              This will be used every time you login to your SquidPay account
            </p>
            <Field margin="5px 0 25px">
              <PinInput
                length={4}
                onChange={p =>
                  setPinConfirm({ value: p, error: false, msg: '' })
                }
                value={pinConfirm.value}
                isValid={!pinConfirm.error}
              />
              {pinConfirm.error && (
                <ErrorMsg formError>{pinConfirm.msg}</ErrorMsg>
              )}
            </Field>
            <Button
              type="button"
              onClick={onPinConfirmNext}
              color="primary"
              fullWidth
              size="large"
              variant="contained"
            >
              Next
            </Button>
          </div>
        )}

        {showPinCreated && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <CircleIndicator size="large">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H3 margin="20px 0 10px">User PIN successfully created</H3>
            <p className="f-small">
              This will be used every time you login to your SquidPay account
            </p>
            <Field margin="25px 0 0">
              <Button
                type="button"
                onClick={onSubmitCreateAccount}
                color="primary"
                fullWidth
                size="large"
                variant="contained"
              >
                Next
              </Button>
            </Field>
          </div>
        )}

        {showVerify && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <H3 margin="35px 0 10px">Authentication</H3>
            <p className="f-small">
              We sent 4-digit authentication code to your{' '}
              {isEmail
                ? `email ${username.value}`
                : `mobile number ${username.value}`}
            </p>

            <VerifyOTP
              onSuccess={onCodeVerified}
              isEmail={isEmail}
              viaValue={username.value}
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
            <H3 margin="25px 0 25px">You've successfully registered.</H3>

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

      <Dialog show={isError} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Registration Failed</H3>
          <p>{apiError}</p>
          <Button
            fullWidth
            onClick={onCloseErrorDialog}
            variant="outlined"
            color="secondary"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      <Dialog show={resendDialog} size="small">
        <div className="text-center">
          <CircleIndicator
            size="medium"
            color={resendSuccess ? 'primary' : 'danger'}
          >
            <FontAwesomeIcon icon={resendSuccess ? 'check' : 'times'} />
          </CircleIndicator>
          <H3 margin="15px 0 10px">
            {resendSuccess ? 'Resend Code Success' : 'Resend Code Error'}
          </H3>
          {resendSuccess ? (
            <p>
              We have sent the code in your{' '}
              {isEmail
                ? `email - ${resendSuccess.email}`
                : `mobile number - ${resendSuccess.mobile_number}`}
            </p>
          ) : (
            <p>{resendErrorMsg}</p>
          )}

          <Button
            fullWidth
            onClick={onCloseResendDialog}
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
