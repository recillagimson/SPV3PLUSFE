/**
 * Add Money via BPI Feature
 * Refactored codes
 * @Created 1642989285 (epoch)
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

export function AddMoneyViaBPIPage() {
  const dashData: any = useSelector(selectDashData);
  const { error, response, goFetch, fetchReset } = useFetch();

  const [loading, setLoading] = React.useState(false);
  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    msg: '',
  });
  const [apiError, setApiError] = React.useState({ error: false, msg: '' });

  React.useEffect(() => {
    if (response) {
      if (response.login_url) {
        sessionStorage.setItem('spv_addmon', amount.value);
        sessionStorage.setItem('spv_addmon_url', 'bpi');

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
          return null;
        });

        setApiError({ error: true, msg: apiErrorMsg });
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

      goFetch(
        '/bpi/login/url',
        'POST',
        JSON.stringify(payload),
        '',
        true,
        true,
      );
    }
  };

  let balanceInfo = '0.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  return (
    <ProtectedContent>
      <Helmet title="Add Money via BPI" />
      <Box title="Online Bank" titleBorder withPadding>
        {loading && <Loading position="absolute" />}

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: 24,
          }}
        >
          <img src="/banks/bpi.png" alt="BPI" width="140" />
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
              <Paragraph size="xsmall" margin="3px 0 0">
                Available Balance PHP {balanceInfo}
              </Paragraph>
            )}
            {amount.error && <ErrorMsg formError>{amount.msg}</ErrorMsg>}
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
