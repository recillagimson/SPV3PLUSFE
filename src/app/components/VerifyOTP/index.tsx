/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useSelector } from 'react-redux';
import OtpInput from 'react-otp-input';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Loading from 'app/components/Loading';
import Button from 'app/components/Elements/Button';
import A from 'app/components/Elements/A';
import Dialog from 'app/components/Dialog';
import H3 from 'app/components/Elements/H3';
import Paragraph from 'app/components/Elements/Paragraph';

/** selector */
import { selectOTPDetails } from 'app/App/slice/selectors';

import useFetch from 'utils/useFetch';

import Wrapper from './Wrapper';
import Timer from './Timer';

type VerifyOTPComponentProps = {
  /**
   * Callback when verify otp is successfull
   */
  onSuccess: () => void;
  /**
   * API Endpoint for Verifying OTP
   * @default ''
   */
  verifyURL: string;
  /**
   * If using User Token on Verifying OTP
   * @default false
   */
  isVerifyUserToken?: boolean;
  /**
   * API Endpoint for resending OTP
   * NOTE: if this is not defined, resend otp message will not be shown
   * @default ''
   */
  resendURL: string;
  /**
   * Payload for Resending OTP
   * Should pass a JSON.stringified payload
   * @default ''
   */
  resendPayload: string;
  /**
   * If using User Token on Resending OTP
   */
  isResendUserToken?: boolean;
  /**
   * OTP Type, refer to API Documentation on this value,
   * This will be added to the payload when verifying the OTP
   * NOTE: don't defined if not specified in documentation
   */
  otpType?: string;
  /**
   * Pass this value, if we are coming from unauthenticated routes (ie: /login, /register, etc)
   * NOTE: don't pass this prop if we are already logged in (this will be done automatically)
   */
  isEmail?: boolean;
  /**
   * Pass this value, if we are coming from unauthenticated routes (ie: /login, /register, etc)
   * NOTE: don't pass this prop if we are already logged in (this will be done automatically)
   */
  viaValue?: string;
  /**
   * Verify OTP title heading
   * @default 'Enter 4-digit One-Time PIN'
   */
  title?: string;
};

/**
 * This will verify OTP code and Resend Code
 *
 * @typedef VerifyOTPComponentProps
 */
