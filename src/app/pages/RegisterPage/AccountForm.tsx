/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import { H3, H4, Paragraph } from 'app/components/Typography';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Select from 'app/components/Elements/Select';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';
import A from 'app/components/Elements/A';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import List from 'app/components/List';
import Dialog from 'app/components/Dialog';
import PrivacyPolicy from 'app/components/PrivacyPolicy';
import TermsCondition from 'app/components/TermsCondition';
import TermsConditionTagalog from 'app/components/TermsCondition/Tagalog';

import useFetch from 'utils/useFetch';
import { validateEmail } from 'app/components/Helpers';
import { useHistory } from 'react-router';
import {
  PasswordValidationErrorCodes,
  validateEmailOrMobile,
  validatePassword,
} from 'helpers/formValidations';

type AccountFormProps = {
  /**
   * This should be passed only if we are coming from
   * the No Account modal in login, pre-fill the fields
   */
  preFill?: {
    /**
     * If user is email or mobile
     */
    isEmail?: boolean;
    /**
     * Pre-fill the field of username if coming from No Account
     */
    username?: string;
    /**
     * Pre-fill the field of password if coming from No Account
     */
    password?: string;
  };
  /**
   * Callback when validation is successfull
   * The returned data should be use in creating account
   * @returns { email: '' | undefined, mobile_number: '' | undefined, password: '', password_confirmation: '' }
   */
  onSuccessValidation: (
    isEmail: boolean,
    data: {
      email: string | undefined;
      mobile_number: string | undefined;
      password: string;
      password_confirmation: string;
    },
  ) => void;
};

/**
 * Account Form
 * @typedef AccountFormProps
 */
