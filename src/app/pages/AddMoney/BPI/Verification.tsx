import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

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

import { FundTopUpTypes } from './types';
import Timer from 'app/components/VerifyOTP/Timer';
import useFetch from 'utils/useFetch';

export function BPIVerificationPage() {
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
  const [apiError, setApiError] = React.useState({ error: false, msg: '' });

  React.useEffect(() => {
    const state: any | { topup: FundTopUpTypes; accountNumber: string } =
      location.state || null;

    if (state && state.topup) {
      setAccountNumber(state.accountNumber);
      setTopUpResponse(state.topup);
    }
  }, [location]);

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
          if (err.errors.amount && err.errors.amount.length > 0) {
            apiErrorMsg += err.errors.amount.join('\n');
          }
          if (
            err.errors.accountNumberToken &&
            err.errors.accountNumberToken.length > 0
          ) {
            apiErrorMsg += err.errors.accountNumberToken.join('\n');
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

  const onVerifyOTP = () => {
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
  };

  return (
    <ProtectedContent>
      <Helmet title="Verification - Add Money via BPI" />
      <Box title="Verification" titleBorder withPadding>
        {verifyOTP.loading && <Loading position="absolute" />}
        {resendOTP.loading && <Loading position="absolute" />}
        <H5>Enter Verification Code</H5>
        <Paragraph margin="0 0 32px">
          Authentication Code is 6 digits which is sent to your mobile number
          <b>+63987*****123</b>
          {/* {data.response.body.mobileNumber} */}
        </Paragraph>
        <Field>
          <Label>Enter SMS Code</Label>
          <InputTextWrapper position="right">
            <Input
              id="smsCode"
              placeholder="0"
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
            {isResend && (
              <span>
                <Button
                  size="small"
                  onClick={onResendOTP}
                  color="primary"
                  variant="contained"
                >
                  Resend OTP
                </Button>
              </span>
            )}
          </InputTextWrapper>
        </Field>
        <Flex justifyContent="flex-end" style={{ marginTop: 32 }}>
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            onClick={onVerifyOTP}
          >
            Verify
          </Button>
        </Flex>
      </Box>
    </ProtectedContent>
  );
}
