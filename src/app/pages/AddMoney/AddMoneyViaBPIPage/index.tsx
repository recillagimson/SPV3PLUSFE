import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';

import H5 from 'app/components/Elements/H5';
import Label from 'app/components/Elements/Label';
import Field from 'app/components/Elements/Fields';
import Input from 'app/components/Elements/Input';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Button from 'app/components/Elements/Button';
import Flex from 'app/components/Elements/Flex';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import Card from 'app/components/Elements/Card/Card';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import { numberCommas } from 'app/components/Helpers';
import Logo from 'app/components/Assets/Logo';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import H3 from 'app/components/Elements/H3';
import RadioComponent from 'app/components/Elements/Radio';
import Loading from 'app/components/Loading';
import A from 'app/components/Elements/A';

import Wrapper from './Wrapper';
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { useContainerSaga } from './slice';
import {
  selectAccessToken,
  selectAccounts,
  selectBpiUrl,
  selectData,
  selectLoading,
  selectError,
  selectProcessData,
  selectResendOTP,
} from './slice/selectors';

export function AddMoneyViaBPI() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { actions } = useContainerSaga();

  const dashData: any = useSelector(selectDashData);
  const bpiUrl: object | any = useSelector(selectBpiUrl);
  const accessToken: string = useSelector(selectAccessToken);
  const accounts: object | any = useSelector(selectAccounts);
  const data: object | any = useSelector(selectData);
  const processData: object | any = useSelector(selectProcessData);
  const resendOTP: object | any = useSelector(selectResendOTP);
  const error: any = useSelector(selectError);
  const loading: boolean = useSelector(selectLoading);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCashIn, setIsCashIn] = useState(true);
  const [isSelectAccounts, setIsSelectAccounts] = useState(false);
  const [isVerification, setIsVerification] = useState(false);

  const [isError412, setIsError412] = useState(false);
  const [counter, setCounter] = useState(0);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [amount, setAmount] = useState({
    value: '',
    isError: false,
    errormsg: '',
  });
  const [accountNumberToken, setAccountNumberToken] = useState({
    value: '',
    isError: false,
    errormsg: '',
  });
  const [otp, setOtp] = useState({
    value: '',
    isError: false,
    errormsg: '',
  });

  const resetAddMoney = () => {
    setIsCashIn(true);
    setIsSelectAccounts(false);
    setIsVerification(false);
    setAmount({
      ...amount,
      value: '',
      isError: false,
      errormsg: '',
    });
    setIsError412(false);
    dispatch(actions.getProcessTopUpReset());
  };

  useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset()); // reset store state on unmount
      resetAddMoney();
      sessionStorage.setItem('amount', '');
      sessionStorage.setItem('url', '');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actions, dispatch]);

  //Error useEffect
  //BPI login redirect useEFfect
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
    if (bpiUrl) {
      sessionStorage.setItem('amount', amount.value);
      sessionStorage.setItem('url', bpiUrl?.login_url);
      window.location.href = bpiUrl.login_url;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, bpiUrl, amount.value]);

  //View select accounts on postback
  useEffect(() => {
    if (window.location.pathname === '/add-money/bpi/select-account') {
      const amountValue: string | null = sessionStorage.getItem('amount');
      if (amountValue && !isVerification) {
        setAmount({ ...amount, value: amountValue.toString() });
        setIsCashIn(false);
        setIsSelectAccounts(true);
        setIsVerification(false);
      }
      if (!amountValue) {
        setIsCashIn(true);
        setIsSelectAccounts(false);
        setIsVerification(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Show OTP view on /fundtopup submit
  useEffect(() => {
    if (data !== null) {
      setIsCashIn(false);
      setIsSelectAccounts(false);
      setIsVerification(true);
    }
  }, [data]);

  //Show success modal on /process submit
  useEffect(() => {
    if (processData !== null) {
      setIsSuccess(true);
    }
  }, [processData]);

  //OTP timer from /fundtopup and /resendotp
  useEffect(() => {
    if (data?.otpResponse?.body) {
      setCounter(59);
    }
    if (resendOTP?.body) {
      setCounter(59);
    }
  }, [data, resendOTP]);

  //OTP Timer Countdown
  useEffect(() => {
    const timer: any =
      data !== null &&
      !loading &&
      counter > 0 &&
      setInterval(() => setCounter(counter - 1), 1000);
    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counter, data, apiError]);

  const onApiError = (err: object | any) => {
    let apiError = '';
    if (err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        const i426 = err.errors.error_code.findIndex(j => j === 426);
        const i412 = err.errors.error_code.findIndex(j => j === 412);
        //dont reset on error i426 & i412
        if (i426 === -1 && i412 === -1) {
          apiError = err.errors.message.join('\n');
          resetAddMoney();
        }
        //display error on 426
        if (i426 !== -1) {
          apiError = err.errors.message.join('\n');
        }
        //display error on 412
        if (i412 !== -1) {
          apiError = err.errors.message.join('\n');
          setIsError412(true);
        }
      }
      //diplay amount error
      if (err.errors && err.errors?.amount?.length > 0) {
        apiError = err.errors.amount[0];
        resetAddMoney();
      }
      setApiErrorMsg(apiError || '');
      setApiError(true);
    }
    if (err.code && err.code === 500) {
      setApiErrorMsg(
        'Oops! We are having problem connecting to BPI. Please try again later.',
      );
      setApiError(true);
      resetAddMoney();
    }
    if (err.response && !err.code) {
      apiError = err.response.statusText;
      setApiErrorMsg(apiError || '');
      setApiError(true);
      resetAddMoney();
    }
    if (!err.response && !err.code) {
      apiError = err.message;
      setApiErrorMsg(apiError || '');
      setApiError(true);
      resetAddMoney();
    }
  };

  //Generate BPI URL
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
    // Check amount if it's less than 1
    if (parseFloat(amount.value) < 1) {
      error = true;
      setAmount({
        ...amount,
        isError: true,
        errormsg: 'The amount must be at least 1.',
      });
    }
    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
      };
      dispatch(actions.getFetchLoading(data));
    }
  };

  //Fund TopUp
  const onSubmitCashIn = () => {
    let error = false;
    if (accountNumberToken.value === '') {
      error = true;
      setAccountNumberToken({
        ...accountNumberToken,
        isError: true,
        errormsg: 'Oops! Please select an account.',
      });
    }
    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
        accountNumberToken: accountNumberToken.value,
        token: accessToken,
      };
      dispatch(actions.getFetchFundTopUpLoading(data));
    }
  };

  //Process TopUp
  const onSubmitVerification = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    resend = false,
  ) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    if (otp.value === '') {
      error = true;
      setOtp({
        ...otp,
        isError: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }
    if (otp.value.length !== 6) {
      error = true;
      setOtp({
        ...otp,
        isError: true,
        errormsg: 'You entered invalid OTP.',
      });
    }
    if (!error && data && !resend) {
      const { transactionId, refId } = data;
      const payload = {
        token: accessToken,
        otp: otp.value,
        transactionId,
        amount: parseFloat(amount.value),
        refId,
      };
      dispatch(actions.getFetchProcessTopUpLoading(payload));
    }

    if (data && resend) {
      setOtp({
        ...otp,
        isError: false,
        errormsg: '',
      });
      const { transactionId, response } = data;
      const payload = {
        token: accessToken,
        mobileNumberToken: response?.body?.mobileNumberToken,
        transactionId,
      };
      dispatch(actions.getFetchResendOTPLoading(payload));
    }
  };

  //Select accounts
  const onRadioChange = (e: any) => {
    setAccountNumberToken({
      ...accountNumberToken,
      value: e.target.value,
    });
  };

  //close Error modal
  const handlerCloseModal = () => {
    setApiError(false);
    setApiErrorMsg('');
    dispatch(actions.getFetchReset());
    if (isError412) {
      const url: any = sessionStorage.getItem('url');
      dispatch(actions.getFetchRedirectLoading());
      window.location.href = url;
    }
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  const bpiLogo = () => {
    return (
      <img
        src={`${process.env.PUBLIC_URL}/banks/bpi.png`}
        alt="BPI Logo"
        width="auto"
        height="auto"
      />
    );
  };

  return (
    <Wrapper>
      <Helmet>
        <title>Add Money Via BPI</title>
      </Helmet>
      <ProtectedContent>
        {loading && <Loading position="fixed" />}

        {isCashIn && (
          <Card title="Online Bank" size="medium">
            <div className="logo">{bpiLogo()}</div>
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
            </Field>
          </Card>
        )}

        {isSelectAccounts && (
          <Card title="Login to BPI Online" size="medium">
            <Fragment>
              <div className="text-center">
                <p>Cash in amount (₱)</p>
                <H3 className="total-amount">
                  {amount.value ? numberCommas(amount.value) : '0.00'}
                </H3>
              </div>
              <br />
              <div className="text-left">
                <H5>Select Bank Account</H5>
                <p>
                  Select your bank account with sufficient balance to link your
                  account and complete the cash in.
                </p>
              </div>
              <div className="list-account-wrapper reverse">
                {accounts?.body?.transactionalAccounts?.map(
                  (item: object | any) => (
                    <Fragment key={`${item.displayOrder}${item.accountNumber}`}>
                      <RadioComponent
                        name={item.accountPreferredName}
                        value={item.accountNumberToken}
                        onChange={e => onRadioChange(e)}
                      >
                        {bpiLogo()}
                        <div className="account-details">
                          <span>{item.accountNumber}</span>
                          <span>{item.accountType}</span>
                        </div>
                      </RadioComponent>
                      <br />
                    </Fragment>
                  ),
                )}
              </div>
              {accounts?.status === 'error' && <p>{accounts?.description}</p>}
              {accountNumberToken.isError && (
                <ErrorMsg formError>{accountNumberToken.errormsg}</ErrorMsg>
              )}
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  color="default"
                  size="large"
                  variant="contained"
                  onClick={onSubmitCashIn}
                >
                  Cash In
                </Button>
              </Flex>
            </Fragment>
          </Card>
        )}

        {isVerification && (
          <Card title="Login to BPI Online" size="medium">
            <Fragment>
              <div className="text-center">
                <H5>Enter Verification Code</H5>
                <p>
                  Authentication Code is 6 digits which is sent to your mobile
                  number.
                  <br />
                  <br />
                </p>
                <p className="number">{data?.response?.body?.mobileNumber}</p>
              </div>
              <div className="otp-wrapper">
                <div>
                  <Input
                    required
                    type="text"
                    placeholder="Enter SMS Code"
                    value={otp.value}
                    maxLength={6}
                    onChange={e =>
                      setOtp({
                        value: e.currentTarget.value,
                        isError: false,
                        errormsg: '',
                      })
                    }
                    error={otp.isError ? true : undefined}
                  />
                  {otp.isError && <ErrorMsg formError>{otp.errormsg}</ErrorMsg>}
                </div>
                <div className="timer">{counter} s</div>
              </div>
              <br />
              <br />
              <div className="verify-button-wrapper">
                {data !== null && counter === 0 && resendOTP === null && (
                  <div>
                    Need a new code?{' '}
                    <A
                      color="gold"
                      to=""
                      onClick={(e: any) => onSubmitVerification(e, true)}
                    >
                      Resend code
                    </A>
                  </div>
                )}
                <Button
                  type="submit"
                  color="secondary"
                  size="large"
                  variant="contained"
                  onClick={e => onSubmitVerification(e)}
                >
                  Verify
                </Button>
              </div>
            </Fragment>
          </Card>
        )}

        <Dialog show={isSuccess} size="xsmall">
          <div className="text-center" style={{ margin: '20px' }}>
            <Logo size="small" margin="0 0 30px" />
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H5 margin="10px 0 30px">Transaction successful</H5>
            <Button
              fullWidth
              onClick={() => {
                history.push('/dashboard');
                resetAddMoney();
                sessionStorage.setItem('amount', '');
                sessionStorage.setItem('url', '');
              }}
              variant="contained"
              color="primary"
              size="medium"
            >
              Ok
            </Button>
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
              onClick={handlerCloseModal}
              variant="contained"
              color="primary"
              size="large"
            >
              Ok
            </Button>
          </div>
        </Dialog>
      </ProtectedContent>
    </Wrapper>
  );
}
