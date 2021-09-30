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
import Button from 'app/components/Elements/Button';
import Logo from 'app/components/Assets/Logo';

import H3 from 'app/components/Elements/H3';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Dialog from 'app/components/Dialog';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import VerifyOTP from 'app/components/VerifyOTP';
import {
  doSignOut,
  regExStrongPassword,
  validateEmail,
} from 'app/components/Helpers';

/** slice, types */
import { selectLoggedInName } from 'app/App/slice/selectors';
import { useContainerSaga } from './slice';
import {
  selectLoading,
  // selectError,
  selectData,
  selectValidateLoading,
  selectValidateError,
  selectValidateData,
} from './slice/selectors';

export function SettingsChangePasswordPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const loginName = useSelector(selectLoggedInName);
  const loading = useSelector(selectLoading);
  // const error = useSelector(selectError);
  const success = useSelector(selectData);

  const validateLoading = useSelector(selectValidateLoading);
  const validateError = useSelector(selectValidateError);
  const validateSuccess = useSelector(selectValidateData);

  // show different UI
  const [fakeLoading, setFakeLoading] = React.useState(false);
  const [showForm, setShowForm] = React.useState(true);
  const [showVerify, setShowVerify] = React.useState(false);
  // const [resendCode, setResendCode] = React.useState(false);
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);

  const [currentPass, setCurrentPass] = React.useState({
    value: '',
    error: false,
    show: false,
    msg: '', // custom error message
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
      dispatch(actions.getValidateReset());
    },
    [],
  );

  React.useEffect(() => {
    if (validateError && validateError.length > 0) {
      apiErrorMessage(JSON.parse(validateError));
      dispatch(actions.getValidateReset());
    }

    if (validateSuccess) {
      setShowForm(false);
      setShowVerify(true);

      // reset the validate success
      dispatch(actions.getValidateReset());
      setApiError(false);
    }
  }, [validateSuccess, validateError]);

  // check the error payload
  const apiErrorMessage = (err: any) => {
    if (err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        // return the errors
        const i103 = err.errors.error_code
          ? err.errors.error_code.findIndex(j => j === 103)
          : -1;

        const i105 = err.errors.error_code
          ? err.errors.error_code.findIndex(j => j === 105)
          : -1;

        const i106 = err.errors.error_code
          ? err.errors.error_code.findIndex(j => j === 106)
          : -1;

        const i107 = err.errors.error_code
          ? err.errors.error_code.findIndex(j => j === 107)
          : -1;

        if (
          i103 !== -1 &&
          err.errors.payload &&
          err.errors.payload.length > 0
        ) {
          setPassError("Oops! Account doesn't exist");
          return;
        }

        if (
          i105 !== -1 &&
          err.errors.payload &&
          err.errors.payload.length > 0
        ) {
          setPassError(
            'Your Account has been locked, Please contact Squidpay Support for assistance in unlocking your account.',
          );
          return;
        }

        if (
          i106 !== -1 &&
          err.errors.message &&
          err.errors.message.length > 0
        ) {
          setPassError('Oops! Password already been used');
          return;
        }

        if (
          i107 !== -1 &&
          err.errors.payload &&
          err.errors.payload.length > 0
        ) {
          setPassError('Password cannot be changed for at least 1 day/s.');
          return;
        }
      }

      if (err.errors && !err.errors.error_code) {
        let apiError = '';
        if (err.errors.password && err.errors.password.length > 0) {
          setCurrentPass({
            ...currentPass,
            error: true,
            msg: 'Oops. Your current password is incorrect.',
          });
        }

        if (err.errors.new_password && err.errors.new_password.length > 0) {
          apiError += err.errors.new_password.join('\n');
        }
        if (
          err.errors.new_password_confirmation &&
          err.errors.new_password_confirmation.length > 0
        ) {
          apiError += err.errors.new_password_confirmation.join('\n');
        }
        if (
          err.errors.password_confirmation &&
          err.errors.password_confirmation.length > 0
        ) {
          apiError += err.errors.password_confirmation.join('\n');
        }
        if (err.errors.email && err.errors.email.length > 0) {
          apiError += err.errors.email.join('\n');
        }
        if (err.errors.mobile_number && err.errors.mobile_number.length > 0) {
          apiError += err.errors.mobile_number.join('\n');
        }

        setPassError(apiError);
        return;
      }
    }

    if (!err.code && err.response) {
      setPassError(err.response.statusText);
      return;
    }

    if (!err.response && !err.code) {
      setPassError(err.message);
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
      setCurrentPass({
        ...currentPass,
        error: true,
        msg: 'Please enter your current password',
      });
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
      if (newPass.value.length > 20 || confirmPass.value.length > 20) {
        hasError = true;
        setPassError(
          'Your password has exceeded the maximum limit of 20 characters. Please enter again your new password.',
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

  // const onResendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
  //   if (e && e.preventDefault) e.preventDefault();

  //   const data = {
  //     current_password: currentPass.value,
  //     new_password: newPass.value,
  //     new_password_confirmation: confirmPass.value,
  //   };

  //   dispatch(actions.getValidateLoading(data));
  // };

  const onSubmitPassword = () => {
    const data = {
      current_password: currentPass.value,
      new_password: newPass.value,
      new_password_confirmation: confirmPass.value,
    };

    dispatch(actions.getFetchLoading(data));
  };

  const onCloseSuccessDialog = () => {
    // setShowForm(true);
    // setShowVerify(false);
    // dispatch(actions.getFetchReset());
    // dispatch(actions.getValidateReset());

    // setCurrentPass({ value: '', error: false, show: false });
    // setNewPass({ value: '', error: false, show: false });
    // setConfirmPass({ value: '', error: false, show: false });
    setFakeLoading(true);
    doSignOut();
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
          <Field flex id="changePin">
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
                      msg: '',
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
                <ErrorMsg formError>{currentPass.msg}</ErrorMsg>
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
                  onChange={e => {
                    setNewPass({
                      ...newPass,
                      value: e.currentTarget.value,
                      error: false,
                    });
                    setPassError('');
                  }}
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
                  onChange={e => {
                    setConfirmPass({
                      ...confirmPass,
                      value: e.currentTarget.value,
                      error: false,
                    });
                    setPassError('');
                  }}
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
          <Field padding="20px 0 0">
            Please note that you will be logged out automatically after you
            change your password
          </Field>
        </Box>
      )}

      {showVerify && (
        <Box title="4-Digit One Time PIN" titleBorder withPadding>
          {loading && <Loading position="fixed" />}
          {validateLoading && <Loading position="fixed" />}
          <div
            className="text-center"
            style={{ width: '400px', margin: '0 auto', padding: '0 40px' }}
          >
            <VerifyOTP
              onSuccess={onSubmitPassword}
              verifyURL="/user/password/verify"
              isVerifyUserToken
              resendURL="/user/password/validate"
              resendPayload={JSON.stringify({
                current_password: currentPass.value,
                new_password: newPass.value,
                new_password_confirmation: confirmPass.value,
              })}
              isResendUserToken
            />
          </div>
        </Box>
      )}
      {/* Resend Code success */}
      <Dialog show={showResendSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <p style={{ margin: '15px 0 20px' }}>
            The One-Time PIN Code has been re-sent to{' '}
            {validateEmail(loginName) ? 'email' : 'mobile number'}
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

      {/* Password Update Success */}
      <Dialog show={success} size="small">
        {fakeLoading && <Loading position="fixed" />}
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="large" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 20px">Password successfully updated!</H3>
          <p style={{ margin: '0 0 20px' }}>
            You may now login using your new password
          </p>

          <Button
            fullWidth
            onClick={onCloseSuccessDialog}
            variant="contained"
            color="primary"
            size="large"
          >
            OK
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
