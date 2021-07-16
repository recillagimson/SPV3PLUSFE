/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Change Pin
 */
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
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Logo from 'app/components/Assets/Logo';

import H3 from 'app/components/Elements/H3';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Dialog from 'app/components/Dialog';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';

import VerifyOTP from 'app/components/VerifyOTP';
import { validateEmail } from 'app/components/Helpers';

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

export function SettingsChangePinPage() {
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
  const [showForm, setShowForm] = React.useState(true);
  const [showVerify, setShowVerify] = React.useState(false);
  // const [resendCode, setResendCode] = React.useState(false);
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);

  const [currentPin, setCurrentPin] = React.useState({
    value: '',
    error: false,
    show: false,
    msg: '', // custom error message
  });
  const [newPin, setNewPin] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [confirmPin, setConfirmPin] = React.useState({
    value: '',
    error: false,
    show: false,
  });
  const [pinError, setPinError] = React.useState('');

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
          setPinError("Oops! Account doesn't exist");
          return;
        }

        if (
          i105 !== -1 &&
          err.errors.payload &&
          err.errors.payload.length > 0
        ) {
          setPinError(
            'Your Account has been locked, Please contact Squidpay Support for assistance in unlocking your account.',
          );
          return;
        }

        if (
          i106 !== -1 &&
          err.errors.message &&
          err.errors.message.length > 0
        ) {
          setPinError('Oops! Pin already been used');
          return;
        }

        if (
          i107 !== -1 &&
          err.errors.payload &&
          err.errors.payload.length > 0
        ) {
          setPinError('Pin cannot be changed for at least 1 day/s.');
          return;
        }
      }

      if (err.errors && !err.errors.error_code) {
        let apiError = '';
        if (err.errors.pin_code && err.errors.pin_code.length > 0) {
          setCurrentPin({
            ...currentPin,
            error: true,
            msg: 'Oops. Your current pin is incorrect.',
          });
        }

        if (
          err.errors.current_pin_code &&
          err.errors.current_pin_code.length > 0
        ) {
          apiError += err.errors.current_pin_code.join('\n');
        }
        if (err.errors.new_pin_code && err.errors.new_pin_code.length > 0) {
          apiError += err.errors.new_pin_code.join('\n');
        }
        if (
          err.errors.new_pin_code_confirmation &&
          err.errors.new_pin_code_confirmation.length > 0
        ) {
          apiError += err.errors.new_pin_code_confirmation.join('\n');
        }

        setPinError(apiError);
        return;
      }
    }

    if (!err.code && err.response && err.response.status !== 422) {
      setPinError(err.response.statusText);
      return;
    }

    if (!err.response && (!err.code || err.code !== 422)) {
      setPinError(err.message);
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

    const digitOnly = new RegExp('^[0-9]*$');
    let hasError = false;
    setApiError(false);

    if (currentPin.value === '') {
      hasError = true;
      setCurrentPin({
        ...currentPin,
        error: true,
        msg: 'Please enter your current pin',
      });
    }

    if (currentPin.value !== '') {
      if (!digitOnly.test(currentPin.value)) {
        hasError = true;
        setCurrentPin({
          ...currentPin,
          error: true,
          msg: 'Please enter your current pin with digits only',
        });
      }
      if (digitOnly.test(currentPin.value) && currentPin.value.length < 4) {
        hasError = true;
        setCurrentPin({
          ...currentPin,
          error: true,
          msg: 'Pin should be 4 digits',
        });
      }
    }

    if (newPin.value === '') {
      hasError = true;
      setNewPin({ ...newPin, error: true });
    }

    if (confirmPin.value === '') {
      hasError = true;
      setConfirmPin({ ...confirmPin, error: true });
    }

    if (
      newPin.value !== '' &&
      confirmPin.value !== '' &&
      newPin.value !== confirmPin.value
    ) {
      hasError = true;
      setPinError('Oops. Your pin does not match.');
    }

    if (
      newPin.value !== '' &&
      confirmPin.value !== '' &&
      newPin.value === confirmPin.value
    ) {
      if (!digitOnly.test(newPin.value)) {
        hasError = true;
        setPinError(
          'Oops. Your new pin and confirm pin should be digits only.',
        );
      }
      if (digitOnly.test(newPin.value) && newPin.value.length < 4) {
        hasError = true;
        setPinError('Oops. Your new pin and confirm must be 4 digit.');
      }
    }

    if (!hasError) {
      const data = {
        current_pin_code: currentPin.value,
        new_pin_code: newPin.value,
        new_pin_code_confirmation: confirmPin.value,
      };

      dispatch(actions.getValidateLoading(data));
    }
  };

  const onResendCode = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    const data = {
      current_pin_code: currentPin.value,
      new_pin_code: newPin.value,
      new_pin_code_confirmation: confirmPin.value,
    };

    dispatch(actions.getValidateLoading(data));
  };

  const onSubmitPassword = () => {
    const data = {
      current_pin_code: currentPin.value,
      new_pin_code: newPin.value,
      new_pin_code_confirmation: confirmPin.value,
    };

    dispatch(actions.getFetchLoading(data));
  };

  const onCloseSuccessDialog = () => {
    setShowForm(true);
    setShowVerify(false);
    setCurrentPin({
      value: '',
      error: false,
      show: false,
      msg: '',
    });
    setNewPin({
      value: '',
      error: false,
      show: false,
    });
    setConfirmPin({
      value: '',
      error: false,
      show: false,
    });
    setPinError('');
    dispatch(actions.getFetchReset());
  };

  const onCloseResendDialog = () => {
    setShowResendSuccess(false);
    dispatch(actions.getValidateReset());
  };

  return (
    <ProtectedContent>
      <Helmet>
        <title>Change Pin Code [Settings]</title>
      </Helmet>

      {showForm && (
        <Box
          title="Change Pin Code"
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
            <Label>Enter your current Pin</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={currentPin.show ? 'number' : 'password'}
                  value={currentPin.value}
                  onChange={e =>
                    setCurrentPin({
                      ...currentPin,
                      value: e.currentTarget.value,
                      error: false,
                      msg: '',
                    })
                  }
                  className={currentPin.error || apiError ? 'error' : undefined}
                  placeholder="Current Pin"
                  required
                  autoComplete="off"
                  hidespinner
                  maxLength={4}
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setCurrentPin({
                      ...currentPin,
                      show: !currentPin.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon
                    icon={currentPin.show ? 'eye-slash' : 'eye'}
                  />
                </IconButton>
              </InputIconWrapper>
              {currentPin.error && (
                <ErrorMsg formError>{currentPin.msg}</ErrorMsg>
              )}
              {apiError && (
                <ErrorMsg formError>
                  Oops. Your current pin is incorrect.
                </ErrorMsg>
              )}
            </div>
          </Field>
          <Field flex>
            <Label>New Pin code</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={newPin.show ? 'number' : 'password'}
                  value={newPin.value}
                  onChange={e => {
                    setNewPin({
                      ...newPin,
                      value: e.currentTarget.value,
                      error: false,
                    });
                    setPinError('');
                  }}
                  className={
                    newPin.error || Boolean(pinError) ? 'error' : undefined
                  }
                  placeholder="New Pin code"
                  required
                  autoComplete="off"
                  hidespinner
                  maxLength={4}
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setNewPin({
                      ...newPin,
                      show: !newPin.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon icon={newPin.show ? 'eye-slash' : 'eye'} />
                </IconButton>
              </InputIconWrapper>
              {newPin.error && (
                <ErrorMsg formError>Please enter your new pin code</ErrorMsg>
              )}
            </div>
          </Field>
          <Field flex>
            <Label>Enter your new pin again</Label>
            <div style={{ flexGrow: 1 }}>
              <InputIconWrapper>
                <Input
                  type={confirmPin.show ? 'number' : 'password'}
                  value={confirmPin.value}
                  onChange={e => {
                    setConfirmPin({
                      ...confirmPin,
                      value: e.currentTarget.value,
                      error: false,
                    });
                    setPinError('');
                  }}
                  className={
                    confirmPin.error || Boolean(pinError) ? 'error' : undefined
                  }
                  placeholder="Enter your new pin again"
                  required
                  autoComplete="off"
                  hidespinner
                  maxLength={4}
                />
                <IconButton
                  type="button"
                  onClick={() =>
                    setConfirmPin({
                      ...confirmPin,
                      show: !confirmPin.show,
                    })
                  }
                  tabIndex={-1}
                >
                  <FontAwesomeIcon
                    icon={confirmPin.show ? 'eye-slash' : 'eye'}
                  />
                </IconButton>
              </InputIconWrapper>
              {confirmPin.error && (
                <ErrorMsg formError>Please retype your new pin</ErrorMsg>
              )}
              {Boolean(pinError) && <ErrorMsg formError>{pinError}</ErrorMsg>}
            </div>
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
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="lock" />
            </CircleIndicator>
            <H3 margin="35px 0 10px">Enter 4-Digit one time PIN</H3>
            <p className="f-small">
              The one time pin code has been sent to{' '}
              {validateEmail(loginName) ? 'email' : 'mobile number'}
            </p>

            <VerifyOTP onSuccess={onSubmitPassword} apiURL="/user/pin/verify" />

            <Field className="text-center f-small" margin="20px 0 10px">
              Need a new code?{' '}
              <A to="#" className="link" onClick={onResendCode} color="gold">
                Resend Code
              </A>
            </Field>
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
            The one time pin code has been re-sent to{' '}
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
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="large" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 20px">PIN successfully updated!</H3>
          <p style={{ margin: '0 0 20px' }}>
            Use your pin code every time you access SquidPay
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