export default function AccountForm({
  preFill,
  onSuccessValidation,
}: AccountFormProps) {
  const history = useHistory();
  const validate = useFetch();

  const [isEmail, setIsEmail] = React.useState(preFill?.isEmail || false);
  const [username, setUsername] = React.useState({
    value: preFill?.username || '',
    error: false,
    msg: '',
  });
  const [password, setPassword] = React.useState({
    value: preFill?.password || '',
    error: false,
    msg: '',
    show: false,
  });
  const [confirmPassword, setConfirmPassword] = React.useState({
    value: '',
    error: false,
    msg: '',
    show: false,
  });
  const [isShowPrivacy, setIsShowPrivacy] = React.useState(false);
  const [isShowTerms, setIsShowTerms] = React.useState(false);
  const [termsLanguage, setTermsLanguage] = React.useState('English');

  /** See Notes */
  const [passwordValidated, setPasswordValidated] = React.useState<
    PasswordValidationErrorCodes
  >({
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });

  const [apiError, setApirError] = React.useState({
    show: false,
    msg: '',
    code: 0,
  });

  React.useEffect(() => {
    if (preFill && Object.keys(preFill).length > 0) {
      setIsEmail(preFill.isEmail || false);
      setUsername({
        value: preFill.username || '',
        error: false,
        msg: '',
      });
      setPassword({
        value: preFill.password || '',
        error: false,
        msg: '',
        show: false,
      });
      setConfirmPassword({
        value: preFill.password || '',
        error: false,
        msg: '',
        show: false,
      });
    }
  }, [preFill]);

  // Enable code below for live checking of password and username
  // React.useEffect(() => {
  //   if (password.value !== '') {
  //     let validatePass = validatePassword(password.value);
  //     if (validatePass && validatePass.error) {
  //       setPassword({
  //         ...password,
  //         error: true,
  //         msg: validatePass.msg,
  //       });
  //     }
  //     if (validatePass.errorCodes) {
  //       setPasswordValidated(validatePass.errorCodes);
  //     }
  //   }
  // }, [password.value]);

  // React.useEffect(() => {
  //   if (username.value !== '') {
  //     let validateUsername = validateEmailOrMobile(username.value);
  //     if (validateUsername && validateUsername.error) {
  //       setUsername({
  //         ...username,
  //         error: true,
  //         msg: validateUsername.msg,
  //       });
  //     }
  //   }
  // }, [username.value]);

  React.useEffect(() => {
    if (validate.response) {
      onSuccessValidation(isEmail, {
        email: isEmail ? username.value : undefined,
        mobile_number: !isEmail ? username.value : undefined,
        password: password.value,
        password_confirmation: confirmPassword.value,
      });
      validate.fetchReset();
    }
    if (validate.error && Object.keys(validate.error).length > 0) {
      onApiError(validate.error);
      validate.fetchReset();
    }
  }, [validate.response, validate.error]);

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
          if (i === 112) {
            setUsername({
              ...username,
              error: true,
              msg: isEmail
                ? 'The email is already taken'
                : 'The mobile number is already taken',
            });
            return undefined;
          }
          return undefined;
        });
      }
      if (err.errors && !errorCode) {
        if (err.errors.mobile_number && err.errors.mobile_number.length > 0) {
          setUsername({
            ...username,
            error: true,
            msg: err.errors.mobile_number.join('\n'),
          });
        }
        if (err.errors.email && err.errors.email.length > 0) {
          setUsername({
            ...username,
            error: true,
            msg: err.errors.email.join('\n'),
          });
        }
        if (err.errors.password && err.errors.password.length > 0) {
          setPassword({
            ...password,
            error: true,
            msg: err.errors.password.join('\n'),
          });
        }
        if (
          err.errors.password_confirmation &&
          err.errors.password_confirmation.length > 0
        ) {
          setConfirmPassword({
            ...confirmPassword,
            error: true,
            msg: err.errors.password_confirmation.join('\n'),
          });
        }
      }

      /** Other Error Status that is not been handled */
      if (err.response) {
        setApirError({
          show: true,
          msg: err.response.statusText,
          code: err.response.status,
        });
      }
    }
  };

  const onValidateFields = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    let anEmail = false;

    if (username.value === '') {
      hasError = true;
      setUsername({
        ...username,
        error: true,
        msg: 'This field is required.',
      });
    }

    if (username.value !== '') {
      let validateUsername = validateEmailOrMobile(username.value);
      if (validateUsername && validateUsername.error) {
        hasError = true;
        setUsername({
          ...username,
          error: true,
          msg: validateUsername.msg,
        });
      }
    }

    if (password.value === '') {
      hasError = true;
      setPassword({
        ...password,
        error: true,
        msg: 'The password field is required.',
      });
    }

    if (password.value !== '') {
      let validatePass = validatePassword(password.value);
      if (validatePass && validatePass.error) {
        hasError = true;
        setPassword({
          ...password,
          error: true,
          msg: validatePass.msg,
        });
      }
      if (validatePass.errorCodes) {
        setPasswordValidated(validatePass.errorCodes);
      }
    }

    if (confirmPassword.value === '') {
      hasError = true;
      setConfirmPassword({
        ...confirmPassword,
        error: true,
        msg: 'The password confirmation field is required.',
      });
    }

    if (
      password.value !== '' &&
      confirmPassword.value !== '' &&
      password.value !== confirmPassword.value
    ) {
      hasError = true;
      setConfirmPassword({
        ...confirmPassword,
        error: true,
        msg: 'The password confirmation did not match with your password',
      });
    }

    if (username.value !== '' && validateEmail(username.value)) {
      anEmail = true;
      setIsEmail(true);
    } else {
      anEmail = false;
      setIsEmail(false);
    }

    if (!hasError) {
      // setIsLoading(true);
      const payload = {
        email: anEmail ? username.value : undefined,
        mobile_number: !anEmail ? username.value : undefined,
        password: password.value,
        password_confirmation: password.value,
      };
      validate.goFetch(
        '/auth/register/validate',
        'POST',
        JSON.stringify(payload),
        '',
        false,
        true,
      );
    }
  };

  // const onScroll = (e: any) => {
  //   let nxt = e.target.querySelector('#privacyNotice');
  //   console.log(nxt.scrollHeight - e.target.scrollTop, e.target.clientHeight);
  //   if (nxt.scrollHeight - e.target.scrollTop === e.target.clientHeight) {
  //     // do something
  //   }
  // };

  let nextDisabled = true;
  if (
    username.value !== '' &&
    password.value !== '' &&
    confirmPassword.value !== ''
  ) {
    nextDisabled = false;
  }

  return (
    <>
      {validate.loading && <Loading position="fixed" />}
      <H3 margin="0 0 5px">Create your account</H3>

      <form id="accountCreation">
        <Field>
          <Label>Email Address or Mobile No.</Label>
          <Input
            required
            type="text"
            value={username.value}
            name="username"
            autoComplete="off"
            min={0}
            onChange={e =>
              setUsername({
                value: e.currentTarget.value,
                error: false,
                msg: '',
              })
            }
            placeholder="Email Address or Mobile Number"
            className={username.error ? 'error' : undefined}
            id="username"
          />
          {username.error && <ErrorMsg formError>{username.msg}</ErrorMsg>}
        </Field>
        <Field>
          <Label>Password</Label>
          <InputIconWrapper>
            <Input
              type={password.show ? 'text' : 'password'}
              value={password.value}
              autoComplete="off"
              placeholder="Password"
              name="password"
              required
              onChange={e => {
                setPassword({
                  ...password,
                  value: e.currentTarget.value,
                  error: false,
                  msg: '',
                });
              }}
              className={password.error ? 'error' : undefined}
              id="password"
            />
            <IconButton
              type="button"
              onClick={() =>
                setPassword(prev => ({ ...password, show: !prev.show }))
              }
              tabIndex={-1}
            >
              <FontAwesomeIcon icon={!password.show ? 'eye-slash' : 'eye'} />
            </IconButton>
          </InputIconWrapper>

          {password.error && <ErrorMsg formError>{password.msg}</ErrorMsg>}
        </Field>
        <Field>
          <Label>Retype password</Label>
          <InputIconWrapper>
            <Input
              type={confirmPassword.show ? 'text' : 'password'}
              value={confirmPassword.value}
              autoComplete="off"
              placeholder="Password"
              name="confirm-password"
              required
              onChange={e => {
                setConfirmPassword({
                  ...confirmPassword,
                  value: e.currentTarget.value,
                  error: false,
                });
              }}
              className={confirmPassword.error ? 'error' : undefined}
              id="confirmPassword"
            />
            <IconButton
              type="button"
              onClick={() =>
                setConfirmPassword(prev => ({
                  ...confirmPassword,
                  show: !prev.show,
                }))
              }
              tabIndex={-1}
            >
              <FontAwesomeIcon
                icon={!confirmPassword.show ? 'eye-slash' : 'eye'}
              />
            </IconButton>
          </InputIconWrapper>

          {confirmPassword.error && (
            <ErrorMsg formError>{confirmPassword.msg}</ErrorMsg>
          )}
        </Field>
        {apiError.show && <ErrorMsg formError>{apiError.msg}</ErrorMsg>}

        <Field margin="30px 0 20px">
          <Paragraph size="small" margin="0 0 0">
            Password must:
          </Paragraph>

          <List
            listStyle="disc"
            margin="0 0 0 20px"
            style={{ fontSize: '12px' }}
          >
            <li
              className={
                passwordValidated[1] === 1
                  ? 'text-green'
                  : passwordValidated[1] === 2
                  ? 'text-red'
                  : undefined
              }
            >
              The password must be at least 8 characters.
            </li>
            <li
              className={
                passwordValidated[2] === 1
                  ? 'text-green'
                  : passwordValidated[2] === 2
                  ? 'text-red'
                  : undefined
              }
            >
              The password must have at least one number.
            </li>
            <li
              className={
                passwordValidated[3] === 1
                  ? 'text-green'
                  : passwordValidated[3] === 2
                  ? 'text-red'
                  : undefined
              }
            >
              The password must have at least one uppercase.
            </li>
            <li
              className={
                passwordValidated[4] === 1
                  ? 'text-green'
                  : passwordValidated[4] === 2
                  ? 'text-red'
                  : undefined
              }
            >
              The password must have at least one lowercase.
            </li>
            <li
              className={
                passwordValidated[5] === 1
                  ? 'text-green'
                  : passwordValidated[5] === 2
                  ? 'text-red'
                  : undefined
              }
            >
              The password must have at least one special character.
              {/* [@$!%*#?&amp;_]. */}
            </li>
          </List>
        </Field>

        <Button
          type="submit"
          onClick={onValidateFields}
          color="primary"
          fullWidth={true}
          size="large"
          variant="contained"
          disabled={nextDisabled}
          className="form-submit"
        >
          Next
        </Button>
        <Button
          type="button"
          onClick={() => history.push('/')}
          color="default"
          fullWidth={true}
          size="large"
          variant="contained"
        >
          Back
        </Button>
        <Paragraph align="center" size="small" margin="20px 0 10px">
          By creating an account, I agree to the
          <br />
          <A
            to="/"
            color="gold"
            onClick={e => {
              if (e && e.preventDefault) {
                e.preventDefault();
              }
              setIsShowTerms(true);
            }}
          >
            Terms and Condition
          </A>{' '}
          and{' '}
          <A
            to="/"
            color="gold"
            onClick={e => {
              if (e && e.preventDefault) {
                e.preventDefault();
              }
              setIsShowPrivacy(true);
            }}
          >
            Privacy Policy
          </A>
          .
        </Paragraph>
      </form>

      <Dialog show={apiError.show} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H4 margin="15px 0 10px">Account validation error</H4>
          <p>{apiError.msg}</p>
          <Button
            fullWidth
            onClick={() => setApirError({ show: false, msg: '', code: 0 })}
            variant="outlined"
            color="secondary"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      {/* Privacy Policy */}
      <Dialog
        show={isShowPrivacy}
        title="Privacy Policy"
        size="large"
        onClick={() => setIsShowPrivacy(false)}
        okText="Ok"
      >
        <div
          // onScroll={onScroll}
          style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          <PrivacyPolicy />
        </div>
      </Dialog>
      {/* Terms and Conditions */}
      <Dialog
        show={isShowTerms}
        title="Terms and Conditions"
        size="large"
        onClick={() => setIsShowTerms(false)}
        okText="Ok"
        titleAction={
          <Select
            value={termsLanguage}
            noBorder
            onChange={e => setTermsLanguage(e.currentTarget.value)}
          >
            <option value="English">English</option>
            <option value="Tagalog">Tagalog</option>
          </Select>
        }
      >
        <div
          // onScroll={onScroll}
          style={{ maxHeight: '60vh', overflowY: 'auto' }}
        >
          {termsLanguage === 'English' && <TermsCondition />}
          {termsLanguage === 'Tagalog' && <TermsConditionTagalog />}
        </div>
      </Dialog>
    </>
  );
}
