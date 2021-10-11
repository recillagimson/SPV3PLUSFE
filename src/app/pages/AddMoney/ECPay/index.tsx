import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { DateTime } from 'luxon';
import styled from 'styled-components';
import { numberWithCommas } from 'utils/common';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

import H5 from 'app/components/Elements/H5';
import Button from 'app/components/Elements/Button';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Flex from 'app/components/Elements/Flex';
import Card from 'app/components/Elements/Card/Card';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Logo from 'app/components/Assets/Logo';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import H3 from 'app/components/Elements/H3';
import Paragraph from 'app/components/Elements/Paragraph';
import { numberCommas } from 'app/components/Helpers';
import ECPayLogo from 'app/components/Assets/ecpay/ecpay.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import Loading from 'app/components/Loading';

import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { selectError, selectLoading, selectData } from './slice/selectors';
import { useContainerSaga } from './slice';
import { STEPS } from './helpers';

// Styles
import {
  TransactionDetailsWrapper,
  CuttedImageWrapper,
  TransactionDetailsWrapperContent,
  TransactionDetailsList,
  TransactionDetailsListItem,
} from 'app/pages/TransactionHistoryPage/TransactionHistory.style';

const StyledTransactionDetailsWrapper = styled(TransactionDetailsWrapper)`
  width: 100%;
`;

const StyledTransactionDetailsWrapperContent = styled(
  TransactionDetailsWrapperContent,
)`
  margin: 10px 0px;
`;

const StyleTransactionDetailsList = styled(TransactionDetailsList)`
  margin: 20px 0;
`;

const StyledStepsTitleWrapper = styled.div`
  width: 340px;
  background: #fff;
  padding: 10px 20px;
  border-radius: 12px;
`;

const StyledStepsTitleWrapperContent = styled.div<{ margin?: string }>`
  border-bottom: 1px solid lightgray;
  margin: ${p => (p.margin ? p.margin : '4px 0px 0px')};
`;

const StyledStepsWrapper = styled.div<{ large?: boolean }>`
  display: flex;
  align-items: center;
  margin: ${p => (p.large ? '20px 0' : '10px 0')};
`;

