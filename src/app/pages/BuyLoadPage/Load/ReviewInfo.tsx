import * as React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Dialog from 'app/components/Dialog';
import H5 from 'app/components/Elements/H5';
import Button from 'app/components/Elements/Button';
import Avatar from 'app/components/Elements/Avatar';
import Flex from 'app/components/Elements/Flex';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Paragraph from 'app/components/Elements/Paragraph';
import Loading from 'app/components/Loading';

import { ReviewWrapper } from './BuyLoad.styles';
import { numberCommas } from 'app/components/Helpers';
import useFetch from 'utils/useFetch';

import { ProductObject } from './types';

type ReviewInfoProps = {
  avatar: string;
  mobile: string;
  product: ProductObject;
  onSuccess: (pay: {
    recipient_mobile_number: string;
    amount: number;
    transaction_number: string;
    transaction_date: string;
  }) => void;
};

/**
 * Promo display
 * @returns {string}    returns the selected product code
 */
export default function ReviewInfo({
  avatar,
  mobile,
  product,
  onSuccess,
}: ReviewInfoProps) {
  const { loading, error, response, goFetch, fetchReset } = useFetch();

  const [apiError, setApiError] = React.useState({ show: false, msg: '' });

  React.useEffect(() => {
    if (response) {
      console.log(response);
      onSuccess(response);
      fetchReset();
    }

    if (error) {
      onApiError(error);
      fetchReset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response, error]);

  const onApiError = (err: any) => {
    let errorCode = err.errors ? err.errors.error_code : false;
    if (errorCode && errorCode.length > 0) {
      errorCode.forEach((i: any) => {
        if (i === 302) {
          setApiError({
            msg: 'Transaction failed. Please try again.',
            show: true,
          });
          return;
        }
        if (i === 401) {
          setApiError({
            msg: 'User profile not updated.',
            show: true,
          });
          return;
        }
        if (i === 402) {
          setApiError({
            msg: 'Transaction denied due to insufficient Squidpay Balance.',
            show: true,
          });
          return;
        }
        if (i === 405) {
          setApiError({
            msg: 'Oh No! You have exceeded your monthly limit.',
            show: true,
          });
          return;
        }
        if (i === 406) {
          setApiError({
            msg:
              'Oops! To completely access all Squidpay services, please update your profile. Thank you.',
            show: true,
          });
          return;
        }
        if (i === 501) {
          setApiError({
            msg: 'Mobile number prefix is not supported.',
            show: true,
          });
          return;
        }
        if (i === 502) {
          setApiError({
            msg: 'Mobile number is not supported.',
            show: true,
          });
          return;
        }

        return;
      });
    }

    if (!errorCode && err.errors) {
      if (err.errors.mobile_number && err.errors.mobile_number.length > 0) {
        setApiError({
          msg: err.errors.mobile_number.join('\n'),
          show: true,
        });
      }
      if (err.errors.product_code && err.errors.product_code.length > 0) {
        setApiError({
          msg: err.errors.product_code.join('\n'),
          show: true,
        });
      }
      if (err.errors.product_name && err.errors.product_name.length > 0) {
        setApiError({
          msg: err.errors.product_name.join('\n'),
          show: true,
        });
      }
      if (err.errors.amount && err.errors.amount.length > 0) {
        setApiError({
          msg: err.errors.amount.join('\n'),
          show: true,
        });
      }
    }

    if (!errorCode && !err.errors && err.response) {
      setApiError({
        msg: err.response.statusText,
        show: true,
      });
    }
  };

  const onPay = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    const payload = {
      mobile_number: product.mobile_number,
      product_code: product.product_code,
      product_name: product.product_name,
      amount: product.amount,
    };

    goFetch('/buy/load', 'POST', JSON.stringify(payload), '', true, true);
  };

  const onCloseDialog = () => {
    setApiError({ show: false, msg: '' });
  };

  return (
    <ReviewWrapper>
      {loading && <Loading position="absolute" />}
      <Flex justifyContent="center">
        <Avatar
          image={avatar || ''}
          size="large"
          style={{ marginBottom: '10px' }}
        />
      </Flex>
      <H5 margin="0 0 48px" className="text-center">
        {mobile}
      </H5>

      <Flex justifyContent="space-between">
        <Paragraph>Mobile Number</Paragraph>
        <Paragraph>{product.mobile_number}</Paragraph>
      </Flex>
      <Flex justifyContent="space-between">
        <Paragraph>Load</Paragraph>
        <Paragraph>{product.description}</Paragraph>
      </Flex>
      <Flex justifyContent="space-between">
        <Paragraph>Amount</Paragraph>
        <Paragraph>Php {numberCommas(product.amount)}</Paragraph>
      </Flex>

      <Paragraph margin="24px 0 4px" size="small" align="center">
        Total Amount
      </Paragraph>
      <Paragraph align="center" margin="0 0 64px">
        PHP {numberCommas(product.amount)}
      </Paragraph>

      <Button
        fullWidth
        type="submit"
        color="primary"
        size="large"
        variant="contained"
        onClick={onPay}
      >
        Pay
      </Button>

      <Dialog show={apiError.show} size="xsmall">
        <div style={{ margin: '20px', textAlign: 'center' }}>
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H5 margin="10px 0 5px">Oops! Transaction Error</H5>
          <Paragraph size="small" align="center" margin="0 0 30px">
            {apiError.msg}
          </Paragraph>

          <Button
            fullWidth
            onClick={onCloseDialog}
            variant="outlined"
            size="medium"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </ReviewWrapper>
  );
}
