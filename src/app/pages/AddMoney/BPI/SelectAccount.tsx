import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import Paragraph from 'app/components/Elements/Paragraph';
import H3 from 'app/components/Elements/H3';
import H5 from 'app/components/Elements/H5';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';

import useFetch from 'utils/useFetch';
import { numberCommas } from 'app/components/Helpers';

import { ListAccount } from './Style';
import ErrorMsg from 'app/components/Elements/ErrorMsg';

export function BPISelectAccountPage() {
  const location = useLocation();
  const history = useHistory();
  const creds = useFetch(); // bpi credentials
  const token = useFetch(); // bpi access token
  const accts = useFetch(); // bpi accounts of logged in bpi user
  const topup = useFetch(); // bpi fund top up

  const [loading, setLoading] = React.useState(true);
  const [code, setCode] = React.useState<any>('');
  const [accounts, setAccounts] = React.useState([]);
  const [selectedAccount, setSelectedAccount] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [apiError, setApiError] = React.useState({ error: false, msg: '' });

  React.useEffect(() => {
    if (location.state && code === '') {
      setCode(location.state);
      getCredentials();
    }

    if (location && !location.state && code === '') {
      const sessCode = sessionStorage.getItem('spv_addmon_code');
      setCode(sessCode);
      getCredentials();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  React.useEffect(() => {
    if (
      creds.response &&
      creds.response.clientId &&
      creds.response.clientSecret
    ) {
      onGetAccessToken(creds.response.clientId, creds.response.clientSecret);
      creds.fetchReset();
    }

    if (creds.error) {
      onApiError(creds.error);
      creds.fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [creds]);

  React.useEffect(() => {
    if (token.response && token.response.access_token) {
      onGetAccounts(token.response.access_token);
      token.fetchReset();
    }

    if (token.error) {
      onApiError(token.error);
      token.fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  React.useEffect(() => {
    if (
      accts.response &&
      accts.response.body &&
      accts.response.body.transactionalAccounts
    ) {
      setAccounts(accts.response.body.transactionalAccounts);
      setLoading(false);
      accts.fetchReset();
    }

    if (accts.error) {
      onApiError(accts.error);
      accts.fetchReset();
    }
  }, [accts]);

  React.useEffect(() => {
    if (topup.response) {
      history.push({
        pathname: '/add-money/bpi/verification',
        state: {
          topup: topup.response,
          accountNumber: selectedAccount.value,
        },
      });
      topup.fetchReset();
    }

    if (topup.error) {
      onApiError(topup.error);
      topup.fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topup]);

  // get bpi credentials
  const getCredentials = () => {
    creds.goFetch('/bpi/credentials', 'GET', '', '', true, true);
  };

  // get access token
  const onGetAccessToken = (id: string, secret: string) => {
    const payload = new URLSearchParams();
    payload.append('client_id', id);
    payload.append('client_secret', secret);
    payload.append('grant_type', 'authorization_code');
    payload.append('code', code);

    token.goFetch(
      `${process.env.REACT_APP_BURL}/oauth2/token`,
      'POST',
      payload,
      'application/x-www-form-urlencoded',
      true,
      true,
    );
  };

  // get accounts
  const onGetAccounts = (accessToken: string) => {
    sessionStorage.setItem('spv_addmon_acto', accessToken); // write the access token in session storage

    const payload = {
      token: accessToken,
    };

    accts.goFetch(
      '/bpi/accounts',
      'POST',
      JSON.stringify(payload),
      '',
      true,
      true,
    );
  };

  const onApiError = (err: any) => {
    setLoading(false);
    if (err.errors) {
      const errorCodes = err.errors.error_code || false;
      // we have error codes
      if (errorCodes && errorCodes.length > 0) {
        let apiErrorMsg = '';
        errorCodes.map(j => {
          if (j === 412) {
            apiErrorMsg += err.errors.message.join('\n');
          }
          if (j === 424) {
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

  // fund top up api
  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    setLoading(true);
    let hasError = false;

    if (selectedAccount.value === '') {
      hasError = true;
      setSelectedAccount({
        ...selectedAccount,
        error: true,
        msg: 'Please select an account to continue.',
      });
      setLoading(false);
    }

    if (!hasError) {
      const amount = sessionStorage.getItem('spv_addmon') || '';
      const accessToken = sessionStorage.getItem('spv_addmon_acto');

      const payload = {
        amount: parseFloat(amount),
        accountNumberToken: selectedAccount.value,
        token: accessToken,
      };

      topup.goFetch(
        '/bpi/fundtopup',
        'POST',
        JSON.stringify(payload),
        '',
        true,
        true,
      );
    }
  };

  const amount = sessionStorage.getItem('spv_addmon') || '0';

  return (
    <ProtectedContent>
      <Helmet title="Select Account - Add Money via BPI" />
      <Box title="Select BPI Bank Account" titleBorder withPadding>
        {loading && <Loading position="absolute" />}
        <Paragraph align="center" margin="0 0 4px">
          Cash In Amount (₱)
        </Paragraph>
        <H3 align="center" margin="0 0 24px">
          {numberCommas(amount)}
        </H3>
        <H5>Select Bank Account</H5>
        <Paragraph margin="0 0 32px">
          Select your bank account with sufficient balance to link your account
          and complete the cash in.
        </Paragraph>

        {accounts.length > 0 &&
          accounts.map((acct: any) => (
            <ListAccount
              key={acct.displayOrder}
              selected={selectedAccount.value === acct.accountNumberToken}
              role="presentation"
              onClick={() =>
                setSelectedAccount({
                  value: acct.accountNumberToken,
                  error: false,
                  msg: '',
                })
              }
            >
              <img src="/banks/bpi.png" alt="BPI" width="48px" height="auto" />
              <div style={{ flex: 1, padding: '0 8px' }}>
                <Paragraph margin="0 0 0">
                  {acct.accountNumber.replace('X', '*')}
                </Paragraph>
                <Paragraph margin="0 0 0" size="xsmall">
                  {acct.accountType}
                </Paragraph>
              </div>
              <span className="radio" />
            </ListAccount>
          ))}
        {selectedAccount.error && (
          <ErrorMsg formError>{selectedAccount.msg}</ErrorMsg>
        )}

        <Flex justifyContent="flex-end" style={{ marginTop: 32 }}>
          <Button
            type="submit"
            color="primary"
            size="large"
            variant="contained"
            onClick={onSubmit}
          >
            Cash In
          </Button>
        </Flex>
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
