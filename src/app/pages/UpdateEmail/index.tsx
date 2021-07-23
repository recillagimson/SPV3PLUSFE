/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Updating User Email via Add Money (Dragonpay)
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import InputIconWrapper from 'app/components/Elements/InputIconWrapper';
import Label from 'app/components/Elements/Label';
import Button from 'app/components/Elements/Button';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';

import VerifyOTP from 'app/components/VerifyOTP';

/** selectors, slice */
import { appActions } from 'app/App/slice';
import {
  selectLoading,
  selectError,
  selectData,
  selectValidateLoading,
  selectValidateError,
  selectValidateData,
  selectResendLoading,
  selectResendError,
  selectResendData,
} from './slice/selectors';
import { useContainerSaga } from './slice';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import { validateEmail } from 'app/components/Helpers';

export function UpdateEmailPage() {
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const location: any = useLocation();
  const history = useHistory();

  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const success = useSelector(selectData);

  const validateLoading = useSelector(selectValidateLoading);
  const validateError: any = useSelector(selectValidateError);
  const validateSuccess = useSelector(selectValidateData);

  const resendLoading = useSelector(selectResendLoading);
  const resendError: any = useSelector(selectResendError);
  const resendSuccess = useSelector(selectResendData);

  const [showForm, setShowForm] = React.useState(true);
  const [showVerify, setShowVerify] = React.useState(false);

  const [fromPath, setFromPath] = React.useState('/dashboard');
  const [email, setEmail] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  const [apiError, setApiError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  React.useEffect(
    () => () => {
      dispatch(actions.getFetchReset());
      dispatch(actions.getValidateReset());
      dispatch(actions.getResendReset());
    },
    [],
  );

  React.useEffect(() => {
    if (location && location.state && location.state !== '') {
      setFromPath(location.state || '/dashboard');
    }
  }, [location]);

  React.useEffect(() => {
    if (validateError && Object.keys(validateError).length > 0) {
      onApiError(validateError);
    }
    if (resendError && Object.keys(resendError).length > 0) {
      onApiError(resendError);
    }
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
  }, [validateError, resendError, error]);

  React.useEffect(() => {
    if (validateSuccess) {
      setShowForm(false);
      setShowVerify(true);
      setTimeout(() => {
        // const data = {
        //   otp_type: 'update_email',
        // };
        // dispatch(actions.getResendLoading(data));
        dispatch(actions.getValidateReset());
      }, 200);
    }

    if (resendSuccess) {
      setTimeout(() => {
        dispatch(actions.getResendReset());
      }, 200);
    }
  }, [validateSuccess, resendSuccess]);

  const onApiError = (err: any) => {
    let msg = '';
    if (err && err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        err.errors.error_code.map(j => {
          if (j === 110) {
            msg = err.errors.message.join('\n');
            return msg;
          }
          if (j === 407) {
            msg = err.errors.message.join('\n');
            return msg;
          }
          return msg;
        });
        setApiErrorMsg(msg);
      }

      if (err.errors && !err.errors.error_code) {
        msg = '';
        if (err.errors.otp_type) {
          msg += err.errors.otp_type.join('\n');
        }
        if (err.errors.email) {
          msg += err.errors.email.join('\n');
        }
        setApiErrorMsg(msg);
      }
    }
    if (!error.code && error.response && error.response.status !== 422) {
      setApiError(error.response.statusText);
    }

    if (!error.response && (!error.code || error.code !== 422)) {
      setApiError(error.message);
    }
    setApiError(true);
  };

  const onValidate = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let hasError = false;

    if (email.value === '') {
      hasError = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Oops, please enter a your email address.',
      });
    }

    if (email.value !== '' && !validateEmail(email.value)) {
      hasError = true;
      setEmail({
        ...email,
        error: true,
        msg: 'Oops, please enter a valid email address.',
      });
    }

    if (!hasError) {
      const data = {
        email: email.value,
      };
      dispatch(actions.getValidateLoading(data));
    }
  };

  const onResendCode = () => {
    // const data = {
    //   otp_type: 'update_email',
    // };
    // dispatch(actions.getResendLoading(data));
    const data = {
      email: email.value,
    };
    dispatch(actions.getResendLoading(data));
  };

  const onCodeVerified = () => {
    const data = {
      email: email.value,
    };
    dispatch(actions.getFetchLoading(data));
  };

  const onCloseSuccessDialog = () => {
    dispatch(actions.getFetchReset());
    setEmail({
      value: '',
      error: false,
      msg: '',
    });

    dispatch(appActions.getLoadUserProfile());
    history.push(fromPath);
  };

  let showAsDialog = false;
  if (showVerify && apiError) {
    showAsDialog = true;
  } else {
    showAsDialog = false;
  }

  return (
    <ProtectedContent>
      <Helmet>
        <title>Update Email</title>
      </Helmet>
      {showForm && (
        <Box
          title="Update Email Address"
          titleBorder
          footerAlign="right"
          footer={
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => history.push(fromPath)}
              >
                Cancel
              </Button>
              <Button variant="contained" color="primary" onClick={onValidate}>
                Submit
              </Button>
            </>
          }
        >
          {validateLoading && <Loading position="absolute" />}
          <div id="updateEmail" style={{ padding: '20px 25px' }}>
            <Field>
              <Label>Email Addres</Label>
              <InputIconWrapper left>
                <FontAwesomeIcon icon="envelope" className="icon" />
                <Input
                  type="text"
                  placeholder="Enter your email"
                  value={email.value}
                  onChange={e => {
                    setEmail({
                      value: e.currentTarget.value,
                      error: false,
                      msg: '',
                    });
                    setApiErrorMsg('');
                    setApiError(false);
                    dispatch(actions.getValidateReset());
                  }}
                  error={email.error}
                  required
                />
              </InputIconWrapper>

              {email.error && <ErrorMsg formError>{email.msg}</ErrorMsg>}
              {!showAsDialog && apiError && (
                <ErrorMsg formError>{apiErrorMsg}</ErrorMsg>
              )}
            </Field>
          </div>
        </Box>
      )}

      {showVerify && (
        <Box title="4-Digit One Time PIN" titleBorder withPadding>
          {loading && <Loading position="absolute" />}
          {resendLoading && <Loading position="absolute" />}
          <div
            className="text-center"
            style={{ maxWidth: 380, margin: '0 auto' }}
          >
            <H3 margin="35px 0 10px">Enter 4-Digit one time PIN</H3>
            <p className="f-small">
              The one time pin code has been sent to your email address
            </p>

            <VerifyOTP
              onSuccess={onCodeVerified}
              otpType="update_email"
              apiURL="/auth/verify/otp"
              isUserToken
            />

            <Field className="text-center f-small" margin="20px 0 10px">
              Need a new code?{' '}
              <button className="btn-resend-code" onClick={onResendCode}>
                Resend Code
              </button>
            </Field>
          </div>
        </Box>
      )}

      {/* Show success */}
      <Dialog show={success} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 10px">Email address successfully saved</H3>
          <p>
            All set! You have successfully updated your account information.
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

      {/* Show error */}
      <Dialog show={showAsDialog} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="secondary">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>

          <p>{apiErrorMsg}</p>
          <Button
            fullWidth
            onClick={() => {
              setApiErrorMsg('');
              setApiError(false);
            }}
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
