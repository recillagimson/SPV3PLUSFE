/**
 * Add Money via UBP Feature
 * Refactored codes
 * @Created 1643361815 (epoch)
 */
import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Paragraph from 'app/components/Elements/Paragraph';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';

import { numberCommas } from 'app/components/Helpers';
import useFetch from 'utils/useFetch';

/** selectors */
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';

export function AddMoneyViaUBPPage() {
  let windowObjectReference: Window | null = null;
  const dashData: any = useSelector(selectDashData);
  const { error, response, goFetch, fetchReset } = useFetch();
  const authUrl = useFetch();

  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [getAuthURL, setGetAuthURL] = React.useState(false);
  const [apiError, setApiError] = React.useState({ error: false, msg: '' });

  React.useEffect(() => {
    if (response) {
      if (response.login_url) {
        sessionStorage.setItem('spv_addmon', amount.value);
        sessionStorage.setItem('spv_addmon_url', 'ubp');

        window.location.assign(response.login_url);
      }
      fetchReset();
    }

    if (error) {
      onApiError(error);
      setLoading(false);
      fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  React.useEffect(() => {
    if (authUrl.response) {
      if (authUrl.response.authorizeUrl) {
        sessionStorage.setItem('spv_addmon', amount.value);
        sessionStorage.setItem('spv_addmon_url', 'ubp');

        onAuthUrl(authUrl.response.authorizeUrl);
      }
      fetchReset();
    }

    if (authUrl.error) {
      onApiError(authUrl.error);
      setLoading(false);
      fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUrl.response, authUrl.error]);

  const onApiError = (err: any) => {
    if (err.errors) {
      const errorCodes = err.errors.error_code || false;
      // we have error codes
      if (errorCodes && errorCodes.length > 0) {
        let apiErrorMsg = '';
        errorCodes.map(j => {
          if (j === 151) {
            apiErrorMsg += err.errors.payload.join('\n');
          }
          // User has no linked account or linked account has expired
          if (j === 901 || j === 902) {
            sessionStorage.setItem('spv_addmon_s', 'ongoing'); // status of the request
            onRequestAuthUrl();
            return null;
          }
          return null;
        });

        if (apiErrorMsg) setApiError({ error: true, msg: apiErrorMsg });
        return;
      }

      // no error codes, specific field errors
      if (!errorCodes || errorCodes.length === 0) {
        let apiErrorMsg = '';
        if (err.errors) {
          if (err.errors.user_details && err.errors.user_details.length > 0) {
            apiErrorMsg += err.errors.user_details.join('\n');
          }
          if (err.errors.amount && err.errors.amount.length > 0) {
            apiErrorMsg += err.errors.amount.join('\n');
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

  /**
   * Request Authentication URL for linking account
   */
  const onRequestAuthUrl = () => {
    setLoading(true);
    authUrl.goFetch('/ubp/auth/generate', 'GET', '', '', true, true);
  };

  /**
   * Open a new window
   */
  const onAuthUrl = (url: string) => {
    if (windowObjectReference === null) {
      windowObjectReference = window.open(
        url,
        'ubpWeb',
        'scrollbars=no,resizable=no,toolbar=no,menubar=no,width=540,height=720,left=200,top=200',
      );
    }
  };

  /**
   * Form Submission
   */
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let hasError = false;
    setLoading(true);

    if (amount.value === '') {
      hasError = true;
      setAmount({
        ...amount,
        error: true,
        msg: 'Oops! Please enter amount.',
      });
      setLoading(false);
    }

    if (!hasError) {
      const payload = {
        amount: parseFloat(amount.value),
      };

      // Call the cash in directly, then check the response if user has or no linked account
      goFetch('/cashin/ubp', 'POST', JSON.stringify(payload), '', true, true);
    }
  };

  let balanceInfo = '0.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  return (
    <ProtectedContent>
      <Helmet title="Add Money via UBP" />
      <Box title="Online Bank" titleBorder withPadding>
        {loading && <Loading position="absolute" />}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <img src="/banks/ubp.png" alt="BPI" width="160" />
        </div>
        <form>
          <Field>
            <Label>
              Amount <i>*</i>
            </Label>
            <InputTextWrapper>
              <Input
                id="amount"
                placeholder="0.00"
                type="number"
                hidespinner
                value={amount.value}
                onChange={e =>
                  setAmount({
                    value: e.currentTarget.value,
                    error: false,
                    msg: '',
                  })
                }
                error={amount.error}
              />
              <span>PHP</span>
            </InputTextWrapper>
            {!amount.error && (
              <Paragraph size="xsmall" margin="3px 0 12px">
                Available Balance PHP {balanceInfo}
              </Paragraph>
            )}
            {amount.error && <ErrorMsg formError>{amount.msg}</ErrorMsg>}
            <Paragraph size="xsmall" margin="3px 0 0">
              NOTE: This service has a Php 12.00 fee.
            </Paragraph>
          </Field>
          <Flex justifyContent="flex-end">
            <Button
              type="submit"
              color="primary"
              size="large"
              variant="contained"
              onClick={onSubmit}
            >
              Next
            </Button>
          </Flex>
        </form>
      </Box>

      {/* API error message */}
      <Dialog show={apiError.error} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">{apiError.msg}</H3>
          <Button
            fullWidth
            onClick={() => setApiError({ error: false, msg: '' })}
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
