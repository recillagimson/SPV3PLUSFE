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
  mount: boolean;
  viaValue: string;
  isEmail: boolean;
  onSuccess: () => void;
};

export default function UpdatePasswordComponent({
  mount,
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

  // before we load all the codes below, check if we are going to be mounted first
  if (!mount) {
    return null;
  }

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
          'Your password is too short and weak. A minimum of 12 characters and with a least one uppercase and lowercase alphabet, numeric and special character is needed',
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
          />
          <IconButton onClick={() => setShowPass(prev => !prev)}>
            <FontAwesomeIcon icon={showPass ? 'eye-slash' : 'eye'} />
          </IconButton>
        </InputIconWrapper>
        {newPass.error && (
          <ErrorMsg formError>* Please enter your new password</ErrorMsg>
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
          />
          <IconButton onClick={() => setShowConfirmPass(prev => !prev)}>
            <FontAwesomeIcon icon={showConfirmPass ? 'eye-slash' : 'eye'} />
          </IconButton>
        </InputIconWrapper>
        {confirmPass.error && (
          <ErrorMsg formError>* Please confirm your new password.</ErrorMsg>
        )}
      </Field>
      <Field>
        {Boolean(passError) && <ErrorMsg formError>* {passError}</ErrorMsg>}

        {error && Object.keys(error).length > 0 && (
          <ErrorMsg formError>
            *{' '}
            {error.code && error.code === 422
              ? error.errors.account.join(' ')
              : error.message}
          </ErrorMsg>
        )}
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