const StyledStepsWrapperContent = styled.div`
  margin: 0 0 0 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export function ECPay() {
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();

  const history = useHistory();
  const loading: boolean = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const data: any = useSelector(selectData);
  const dashData: any = useSelector(selectDashData);

  const [isLanding, setIsLanding] = useState(true);
  const [isEnterAmount, setIsEnterAmount] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [amount, setAmount] = useState({
    value: '',
    isError: false,
    errormsg: '',
  });

  useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
      setIsLanding(true);
      setIsEnterAmount(false);
      setIsSuccess(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, dispatch]);

  useEffect(() => {
    if (data) {
      setIsLanding(false);
      setIsEnterAmount(false);
      setIsSuccess(true);
    }
  }, [data]);

  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();
    let error = false;
    // Check amount if it's valid
    if (amount.value === '') {
      error = true;
      setAmount({
        ...amount,
        isError: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }
    if (parseFloat(amount.value) < 50) {
      error = true;
      setAmount({
        ...amount,
        isError: true,
        errormsg: 'The amount must be at least 50.00.',
      });
    }
    if (parseFloat(amount.value) > 50000) {
      error = true;
      setAmount({
        ...amount,
        isError: true,
        errormsg: 'The amount must not be greater than 50,000.00.',
      });
    }
    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
      };
      dispatch(actions.getFetchLoading(data));
    }
  };

  const onDownload = () => {
    history.push('/dashboard');
  };

  const onApiError = (err: object | any) => {
    let apiError = '';
    if (err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        const i405 = err.errors.error_code.findIndex(j => j === 405);
        //display error on 405
        if (i405 !== -1) {
          apiError = err.errors.message.join('\n');
        }
      }
      //diplay amount error
      if (err.errors && err.errors?.amount?.length > 0) {
        apiError = err.errors.amount[0];
      }
      setApiErrorMsg(apiError || '');
      setApiError(true);
    }
    if (err.code && err.code === 500) {
      setApiErrorMsg(
        'Oops! We are having problem connecting to BPI. Please try again later.',
      );
      setApiError(true);
    }
    if (err.response && !err.code) {
      apiError = err.response.statusText;
      setApiErrorMsg(apiError || '');
      setApiError(true);
    }
    if (!err.response && !err.code) {
      apiError = err.message;
      setApiErrorMsg(apiError || '');
      setApiError(true);
    }
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  let monthDateYearTime = '';
  if (data) {
    const dd = new Date(data.transaction_date).toISOString();
    let ddSQL = DateTime.fromISO(dd);
    monthDateYearTime = ddSQL.toLocaleString(DateTime.DATETIME_MED);
  }

  const renderListItems = () => {
    if (data && isSuccess) {
      const { amount, expiry_date, ec_pay_reference_number } = data;
      const expDate = new Date(expiry_date).toLocaleString('default', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      });
      return [
        {
          label: 'Amount',
          value: `PHP ${numberWithCommas(amount)}`,
        },
        {
          label: 'Reference Number',
          value: ec_pay_reference_number || 'None',
        },
        {
          label: 'Expiration Date',
          value: expDate,
        },
      ];
    }
    return [];
  };

  const renderSteps = (data, large = false) => {
    return data.map((item: any) => {
      return (
        <StyledStepsWrapper key={item.value} large={large}>
          <img src={item.icon} alt={item.value} />
          <StyledStepsWrapperContent>
            <Paragraph margin="0 0 8px" size="small">
              {item.label}
            </Paragraph>
            <Paragraph
              size="xsmall"
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          </StyledStepsWrapperContent>
        </StyledStepsWrapper>
      );
    });
  };

  return (
    <div>
      <Helmet>
        <title>ECPay</title>
      </Helmet>
      <ProtectedContent>
        {loading && <Loading position="fixed" />}

        {isLanding && (
          <Card title="ECPay" size="medium">
            <StyledStepsTitleWrapperContent className="text-center">
              <H3 margin="0 0 10px">How to To Add Money via ECPay</H3>
              <Paragraph margin="0px 0 24px" size="xsmall">
                Please follow the quick and easy instructions below.
              </Paragraph>
            </StyledStepsTitleWrapperContent>
            {renderSteps(STEPS, true)}
            <Flex justifyContent="flex-end">
              <Button
                type="submit"
                color="primary"
                size="large"
                variant="contained"
                onClick={() => {
                  setIsLanding(false);
                  setIsEnterAmount(true);
                }}
              >
                Next
              </Button>
            </Flex>
          </Card>
        )}

        {isEnterAmount && (
          <Card title="ECPay" size="medium">
            <Field>
              <Label>Amount</Label>
              <InputTextWrapper>
                <Input
                  data-testid="amount"
                  type="number"
                  placeholder="0.00"
                  value={amount.value}
                  autoComplete="off"
                  onChange={e =>
                    setAmount({
                      value: e.currentTarget.value,
                      isError: false,
                      errormsg: '',
                    })
                  }
                  error={amount.isError ? true : undefined}
                />
                <span>PHP</span>
              </InputTextWrapper>
              {amount.isError ? (
                <ErrorMsg formError>{amount.errormsg}</ErrorMsg>
              ) : (
                <span style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                  Available Balance PHP {balanceInfo}
                </span>
              )}
              <br />
              <br />
              <span style={{ fontSize: '12px', fontWeight: 'lighter' }}>
                *Additional Fees and Charges may apply.
              </span>
              <br />
              <Flex justifyContent="flex-end">
                <Button
                  data-testid="submit"
                  type="submit"
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={onSubmit}
                >
                  Next
                </Button>
              </Flex>
            </Field>
          </Card>
        )}

        <Dialog show={isSuccess} size="small">
          <div style={{ margin: '10px', overflow: 'scroll', maxHeight: 600 }}>
            <StyledTransactionDetailsWrapper>
              <CuttedImageWrapper
                src={WrapperCuttedCornerTop}
                alt="Squid pay"
              />
              <StyledTransactionDetailsWrapperContent>
                <span className="text-center" style={{ display: 'block' }}>
                  <img src={ECPayLogo} alt="ECPay" width="auto" height="auto" />
                </span>
                <StyleTransactionDetailsList id="QRCode">
                  {renderListItems().map(d => (
                    <TransactionDetailsListItem key={d.value}>
                      <Paragraph>{d.label}</Paragraph>
                      <Paragraph>{d.value}</Paragraph>
                    </TransactionDetailsListItem>
                  ))}
                </StyleTransactionDetailsList>

                <StyledStepsTitleWrapper>
                  <StyledStepsTitleWrapperContent
                    className="text-center"
                    margin="20px 0px 0px"
                  >
                    <H5 margin="0 0 10px">Add Money via ECPay</H5>
                    <Paragraph
                      size="xsmall"
                      margin="0px auto 20px"
                      style={{
                        width: 220,
                      }}
                    >
                      Please follow these remaining quick and easy instructions
                      below.
                    </Paragraph>
                  </StyledStepsTitleWrapperContent>

                  <div
                    style={{
                      margin: '10px 0',
                    }}
                  >
                    {renderSteps(STEPS?.slice(1, 3))}
                  </div>
                </StyledStepsTitleWrapper>

                <Logo size="small" margin="10px 0 20px" />
                <Paragraph size="xsmall" align="center" margin="unset">
                  {monthDateYearTime}
                </Paragraph>
              </StyledTransactionDetailsWrapperContent>
              <CuttedImageWrapper src={WrapperCuttedCornerBottom} alt="" />
            </StyledTransactionDetailsWrapper>

            <Button
              fullWidth
              onClick={onDownload}
              variant="contained"
              color="primary"
              size="medium"
              style={{ margin: '16px 0 10px' }}
            >
              <FontAwesomeIcon icon={faDownload} />
              &nbsp; Download
            </Button>
            <br />
            <Button
              fullWidth
              onClick={() => {
                setIsSuccess(false);
              }}
              variant="contained"
              color="secondary"
              size="medium"
              style={{ margin: '0 0 10px' }}
            >
              Close
            </Button>
            <Paragraph
              size="xsmall"
              margin="0 auto 10px"
              align="center"
              style={{ width: '300px' }}
            >
              Please use your reference number for payment or you can save it on
              your device.
            </Paragraph>
          </div>
        </Dialog>

        <Dialog show={apiError} size="small">
          <div className="text-center" style={{ padding: '20px 20px 30px' }}>
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H3 margin="15px 0 30px">
              {apiErrorMsg ? apiErrorMsg : 'Transaction Failed'}
            </H3>
            <Button
              fullWidth
              onClick={() => {
                history.push('/dashboard');
              }}
              variant="contained"
              color="primary"
              size="large"
            >
              Ok
            </Button>
          </div>
        </Dialog>
      </ProtectedContent>
    </div>
  );
}
