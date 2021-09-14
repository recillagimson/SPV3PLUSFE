/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import { H3 } from 'app/components/Typography';
import Field from 'app/components/Elements/Fields';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import VerifyOTP from 'app/components/VerifyOTP';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import PinInput from 'app/components/Elements/PinInput';
import TermsCondition from 'app/components/TermsCondition';
import PrivacyPolicy from 'app/components/PrivacyPolicy';

import Stepper from 'app/components/Elements/Stepper';

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

import AccountForm from './AccountForm';

export function RegisterPage() {
  const history = useHistory();
  const location: any = useLocation();

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
  const [showCreate, setShowCreate] = React.useState(true);
  const [showPin, setShowPin] = React.useState(false);
  const [showPinConfirm, setShowPinConfirm] = React.useState(false);
  const [showPinCreated, setShowPinCreated] = React.useState(false);
  const [showVerify, setShowVerify] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [showAgreePrivacy, setShowAgreePrivacy] = React.useState(false);
  const [showAgreeTerms, setShowAgreeTerms] = React.useState(false);
  const [agreePrivacy, setAgreePrivacy] = React.useState(false);
  const [agreeTerms, setAgreeTerms] = React.useState(false);

  const [activeSteps, setActiveSteps] = React.useState({
    1: true,
    2: false,
    3: false,
  });

  const [isEmail, setIsEmail] = React.useState(false);
  const [preFill, setPreFill] = React.useState({});
  const [accountFormData, setAccountFormData] = React.useState<any>({});

  // form fields
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
    if (location && location.state) {
      console.log(location.state);
      setPreFill(location?.state || {});
      setIsEmail(location?.state?.isEmail || false);
    }
  }, [location]);

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
          emailError = error.errors.email.join('\n');
        }
        if (error.errors.password && error.errors.password.length > 0) {
          passError = error.errors.password.join('\n');
        }
        if (
          error.errors.mobile_number &&
          error.errors.mobile_number.length > 0
        ) {
          mobileError = error.errros.mobile_number.join('\n');
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

    if (!error.code && !error.response) {
      setApiError(error.message);
    }

    setIsError(true);
  };

  // show the correct form based on selection (email or mobile)
  const onSuccessValidation = (
    emailFlag: boolean,
    data: {
      email: string | undefined;
      mobile_number: string | undefined;
      password: string;
      password_confirmation: string;
    },
  ) => {
    setIsEmail(emailFlag);
    setAccountFormData(data);
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
      ...accountFormData,
      pin_code: pin.value,
    };

    // pass payload to saga
    // dispatch(actions.getFetchLoading(data));
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
    // const data = {
    //   email: isEmail ? username.value : undefined,
    //   mobile_number: !isEmail ? username.value : undefined,
    //   otp_type: 'registration',
    // };
    // dispatch(actions.getResendCodeLoading(data));
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

  const steps = [
    {
      name: 'Log in Details',
      active: activeSteps[1],
    },
    {
      name: 'Security Setup',
      active: activeSteps[2],
    },
    {
      name: 'User Information',
      active: activeSteps[3],
    },
  ];

  return (
    <Wrapper align="flex-start">
      <Helmet title="Register" />
      <div className="form-container">
        <Stepper steps={steps} margin="0 0 35px" />
        {loading && <Loading position="fixed" />}
        {isLoading && <Loading position="fixed" />}

        {showCreate && (
          <AccountForm
            preFill={preFill}
            onSuccessValidation={onSuccessValidation}
          />
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
            <VerifyOTP
              onSuccess={onCodeVerified}
              isEmail={isEmail}
              viaValue={
                isEmail ? accountFormData.email : accountFormData.mobile_number
              }
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
        <div className="text-center" style={{ padding: 20 }}>
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

      <Dialog
        show={showAgreeTerms}
        title="Terms and Conditions"
        size="large"
        onClick={() => {
          setShowAgreeTerms(false);
          setAgreeTerms(true);
        }}
        onClose={() => {
          setShowAgreeTerms(false);
          setAgreeTerms(false);
        }}
        okText="Agree"
        cancelText="Disagree"
      >
        <div style={{ padding: 20 }}>
          <TermsCondition />
        </div>
      </Dialog>

      <Dialog
        show={showAgreePrivacy}
        title="Privacy Policy"
        size="large"
        onClick={() => {
          setShowAgreePrivacy(false);
          setAgreePrivacy(true);
          setAgree({ ...agree, error: false });
        }}
        onClose={() => {
          setShowAgreePrivacy(false);
          setAgreePrivacy(false);
          setAgree({ ...agree, error: false });
        }}
        okText="Agree"
        cancelText="Disagree"
      >
        <div style={{ padding: 20 }}>
          <PrivacyPolicy />
        </div>
      </Dialog>
    </Wrapper>
  );
}
