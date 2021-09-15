/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Loading from 'app/components/Loading';
import { H4, Paragraph } from 'app/components/Typography';
import Field from 'app/components/Elements/Fields';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import VerifyOTP from 'app/components/VerifyOTP';
import UpdateProfile from 'app/components/UpdateProfile/Profile';

import Dialog from 'app/components/Dialog';
import Wrapper from 'app/components/Layouts/AuthWrapper';

import Stepper from 'app/components/Elements/Stepper';

/** slice */
import { selectResendCodeData, selectResendCodeError } from './slice/selectors';

import AccountForm from './AccountForm';
import PINCreation from './PINCreation';
import useFetch from 'utils/useFetch';

export function RegisterPage() {
  const history = useHistory();
  const location: any = useLocation();

  const { loading, error, response, goFetch, fetchReset } = useFetch();

  const resendSuccess: any = useSelector(selectResendCodeData);
  const resendError: any = useSelector(selectResendCodeError);

  // API related states
  const [isLoading, setIsLoading] = React.useState(false);
  const [isError, setIsError] = React.useState(false);
  const [apiError, setApiError] = React.useState('');
  const [resendDialog, setResendDialog] = React.useState(false);

  // show proper forms
  const [showCreate, setShowCreate] = React.useState(true);
  const [showPinCreation, setShowPinCreation] = React.useState(false);
  const [showVerifyOTP, setShowVerifyOTP] = React.useState(false);
  const [showProfileForm, setShowProfileForm] = React.useState(false);
  const [isWelcome, setIsWelcome] = React.useState(false);
  const [showSuccess, setShowSuccess] = React.useState(false);

  const [activeSteps, setActiveSteps] = React.useState({
    1: true,
    2: false,
    3: false,
  });

  const [isEmail, setIsEmail] = React.useState(false);
  const [preFill, setPreFill] = React.useState({});
  const [accountFormData, setAccountFormData] = React.useState<any>({});
  const [userID, setUserID] = React.useState('');

  React.useEffect(() => {
    return () => {
      fetchReset();
    };
  }, []);

  React.useEffect(() => {
    if (location && location.state) {
      setPreFill(location?.state || {});
      setIsEmail(location?.state?.isEmail || false);
    }
  }, [location]);

  React.useEffect(() => {
    if (response && response.id) {
      setUserID(response.id);
      setShowPinCreation(false);
      setShowVerifyOTP(true);
      fetchReset();
    }
    if (error && Object.keys(error).length > 0) {
      apiErrorMessage();
      fetchReset();
    }
  }, [response, error]);

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
    setActiveSteps({
      ...activeSteps,
      2: true,
    });
    setShowCreate(false);
    setShowPinCreation(true);
  };

  // submit data to api
  const onSubmitCreateAccount = (pin: string) => {
    const payload = {
      ...accountFormData,
      pin_code: pin,
    };

    // Create account
    goFetch('/auth/register', 'POST', JSON.stringify(payload), '', false, true);
  };

  const onCodeVerified = () => {
    setShowVerifyOTP(false);
    setIsWelcome(true);
    setShowProfileForm(true);
  };

  // clicking the success dialog
  const onClickSuccess = () => {
    history.replace('/'); // redirect to home
  };

  // close error dialog
  const onCloseErrorDialog = () => {
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

        {showPinCreation && (
          <PINCreation onSuccessPinCreation={onSubmitCreateAccount} />
        )}

        {showVerifyOTP && (
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
        {showProfileForm && (
          <UpdateProfile
            onSuccess={() => setShowSuccess(true)}
            isBronze
            firstTime
          />
        )}

        {showSuccess && (
          <div className="text-center" style={{ padding: '0 40px' }}>
            <CircleIndicator size="large">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H4 margin="25px 0 25px">You've successfully registered.</H4>

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

      {/* Welcome Squidee */}
      <Dialog show={isWelcome} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <img src="/img/welcome-squidee.png" alt="Welcome Squidee!" />
          <H4 margin="30px 0 10px">Welcome Squidee!</H4>
          <Paragraph margin="0 0 35px">
            Great to have you on board! Help us get to know you better by
            filling up some important information about yourself.
          </Paragraph>
          <Button
            fullWidth
            onClick={() => setIsWelcome(false)}
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '10px',
            }}
          >
            Close
          </Button>
        </div>
      </Dialog>

      <Dialog show={isError} size="small">
        <div className="text-center">
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H4 margin="15px 0 10px">Registration Failed</H4>
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
          <H4 margin="15px 0 10px">
            {resendSuccess ? 'Resend Code Success' : 'Resend Code Error'}
          </H4>
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
    </Wrapper>
  );
}
