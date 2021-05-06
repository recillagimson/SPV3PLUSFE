/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Update Password Component
 * @prop  {boolean}   mount         true/false to mount the component
 * @prop  {string}    viaValue      email or mobile number for updating password
 * @prop  {string}    isEmail       if we are updating through email or password
 * @prop  {function}  onSuccess     callback when update password is successful
 *
 */
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import Label from 'app/components/Elements/Label';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import { regExStrongPassword } from 'app/components/Helpers';

/** selectors, slice */
import { useComponentSaga } from './slice';
import { selectData, selectLoading, selectError } from './slice/selectors';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  viaValue: string;
  isEmail: boolean;
  onSuccess: () => void;
};

export default function UpdatePasswordComponent({
  viaValue,
  isEmail,
  onSuccess,
}: Props) {
  const { actions } = useComponentSaga();
  const success = useSelector(selectData);
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dispatch = useDispatch();

  const [showPass, setShowPass] = React.useState(false);
  const [showConfirmPass, setShowConfirmPass] = React.useState(false);

  const [isError, setIsError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  const [newPass, setNewPass] = React.useState({ value: '', error: false });
  const [confirmPass, setConfirmPass] = React.useState({
    value: '',
    error: false,
  });
  const [passError, setPassError] = React.useState('');

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
    };
  }, []);

  React.useEffect(() => {
    if (success) {
      onSuccess();
      dispatch(actions.getFetchReset());
    }
  }, [success]);

  React.useEffect(() => {
    let apiError: string | undefined;
    if (error && Object.keys(error).length > 0) {
      if (error.code && error.code === 422) {
        if (
          error.errors &&
          error.errors.error_code &&
          error.errors.error_code.length > 0
        ) {
          apiError = error.errors.error_code.map(i => {
            if (i === 101 || i === 103) {
              return `The ${
                isEmail ? 'email' : 'mobile number'
              } you have entered doesn't exists in our records. Please try again.`;
            }
            if (i === 102) {
              return `Your account is not yet verified. Please check your ${
                isEmail ? 'email' : 'mobile number'
              } for verification process.`;
            }
            if (i === 107) {
              return `You cannot change your password yet at it hasn't reach it's 1 day minimum age.`;
            }
            if (i === 108) {
              return `We encountered an error in processing your data. Please try again.`;
            }
            if (i === 106) {
              return 'Password has already been used.';
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
        apiError = 'Uh-oh! Invalid Code';
        setApiErrorMsg(apiError || '');
        setIsError(true);
      }
    }
  }, [error]);

  const onChangeNewPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPass({
      value: e.currentTarget.value,
      error: false,
    });
    setPassError('');
  };

  const onChangeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPass({
      value: e.currentTarget.value,
      error: false,
    });
    setPassError('');
  };

  const onSubmitPassword = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();
    let error = false;

    if (newPass.value === '') {
      error = true;
      setNewPass({ ...newPass, error: true });
    }

    if (confirmPass.value === '') {
      error = true;
      setConfirmPass({ ...confirmPass, error: true });
    }

    if (newPass.value !== '' && confirmPass.value === '') {
      error = true;
      setConfirmPass({ ...confirmPass, error: true });
    }

    if (newPass.value === '' && confirmPass.value !== '') {
      error = true;
      setNewPass({ ...newPass, error: true });
    }

    if (
      newPass.value !== '' &&
      confirmPass.value !== '' &&
      newPass.value !== confirmPass.value
    ) {
      error = true;
      setPassError(
        'Your password and confirm password did not match. Please input your password again.',
      );
    }

    if (
      newPass.value !== '' &&
      confirmPass.value !== '' &&
      newPass.value === confirmPass.value
    ) {
      if (!regExStrongPassword.test(newPass.value)) {
        error = true;
        setPassError(
          'Your password is too short and weak. A minimum of 12 characters, with at least one uppercase and lowercase letter, one numeric and one special character (@$!%*#?&_) are needed',
        );
      }
    }

    if (!error) {
      const data = {
        mobile_number: !isEmail ? viaValue : undefined,
        email: isEmail ? viaValue : undefined,
        password: newPass.value,
        password_confirmation: newPass.value,
      };

      dispatch(actions.getFetchLoading(data));
    }
  };

  return (
    <>
      {loading && <Loading position="absolute" />}
      <Field>
        <Label>
          Password <i>*</i>
        </Label>
        <InputIconWrapper>
          <Input
            type={showPass ? 'text' : 'password'}
            value={newPass.value}
            autoComplete="off"
            onChange={onChangeNewPassword}
            placeholder="Password"
            required
            className={newPass.error ? 'error' : undefined}
          />
          <IconButton
            type="button"
            onClick={() => setShowPass(prev => !prev)}
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={showPass ? 'eye-slash' : 'eye'} />
          </IconButton>
        </InputIconWrapper>
        {newPass.error && (
          <ErrorMsg formError>Please enter your new password</ErrorMsg>
        )}
      </Field>
      <Field>
        <Label>
          Confirm Password <i>*</i>
        </Label>
        <InputIconWrapper>
          <Input
            type={showConfirmPass ? 'text' : 'password'}
            value={confirmPass.value}
            autoComplete="off"
            onChange={onChangeConfirmPassword}
            placeholder="Password"
            required
            className={confirmPass.error ? 'error' : undefined}
          />
          <IconButton
            type="button"
            onClick={() => setShowConfirmPass(prev => !prev)}
            tabIndex={-1}
          >
            <FontAwesomeIcon icon={showConfirmPass ? 'eye-slash' : 'eye'} />
          </IconButton>
        </InputIconWrapper>
        {confirmPass.error && (
          <ErrorMsg formError>Please confirm your new password.</ErrorMsg>
        )}
      </Field>
      <Field>
        {Boolean(passError) && <ErrorMsg formError>{passError}</ErrorMsg>}
        {isError && <ErrorMsg formError>{apiErrorMsg}</ErrorMsg>}
      </Field>
      <Button
        type="submit"
        onClick={onSubmitPassword}
        color="primary"
        fullWidth={true}
        size="large"
        variant="contained"
      >
        UPDATE PASSWORD
      </Button>
    </>
  );
}
