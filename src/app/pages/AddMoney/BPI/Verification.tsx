import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import Paragraph from 'app/components/Elements/Paragraph';
import H5 from 'app/components/Elements/H5';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';
import Logo from 'app/components/Assets/Logo';

import { FundTopUpTypes } from './types';
import Timer from 'app/components/VerifyOTP/Timer';
import useFetch from 'utils/useFetch';

export function BPIVerificationPage() {
  const history = useHistory();
  const location = useLocation();
  const resendOTP = useFetch();
  const verifyOTP = useFetch();

  const [topUpResponse, setTopUpResponse] = React.useState<FundTopUpTypes>({});
  const [accountNumber, setAccountNumber] = React.useState<any>('');
  const [smsCode, setSmsCode] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [isResend, setIsResend] = React.useState(false);
  const [resendSuccess, setResendSuccess] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [apiError, setApiError] = React.useState({ error: false, msg: '' });

  React.useEffect(() => {
    const state: any | { topup: FundTopUpTypes; accountNumber: string } =
      location.state || null;

    if (state && state.topup) {
      setAccountNumber(state.accountNumber);
      setTopUpResponse(state.topup);
    }
  }, [location]);

  React.useEffect(() => {
    if (resendOTP.response) {
      setResendSuccess(true);
      resendOTP.fetchReset();
    }
    if (resendOTP.error) {
      onApiError(resendOTP.error);
      resendOTP.fetchReset();
    }
  }, [resendOTP]);

  React.useEffect(() => {
    if (
      verifyOTP.response &&
      verifyOTP.response.status &&
      verifyOTP.response.status === 'success'
    ) {
      setIsSuccess(true);
    }
    if (verifyOTP.error) {
      onApiError(verifyOTP.error);
      verifyOTP.fetchReset();
    }
  }, [verifyOTP]);

  const onApiError = (err: any) => {
    if (err.errors) {
      const errorCodes = err.errors.error_code || false;
      // we have error codes
      if (errorCodes && errorCodes.length > 0) {
        let apiErrorMsg = '';
        errorCodes.map(j => {
          if (j === 412 || j === 424 || j === 425 || j === 426) {
            apiErrorMsg += err.errors.message.join('\n');
          }
          if (j === 151) {
            apiErrorMsg += err.errors.payload.join('\n');
          }
          return null;
        });

        setApiError({ error: true, msg: apiErrorMsg });
        return;
      }

      // no error codes, specific field errors
      if (!errorCodes || errorCodes.length === 0) {
        let apiErrorMsg = '';
        if (err.errors) {
          if (err.errors.token && err.errors.token.length > 0) {
            apiErrorMsg += err.errors.token.join('\n');
          }
          if (err.errors.transactionId && err.errors.transactionId.length > 0) {
            apiErrorMsg += err.errors.transactionId.join('\n');
          }
          if (
            err.errors.mobileNumberToken &&
            err.errors.mobileNumberToken.length > 0
          ) {
            apiErrorMsg += err.errors.mobileNumberToken.join('\n');
          }
          if (err.errors.otp && err.errors.otp.length > 0) {
            apiErrorMsg += err.errors.otp.join('\n');
          }
          if (err.errors.amount && err.errors.amount.length > 0) {
            apiErrorMsg += err.errors.amount.join('\n');
          }
          if (err.errors.refId && err.errors.refId.length > 0) {
            apiErrorMsg += err.errors.refId.join('\n');
          }
        }
        setApiError({ error: true, msg: apiErrorMsg });
        return;
      }
    }

    if (!err.errors && err.message) {
      setApiError({ error: true, msg: err.message });
      return;
    }
  };

  const onResendOTP = () => {
    const accessToken = sessionStorage.getItem('spv_addmon_acto');
    if (accessToken && topUpResponse) {
      const payload = {
        token: accessToken,
        mobileNumberToken: topUpResponse.response
          ? topUpResponse.response.body.mobileNumberToken
          : undefined,
        transactionId: topUpResponse ? topUpResponse.transactionId : undefined,
      };

      resendOTP.goFetch(
        `/bpi/otp`,
        'POST',
        JSON.stringify(payload),
        '',
        true,
        true,
      );
    }
  };

  const onVerifyOTP = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    if (smsCode.value === '') {
      hasError = true;
      setSmsCode({
        ...smsCode,
        error: true,
        msg: 'Oops! Please enter the SMS code.',
      });
    }

    if (smsCode.value && smsCode.value.length < 6) {
      hasError = true;
      setSmsCode({
        ...smsCode,
        error: true,
        msg: 'Oops! Please enter the 6 digit SMS code.',
      });
    }

    if (!hasError) {
      const amount: string = sessionStorage.getItem('spv_addmon') || '';
      const accessToken = sessionStorage.getItem('spv_addmon_acto');

      if (accessToken) {
        const payload = {
          token: accessToken,
          otp: smsCode.value,
          transactionId: topUpResponse.transactionId,
          amount: parseFloat(amount),
          refId: topUpResponse.refId,
          accountNumber: accountNumber,
        };

        verifyOTP.goFetch(
          '/bpi/process',
          'POST',
          JSON.stringify(payload),
          '',
          true,
          true,
        );
      }
    }
  };

  // Successful Fund Top Up process Modal close
  const onSuccessTopUpClose = () => {
    sessionStorage.removeItem('spv_addmon'); // add money feature
    sessionStorage.removeItem('spv_addmon_url'); // add money feature url
    sessionStorage.removeItem('spv_addmon_acto'); // add money access_token
    sessionStorage.removeItem('spv_addmon_code'); // add money code in postback url
    history.push('/dashboard');
  };

  return (
    <ProtectedContent>
      <Helmet title="Verification - Add Money via BPI" />
      <Box title="Verification" titleBorder withPadding>
        {verifyOTP.loading && <Loading position="absolute" />}
        {resendOTP.loading && <Loading position="absolute" />}
        <H5>Enter Verification Code</H5>
        <Paragraph margin="0 0 32px">
          Authentication Code is 6 digits which is sent to your mobile number{' '}
          {topUpResponse && topUpResponse.response
            ? topUpResponse.response.body.mobileNumber
            : ''}
        </Paragraph>
        <Field>
          <Label>Enter SMS Code</Label>
          <InputTextWrapper position="right">
            <Input
              id="smsCode"
              type="number"
              hidespinner
              value={smsCode.value}
              onChange={e =>
                setSmsCode({
                  value: e.currentTarget.value,
                  error: false,
                  msg: '',
                })
              }
              error={smsCode.error}
            />
            {!isResend && (
              <Timer
                count={59}
                onStop={() => setIsResend(true)}
                start={Boolean(topUpResponse) || false}
                suffix="s"
              />
            )}
          </InputTextWrapper>
        </Field>
        <Flex
          justifyContent="flex-start"
          alignItems="center"
          style={{ marginTop: 32 }}
        >
          <div style={{ flex: 1 }}>
            Need a new code?
            <Button
              onClick={onResendOTP}
              color="primary"
              style={{ padding: 0 }}
              disabled={!isResend}
            >
              Resend OTP
            </Button>
          </div>
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            onClick={onVerifyOTP}
            disabled={smsCode.value === ''}
          >
            Verify
          </Button>
        </Flex>
      </Box>

      {/* Fund Top Up Success */}
      <Dialog show={isSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">Transaction successful</H3>
          <Button
            fullWidth
            onClick={onSuccessTopUpClose}
            variant="contained"
            color="primary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>

      {/* OTP Resend Success */}
      <Dialog show={resendSuccess} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">OTP has successfully been resend.</H3>
          <Button
            fullWidth
            onClick={() => {
              setResendSuccess(false);
              setIsResend(false);
            }}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>
      {/* API error message */}
      <Dialog show={apiError.error} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">Transaction Failed</H3>
          <Paragraph align="center">{apiError.msg}</Paragraph>
          <Button
            fullWidth
            onClick={() => {
              if (isResend) {
                setApiError({ error: false, msg: '' });
              }
              if (!isResend) {
                onSuccessTopUpClose();
              }
            }}
            variant="outlined"
            color="secondary"
            size="large"
          >
            Close
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