export default function VerifyOTPComponent({
  onSuccess,
  verifyURL,
  isVerifyUserToken,
  resendURL,
  resendPayload,
  isResendUserToken,
  otpType,
  isEmail,
  viaValue,
  title,
}: VerifyOTPComponentProps) {
  const verify = useFetch();
  const resend = useFetch();

  const otpDetails = useSelector(selectOTPDetails);
  let otpMessage = otpDetails.isEmail
    ? `email: ${otpDetails.value}`
    : `mobile number: ${otpDetails.value}`;
  if (isEmail && viaValue) {
    otpMessage = isEmail ? `email: ${viaValue}` : `mobile number: ${viaValue}`;
  }

  const [code, setCode] = React.useState({ value: '', error: false, msg: '' });
  const [isLimit, setIsLimit] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState({
    show: false,
    error: false,
  });
  const [resendMsg, setResendMsg] = React.useState('');

  const onApiError = React.useCallback(
    (err: any) => {
      let errorCode =
        err.errors && err.errors.error_code ? err.errors.error_code : false;

      if (errorCode && errorCode.length > 0) {
        errorCode.map(i => {
          if (i === 108) {
            setCode({
              ...code,
              error: true,
              msg: err.errors.message.join('\n'),
            });
            return null;
          }
          if (i === 109) {
            setCode({
              ...code,
              error: true,
              msg: err.errors.message.join('\n'),
            });
            return null;
          }

          if (i === 110) {
            setCode({
              ...code,
              error: true,
              msg: err.errors.message.join('\n'),
            });
            setIsLimit(true);
            return null;
          }
          return null;
        });
      }

      if (!errorCode && err.errors) {
        if (err.errors.code && err.errors.code.length > 0) {
          setCode({ ...code, error: true, msg: err.errors.code.join('\n') });
        } else {
          setCode({ ...code, error: true, msg: err.message });
        }
      }

      if (!errorCode && !err.errors && err.response) {
        setCode({ ...code, error: true, msg: err.response.statusText });
      }
    },
    [code],
  );

  React.useEffect(() => {
    if (verify.error) {
      onApiError(verify.error);
      verify.fetchReset();
    }

    if (verify.response) {
      onSuccess();
      verify.fetchReset();
    }

    if (resend.error || resend.response) {
      if (resend.error) {
        setShowDialog({ show: true, error: true });
        setResendMsg(
          `We are having problem resending the OTP to your ${otpMessage}. Please try again later.`,
        );
      }
      if (resend.response) {
        setShowDialog({ show: true, error: false });
        setResendMsg(`OTP has successfully been resent to your ${otpMessage}.`);
      }
      resend.fetchReset();
    }
  }, [verify, resend]);

  const onVerifyOTP = () => {
    let hasError = false;
    if (verify.loading) {
      return;
    }

    if (code.value === '' || (code.value && code.value.length < 4)) {
      hasError = true;
      setCode({ ...code, error: true, msg: 'Please enter 4 Digit OTP.' });
    }

    if (!hasError) {
      setCode({ ...code, error: false, msg: '' });

      const payload = {
        mobile_number: viaValue && !isEmail ? viaValue : undefined,
        email: viaValue && isEmail ? viaValue : undefined,
        code: code.value,
        otp_type: otpType ? otpType : undefined,
      };

      verify.goFetch(
        verifyURL,
        'POST',
        JSON.stringify(payload),
        '',
        isVerifyUserToken,
        true,
      );
    }
  };

  const onResendOTP = () => {
    setCode({ value: '', error: false, msg: '' });

    if (verify.loading || resend.loading) {
      return;
    }

    resend.goFetch(
      resendURL,
      'POST',
      resendPayload,
      '',
      isResendUserToken,
      true,
    );
  };

  if (verifyURL === '') {
    return null;
  }

  return (
    <Wrapper id="verifyOtp">
      {(verify.loading || resend.loading) && <Loading position="absolute" />}

      <CircleIndicator size="large">
        <FontAwesomeIcon icon="lock" />
      </CircleIndicator>

      <H3 margin="35px 0 10px">{title || 'Enter 4-digit One-Time PIN'}</H3>
      <Paragraph align="center" margin="0 0 45px">
        A One-Time PIN has been sent to your {otpMessage}
      </Paragraph>

      <OtpInput
        value={code.value}
        onChange={c => setCode({ value: c, error: false, msg: '' })}
        numInputs={4}
        isInputNum
        hasErrored={code.error}
        containerStyle="otp-input"
        inputStyle={{ width: 50 }}
        errorStyle={code.error ? 'error-otp' : undefined}
      />

      <Paragraph
        align="center"
        color="danger"
        margin="0 0 0"
        style={{ minHeight: 44 }}
      >
        {code.msg || ' '}
      </Paragraph>

      <Button
        type="submit"
        onClick={onVerifyOTP}
        color="primary"
        fullWidth={true}
        size="large"
        variant="contained"
        // disabled={code.value.length < 4}
      >
        VERIFY
      </Button>

      {resendURL !== '' && (
        <Paragraph size="small" margin="20px 0" align="center">
          Need a new code?{' '}
          {isLimit && (
            <>
              Please wait{' '}
              <Timer
                onStop={() => setIsLimit(false)}
                count={60}
                start={isLimit}
              />
              s
            </>
          )}
          {!isLimit && (
            <A as="a" onClick={onResendOTP} color="gold">
              Resend code
            </A>
          )}
        </Paragraph>
      )}

      <Dialog show={showDialog.show} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <CircleIndicator
            color={showDialog.error ? 'danger' : 'primary'}
            size="large"
          >
            <FontAwesomeIcon icon={resend.error ? 'times' : 'check'} />
          </CircleIndicator>

          <H3 margin="30px 0 10px" align="center">
            Resend OTP {showDialog.error ? 'Failed' : 'Success'}
          </H3>
          <p style={{ marginBottom: 35 }}>{resendMsg}</p>
          <Button
            fullWidth
            onClick={() => setShowDialog({ show: false, error: false })}
            variant="contained"
            color="primary"
            size="large"
            style={{
              marginBottom: '10px',
            }}
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </Wrapper>
  );
}
