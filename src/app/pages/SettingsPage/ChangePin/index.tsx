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
import A from 'app/components/Elements/A';
import Logo from 'app/components/Assets/Logo';

import H3 from 'app/components/Elements/H3';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Dialog from 'app/components/Dialog';

import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import IconButton from 'app/components/Elements/IconButton';
import PinInput from 'app/components/Elements/PinInput';
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
  selectError,
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
  const error = useSelector(selectError);
  const success = useSelector(selectData);

  const validateLoading = useSelector(selectValidateLoading);
  const validateError = useSelector(selectValidateError);
  const validateSuccess = useSelector(selectValidateData);

  // show different UI
  const [fakeLoading, setFakeLoading] = React.useState(false);
  const [showCurrentPin, setShowCurrentPin] = React.useState(true);
  const [showNewPin, setShowNewPin] = React.useState(false);
  const [showConfirmPin, setShowConfirmPin] = React.useState(false);

  const [currentPin, setCurrentPin] = React.useState({
    value: '',
    error: false,
  });
  const [newPin, setNewPin] = React.useState({
    value: '',
    error: false,
  });
  const [confirmPin, setConfirmPin] = React.useState({
    value: '',
    error: false,
  });

  // api related error state
  const [apiError, setApiError] = React.useState(false);
  const [showResendSuccess, setShowResendSuccess] = React.useState(false);

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
      setShowNewPin(false);
      setShowConfirmPin(true);

      // reset the validate success
      dispatch(actions.getValidateReset());
      setApiError(false);
    }
  }, [validateSuccess, validateError]);

  // check the error payload
  const apiErrorMessage = err => {
    if (err.code && err.code === 422) {
      // return the errors
      // const i106 = err.errors.error_code
      //   ? err.errors.error_code.find(j => j === 106)
      //   : -1;

      // const i107 = err.errors.error_code
      //   ? err.errors.error_code.find(j => j === 107)
      //   : -1;

      if (err.errors && err.errors.password && err.errors.password.length > 0) {
        setApiError(true);
      }
    }

    // if (!err.code && err.response && err.response.status !== 422) {
    //   setPassError(err.response.statusText);
    //   return;
    // }

    // if (!err.response && (!err.code || err.code !== 422)) {
    //   setPassError(err.message);
    // }

    // if (validateSuccess) {
    //   setShowForm(false);
    //   setShowVerify(true);
    // }
  };

  const onSubmitValidate = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    setApiError(false);

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
        <title>Change Pin [Settings]</title>
      </Helmet>

      {showCurrentPin && (
        <Box withPadding>
          <PinInput
            length={4}
            onChange={p => setCurrentPin({ value: p, error: false })}
            value={currentPin.value}
            isValid={!currentPin.error}
          />
        </Box>
      )}

      {showNewPin && (
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
              {validateEmail(loginName) ? 'email' : 'mobile number'}
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
        {fakeLoading && <Loading position="absolute" />}
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 20px">
            Great! You’ve successfully updated your password
          </H3>
          <p className="f-small">
            To continue you need to login again. Click Ok to logout.
          </p>

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
    </ProtectedContent>
  );
}
