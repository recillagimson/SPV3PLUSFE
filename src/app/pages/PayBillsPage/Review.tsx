import * as React from 'react';
import { DateTime } from 'luxon';

import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import Paragraph from 'app/components/Elements/Paragraph';
import Flex from 'app/components/Elements/Flex';
import Button from 'app/components/Elements/Button';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';
import Dialog from 'app/components/Dialog';
import ReceiptWrapper from 'app/components/Elements/Receipt';
import H5 from 'app/components/Elements/H5';
import Logo from 'app/components/Assets/Logo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import bayadLogo from 'app/components/Assets/paybills/bayad-partner.png';

import { analytics } from 'utils/firebase';
import { events } from 'utils/firebaseConstants';

import useFetch from 'utils/useFetch';
import { numberCommas } from 'app/components/Helpers';

import { BillersState, ValidateSuccessResponse } from './slice/types';
import RenderReceipt from './Receipt';

type ReviewProps = {
  biller: BillersState;
  details: {
    form: { [name: string]: { label: string; value: string } };
    validate: ValidateSuccessResponse;
    payload: { [name: string]: string };
  };
};

export default function Review({ biller, details }: ReviewProps) {
  const { loading, response, error, goFetch, fetchReset } = useFetch();

  const [success, setSuccess] = React.useState(false);
  const [data, setSuccessData] = React.useState<any>({});
  const [apiError, setApiError] = React.useState({ show: false, msg: '' });

  React.useEffect(() => {
    if (response) {
      analytics.logEvent(events.paybills, { code: biller.code });
      setSuccessData(response);
      setSuccess(true);
      fetchReset();
    }

    if (error) {
      let providerError = error.provider_error || false;
      if (providerError && providerError.length > 0) {
        let msg: string[] = [];
        providerError.forEach(err => {
          const k = err.errors ? Object.keys(err.errors) : [];

          if (k && k.length > 0) {
            k.forEach(key => {
              if (err.errors[key].length > 0) {
                err.errors[key].forEach((e: { message: string }) =>
                  msg.push(e.message),
                );
              }
            });
          }
        });
        setApiError({ show: true, msg: msg.join('\n') });
      }

      if (!providerError && error.errors) {
        let errors = error.errors.error_code ? error.errors.error_code : [];
        if (errors.length > 0) {
          errors.forEach(err => {
            if (err === 204) {
              setApiError({ show: true, msg: err.message.join('\n') });
              return;
            }
            if (err === 402) {
              setApiError({ show: true, msg: err.message.join('\n') });
              return;
            }
          });
        } else {
          setApiError({ show: true, msg: error.message || '' });
        }
      }
      fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  const onPayBill = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    goFetch(
      `/pay/bills/create/payment/${biller.code}`,
      'POST',
      JSON.stringify(details.payload),
      '',
      true,
      true,
    );
  };

  const keys = details ? Object.keys(details.form) : [];
  let timeStamp: any = '';
  if (data) {
    timeStamp = DateTime.fromISO(data.created_at);

    if (!timeStamp.isValid) {
      timeStamp = DateTime.fromSQL(data.create_at);
    }
  }

  return (
    <>
      <Box title="Review Payment" titleBorder withPadding>
        {loading && <Loading position="absolute" />}
        <Flex
          alignItems="center"
          justifyContent="flex-start"
          direction="column"
          style={{ maxWidth: 400, margin: '0 auto' }}
        >
          <CircleIndicator size="large" color="primary">
            {biller ? biller.name.charAt(0) : 'SP'}
          </CircleIndicator>
          <H3 margin="12px 0 40px">{biller ? biller.name : 'Biller Name'}</H3>
          {details &&
            keys.length > 0 &&
            keys.map(k => (
              <Flex key={k} style={{ width: '100%' }} wrap="wrap">
                <Paragraph>{details.form[k].label}</Paragraph>
                <Paragraph
                  align="right"
                  padding="0 0 0 5px"
                  style={{ flex: 1 }}
                >
                  {details.form[k].label.toLowerCase() === 'amount'
                    ? `PHP ${numberCommas(details.form[k].value)}`
                    : details.form[k].value}
                </Paragraph>
              </Flex>
            ))}
          <Flex
            alignItems="center"
            justifyContent="flex-start"
            direction="column"
            style={{ marginTop: 50 }}
          >
            <Paragraph margin="0 0 3px">Total Amount</Paragraph>
            <H5 margin="0 0 2px">
              PHP {numberCommas(details.payload.amount || '0')}
            </H5>
            <Paragraph size="small" margin="0 0 2px">
              Service Fee: {numberCommas(details.validate.serviceFee || '0')}
            </Paragraph>
            <Paragraph size="small" margin="0 0 40px">
              Other Charges:{' '}
              {numberCommas(details.validate.otherCharges || '0')}
            </Paragraph>
            <img
              src={bayadLogo}
              alt="Bayad Partner"
              style={{
                width: 95,
                display: 'block',
                margin: '0 auto',
                padding: '0 0 24px',
              }}
            />

            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={onPayBill}
            >
              Pay Bill
            </Button>
          </Flex>
        </Flex>
      </Box>

      {/* API Error */}
      <Dialog show={apiError.show} size="xsmall">
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
          <Paragraph size="small" margin="0 0 24px">
            {apiError.msg}
          </Paragraph>

          <Button
            fullWidth
            onClick={() => setApiError({ show: false, msg: '' })}
            variant="outlined"
            size="medium"
          >
            Close
          </Button>
        </div>
      </Dialog>

      {/* API Success */}
      <Dialog show size="small">
        <div style={{ padding: '20px 0' }}>
          <Logo size="medium" />
          <ReceiptWrapper>
            <div style={{ textAlign: 'center' }}>
              <CircleIndicator size="large" color="primary">
                <FontAwesomeIcon icon="check" />
              </CircleIndicator>
              <H3 margin="12px 0 24px">
                {biller.code === 'MECOR'
                  ? 'Transaction successful!'
                  : 'Successful Payment'}
              </H3>
            </div>

            {biller.code === 'MECOR' && (
              <Paragraph align="center">
                "Sweet! We have received your MERALCO bill payment and are
                currently processing it. Thank you. Have a great day ahead!"
              </Paragraph>
            )}

            <RenderReceipt billerCode={biller.code} data={data} />

            <Paragraph margin="40px 0 8px" size="small" align="center">
              Total Amount
            </Paragraph>
            <H5 margin="0 0 8px" align="center">
              PHP {numberCommas(data.amount || 0)}
            </H5>
            <Paragraph margin="0 0 2px" size="small" align="center">
              Service Fee: {numberCommas(data.service_fee || 0)}
            </Paragraph>
            <Paragraph margin="0 0 72px" size="small" align="center">
              Other Chargers: {numberCommas(data.other_charges || 0)}
            </Paragraph>

            <img
              src={bayadLogo}
              alt="Bayad Partner"
              style={{
                width: 95,
                display: 'block',
                margin: '0 auto',
                padding: '0 0 24px',
              }}
            />
            <Logo size="small" />
            <Paragraph margin="0 0 0" size="xsmall" align="center">
              {timeStamp.toFormat('dd LLLL yyyy, hh:mm a')}
            </Paragraph>
          </ReceiptWrapper>
        </div>
      </Dialog>
    </>
  );
}
