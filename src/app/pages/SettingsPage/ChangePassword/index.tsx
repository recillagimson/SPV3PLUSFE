/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import Field from 'app/components/Elements/Fields';
import Label from 'app/components/Elements/Label';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Note from 'app/components/Elements/Note';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';

import H3 from 'app/components/Elements/H3';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Dialog from 'app/components/Dialog';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import VerifyOTP from 'app/components/VerifyOTP';

/** slice, types */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectValidateLoading,
  selectValidateError,
  selectValidateData,
} from './slice/selectors';
import { regExStrongPassword } from 'app/components/Helpers';
import { selectLoggedInName } from 'app/App/slice/selectors';

export function SettingsChangePasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const loginName = useSelector(selectLoggedInName);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const success = useSelector(selectData);

  const validateLoading = useSelector(selectValidateLoading);
  const validateError = useSelector(selectValidateError);
  const validateSuccess = useSelector(selectValidateData);

  // show different UI
  const [showForm, setShowForm] = React.useState(true);
  const [showVerify, setShowVerify] = React.useState(false);
  const [resendCode, setResendCode] = React.useState(false);
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);

  const [currentPass, setCurrentPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [newPass, setNewPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [confirmPass, setConfirmPass] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [passError, setPassError] = React.useState('');

  // api related error state
  const [apiError, setApiError] = React.useState(false);

  // effects
  React.useEffect(
    () => () => {
      dispatch(actions.getFetchReset());
    },
    [],
  );

  React.useEffect(() => {
    if (validateError && validateError.length > 0) {
      apiErrorMessage(JSON.parse(validateError));
    }

    if (validateSuccess) {
      setShowForm(false);
      setShowVerify(true);

      // reset the validate success
      dispatch(actions.getValidateReset());
    }
  }, [validateSuccess, validateError]);

  // check the error payload
  const apiErrorMessage = err => {
    if (err.code && err.code === 422) {
      // return the errors
      const i106 = err.errors.error_code
        ? err.errors.error_code.find(j => j === 106)
        : -1;

      const i107 = err.errors.error_code
        ? err.errors.error_code.find(j => j === 107)
        : -1;

      if (i106 !== -1) {
        setPassError(
          'Your new password has already been used. Please enter a different one',
        );
        return;
      }

      if (i107 !== -1) {
        setPassError('Your password cannot be changed for at least 1 day');
        return;
      }

      if (err.errors && err.errors.password && err.errors.password.length > 0) {
        setApiError(true);
      }
    }

    if (!err.code && err.response && err.response.status !== 422) {
      setPassError(err.response.statusText);
      return;
    }

    if (!err.response && (!err.code || err.code !== 422)) {
      setPassError(err.message);
    }

    if (validateSuccess) {
      setShowForm(false);
      setShowVerify(true);
    }
  };

  const onSubmitValidate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    setApiError(false);

    if (currentPass.value === '') {
      hasError = true;
      setCurrentPass({ ...currentPass, error: true });
    }

    if (newPass.value === '') {
      hasError = true;
      setNewPass({ ...newPass, error: true });
    }

    if (confirmPass.value === '') {
      hasError = true;
      setConfirmPass({ ...confirmPass, error: true });
    }

    if (
      newPass.value !== '' &&
      confirmPass.value !== '' &&
      newPass.value !== confirmPass.value
    ) {
      hasError = true;
      setPassError('Oops. Your password does not match.');
    }

    if (
      newPass.value !== '' &&
      confirmPass.value !== '' &&
      newPass.value === confirmPass.value
    ) {
      if (!regExStrongPassword.test(newPass.value)) {
        hasError = true;
        setPassError(
          'Your password is too short and weak. A minimum of 12 characters, with at least one uppercase and lowercase letter, one numeric and one special character (@$!%*#?&_) are needed',
        );
      }
    }

    if (!hasError) {
      const data = {
        current_password: currentPass.value,
        new_password: newPass.value,
        new_password_confirmation: confirmPass.value,
      };

      dispatch(actions.getValidateLoading(data));
    }
  };

  const onResendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    const data = {
      current_password: currentPass.value,
      new_password: newPass.value,
      new_password_confirmation: confirmPass.value,
    };

    dispatch(actions.getValidateLoading(data));
  };

  const onSubmitPassword = () => {
    const data = {
      current_password: currentPass.value,
      new_password: newPass.value,
      new_password_confirmation: confirmPass.value,
    };

    dispatch(actions.getFetchLoading(data));
  };

  const onCloseSuccessDialog = () => {
    setShowForm(true);
    setShowVerify(false);
    dispatch(actions.getFetchReset());
    setCurrentPass({ value: '', error: false, show: false });
    setNewPass({ value: '', error: false, show: false });
    setConfirmPass({ value: '', error: false, show: false });
  };

  const onCloseResendDialog = () => {
    setShowResendSuccess(false);
    dispatch(actions.getValidateReset());
  };

  return (
    <ProtectedContent>
      <Helmet>
        <title>Change Password [Settings]</title>
      </Helmet>

      {showForm && (
        <Box
          title="Change Password"
          titleBorder
          withPadding
          footerBorder
          footerAlign="right"
          footer={
            <>
              <Button
                onClick={() => history.push('/settings')}
                variant="outlined"
                color="secondary"
                size="large"
              >
                Cancel
              </Button>
              <Button
                onClick={onSubmitValidate}
                variant="contained"
                color="primary"
                size="large"
              >
                Save Changes
              </Button>
            </>
          }
        >
          {validateLoading && <Loading position="absolute" />}
          <Field flex>
            <Label>Current Password</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={currentPass.show ? 'text' : 'password'}
                  value={currentPass.value}
                  onChange={e =>
                    setCurrentPass({
                      ...currentPass,
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={
                    currentPass.error || apiError ? 'error' : undefined
                  }
                  placeholder="Current Password"
                  required
                  autoComplete="off"
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setCurrentPass({
                      ...currentPass,
                      show: !currentPass.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon
                    icon={currentPass.show ? 'eye-slash' : 'eye'}
                  />
                </IconButton>
              </InputIconWrapper>
              {currentPass.error && (
                <ErrorMsg formError>
                  Please enter your current password
                </ErrorMsg>
              )}
              {apiError && (
                <ErrorMsg formError>
                  Oops. Your current password is incorrect.
                </ErrorMsg>
              )}
            </div>
          </Field>
          <Field flex>
            <Label>New Password</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={newPass.show ? 'text' : 'password'}
                  value={newPass.value}
                  onChange={e =>
                    setNewPass({
                      ...newPass,
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={
                    newPass.error || Boolean(passError) ? 'error' : undefined
                  }
                  placeholder="New Password"
                  required
                  autoComplete="off"
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setNewPass({
                      ...newPass,
                      show: !newPass.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={newPass.show ? 'eye-slash' : 'eye'} />
                </IconButton>
              </InputIconWrapper>
              <Note>
                Must have at least 12 characters, one upper and lower case
                letter, one numeric and one special character (@$!%*#?&amp;_)
              </Note>
              {newPass.error && (
                <ErrorMsg formError>Please enter your new password</ErrorMsg>
              )}
            </div>
          </Field>
          <Field flex>
            <Label>Retype Password</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={confirmPass.show ? 'text' : 'password'}
                  value={confirmPass.value}
                  onChange={e =>
                    setConfirmPass({
                      ...confirmPass,
                      value: e.currentTarget.value,
                      error: false,
                    })
                  }
                  className={
                    confirmPass.error || Boolean(passError)
                      ? 'error'
                      : undefined
                  }
                  placeholder="Retype Password"
                  required
                  autoComplete="off"
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setConfirmPass({
                      ...confirmPass,
                      show: !confirmPass.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon
                    icon={confirmPass.show ? 'eye-slash' : 'eye'}
                  />
                </IconButton>
              </InputIconWrapper>
              {confirmPass.error && (
                <ErrorMsg formError>Please retype your new password</ErrorMsg>
              )}
              {Boolean(passError) && <ErrorMsg formError>{passError}</ErrorMsg>}
            </div>
          </Field>
        </Box>
      )}

      {showVerify && (
        <Box title="4-Digit One Time PIN" titleBorder withPadding>
          {loading && <Loading position="absolute" />}
          {validateLoading && <Loading position="absolute" />}
          <div
            className="text-center"
            style={{ width: '400px', margin: '0 auto', padding: '0 40px' }}
          >
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="lock" />
            </CircleIndicator>
            <H3 margin="35px 0 10px">Enter 4-Digit one time PIN</H3>
            <p className="f-small">
              The one time pin code has been sent to{' '}
              <strong>{loginName}</strong>
            </p>

            <VerifyOTP
              onSuccess={onSubmitPassword}
              apiURL="/user/password/verify"
            />

            <Field className="text-center f-small" margin="20px 0 10px">
              Need a new code?{' '}
              <A to="#" className="link" onClick={onResendCode} color="gold">
                Resend Code
              </A>
            </Field>
          </div>
        </Box>
      )}

      <Dialog show={success} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img
            src="/img/SPLogo.png"
            alt="SquidPay"
            style={{ width: '50%', display: 'block', margin: '0 auto 35px' }}
          />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 20px">
            Great! You’ve successfully updated your password
          </H3>

          <Button
            fullWidth
            onClick={onCloseSuccessDialog}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>

      <Dialog show={showResendSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img
            src="/img/SPLogo.png"
            alt="SquidPay"
            style={{ width: '50%', display: 'block', margin: '0 auto 35px' }}
          />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 20px' }}>
            The one time pin code has been re-sent to{' '}
            <strong>{loginName}</strong>
          </p>

          <Button
            fullWidth
            onClick={onCloseResendDialog}
            variant="contained"
            color="primary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
