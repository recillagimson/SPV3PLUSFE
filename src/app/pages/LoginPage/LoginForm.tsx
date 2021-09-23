/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import { regExMobile, validateEmail } from 'app/components/Helpers';

import Modal from 'app/components/Modal';
import { H4, Paragraph } from 'app/components/Typography';
import { Redirect, useHistory } from 'react-router';

import { useContainerSaga } from './slice';
import { selectError, selectLoading, selectData } from './slice/selectors';
import { validateEmailOrMobile } from 'helpers/formValidations';

export default function LoginForm() {
  const { actions } = useContainerSaga();
  const history = useHistory();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success: any = useSelector(selectData);

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
  const [showPass, setShowPass] = React.useState(false);

  const [noAccount, setNoAccount] = React.useState(false);
  const [loginError, setLoginError] = React.useState({
    show: false,
    msg: '',
    code: 0,
  });

  React.useEffect(
    () => () => {
      dispatch(actions.getFetchReset());
    },
    [],
  );

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
  }, [success, error]);

  const onApiError = (err: any) => {
    if (err && Object.keys(err).length > 0) {
      /**
       * If there is no response in the error body,
       * this is code 422
       */
      let errorCode: any = false;
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        errorCode = err.errors.error_code;
      }

      if (!err.response && errorCode) {
        errorCode.map((i: any) => {
          if (i === 103) {
            setNoAccount(true);
            return undefined;
          }
          if (i === 101 || i === 113) {
            setLoginError({
              show: true,
              msg: isEmail
                ? 'Your email or password is incorrect. Please try again.'
                : 'Your mobile number or password is incorrect. Please try again.',
              code: i,
            });
            return undefined;
          }
          if (i === 102) {
            setLoginError({
              show: true,
              msg:
                'Your login account is not yet verified.  Please contact support@squid.ph or call (02) 85217035 on how to verify your account.',
              code: i,
            });
            return undefined;
          }
          if (i === 104) {
            setLoginError({
              show: true,
              msg:
                'You are attempting to login from an untrusted client. Please check your internet connection',
              code: i,
            });
            return undefined;
          }
          if (i === 105) {
            setLoginError({
              show: true,
              msg:
                'Your account is Locked due to suspicious activity. Please contact support@squid.ph or call (02) 85217035 to request for access.',
              code: i,
            });
            return undefined;
          }
          return undefined;
        });
      }
      if (err.errors && !errorCode) {
        if (err.errors.password && err.errors.password.length > 0) {
          setPassword({
            ...password,
            error: true,
            msg: err.errors.password.join('\n'),
          });
        }
        if (isEmail && err.errors.email && err.errors.email.length > 0) {
          setEmail({ ...email, error: true, msg: err.errors.email.join('\n') });
        }
        if (
          !isEmail &&
          err.errors.mobile_number &&
          err.errors.mobile_number.length > 0
        ) {
          setEmail({
            ...email,
            error: true,
            msg: err.errors.mobile_number.join('\n'),
          });
        }
      }

      /** Other Error Status that is not been handled */
      if (err.response) {
        setLoginError({
          show: true,
          msg: err.response.statusText,
          code: err.response.status,
        });
      }
    }
  };

  /**
   * Submit Credentials
   */
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
        msg: 'Please enter your email or mobile number.',
      });
    }

    // check if field is not empty
    if (email.value !== '') {
      const validateValue = validateEmailOrMobile(email.value);
      if (validateValue) {
        error = validateValue.error;
        setEmail({
          ...email,
          error: validateValue.error,
          msg: validateValue.msg,
        });
      }
    }

    // if we pass the validation above, set if we are going to pass an email or mobile
    if (email.value !== '' && validateEmail(email.value.trim())) {
      anEmail = true;
      setIsEmail(true);
    } else if (email.value !== '' && regExMobile.test(email.value)) {
      anEmail = false;
      setIsEmail(false);
    }

    if (password.value === '') {
      error = true;
      setPassword({
        ...password,
        error: true,
        msg: 'The password field is required.',
      });
    }

    if (!error) {
      const data = {
        email: anEmail ? email.value.trim() : undefined,
        mobile_number: !anEmail ? email.value.trim() : undefined,
        password: password.value,
      };

      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
    }
  };

  if (success && Object.keys(success).length > 0) {
    return <Redirect to={success.redirect} />;
  }

  return (
    <>
      <form id="loginForm">
        {loading && <Loading position="absolute" />}
        <Field>
          <Label>
            Email or Mobile No. <i>*</i>
          </Label>
          <Input
            id="username"
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
              id="password"
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
              <FontAwesomeIcon icon={!showPass ? 'eye-slash' : 'eye'} />
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
          className="form-submit"
        >
          LOGIN
        </Button>
      </form>
      <Modal
        show={loginError.show}
        size="small"
        message={{
          status: 'error',
          heading:
            loginError.code === 105 ? 'Account is Locked.' : 'Login Failed',
          body: loginError.msg,
        }}
        onClick={() => setLoginError({ show: false, msg: '', code: 0 })}
        okText="Close"
      />
      <Modal show={noAccount} size="small">
        <div id="noAccount" className="text-center">
          <img src="/img/no-account.png" alt="No account detected" />
          <H4 margin="30px 0 10px" align="center">
            No account detected
          </H4>
          <Paragraph align="center" margin="0 0 30px">
            The {isEmail ? 'email' : 'mobile number'} you entered is not
            connected to a SquidPay account. Please create one to get access to
            SquidPay.
          </Paragraph>
          <Button
            fullWidth
            onClick={() =>
              history.push({
                pathname: '/register',
                state: {
                  isEmail: isEmail,
                  username: email.value,
                  password: password.value,
                },
              })
            }
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '15px',
            }}
          >
            Create Account
          </Button>
        </div>
      </Modal>
    </>
  );
}
