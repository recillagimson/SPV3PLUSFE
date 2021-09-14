import React, { useEffect, useState, Fragment } from 'react';
import { Helmet } from 'react-helmet-async';
import styled from 'styled-components/macro';
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
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { maskCharactersInside, numberCommas } from 'app/components/Helpers';
import Logo from 'app/components/Assets/Logo';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import H3 from 'app/components/Elements/H3';
import RadioComponent from 'app/components/Elements/Radio';
import Loading from 'app/components/Loading';

import { useContainerSaga } from './slice';
import { selectAddMoneyBpi, selectLoading } from './slice/selectors';

const Wrapper = styled.div`
  .account-wrapper {
    display: flex;
    justify-content: center;
    flex-direction: column;
    margin-left: 20px;
  }
`;

export function AddMoneyViaBPI() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();

  const dashData: any = useSelector(selectDashData);
  const addMoneyBpi: any = useSelector(selectAddMoneyBpi);
  const loading = useSelector(selectLoading);

  const [amount, setAmount] = useState({
    value: '',
    error: false,
    errormsg: '',
  });

  // const isSuccess = false;
  const [isSuccess, setIsSuccess] = useState(false);
  const [isCashIn, setIsCashIn] = useState(true);
  const [isSelectAccounts, setIsSelectAccounts] = useState(false);
  const [isVerification, setIsVerification] = useState(false);
  // const [showForm, setShowForm] = React.useState(true);

  useEffect(() => {
    if (addMoneyBpi) {
      sessionStorage.setItem('test', amount.value);
      window.location.href = addMoneyBpi.login_url;
    }
    //   setShowIframe({
    //     show: true,
    //     url: addMoneyBpi.login_url,
    //   });
    // }
  }, [addMoneyBpi, amount.value]);

  useEffect(() => {
    if (window.location.pathname === '/add-money/bpi/select-account') {
      dispatch(actions.getFetchReset());
      const amountValue: any = sessionStorage.getItem('test');
      setAmount({ ...amount, value: amountValue.toString() });
      setIsSelectAccounts(true);
      setIsCashIn(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (e && e.preventDefault) e.preventDefault();

    let error = false;
    // Check amount if it's valid
    if (amount.value === '') {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'Oops! This field cannot be empty.',
      });
    }

    // Check amount if it's less than
    if (parseFloat(amount.value) <= 0) {
      error = true;
      setAmount({
        ...amount,
        error: true,
        errormsg: 'You entered invalid amount.',
      });
    }

    if (!error) {
      const data = {
        amount: parseFloat(amount.value),
      };
      // dispatch payload to saga
      dispatch(actions.getFetchLoading(data));
      setIsCashIn(false);
    }
  };

  const onSubmitCashIn = () => {
    setIsSelectAccounts(false);
    setIsVerification(true);
  };

  const onSubmitVerification = () => {
    setIsSuccess(true);
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
        {isSelectAccounts && (
          <Card title="Login to BPI Online" size="medium">
            <Fragment>
              <div className="text-center">
                <p>Cash in amount (₱)</p>
                <H3 className="total-amount">{numberCommas(amount.value)}</H3>
              </div>
              <br />
              <div style={{ textAlign: 'left' }}>
                <H5>Select Bank Account</H5>
                <p>
                  Select your bank account with sufficient balance to link your
                  account and complete the cash in.
                </p>
              </div>
              <RadioComponent name="solution" value="qr">
                {bpiLogo()}
                <div className="account-wrapper">
                  <span>XXXXXX4444</span>
                  <span>Savings Account</span>
                </div>
              </RadioComponent>

              <br />
              <RadioComponent name="solution" value="br">
                {bpiLogo()}
                <div className="account-wrapper">
                  <span>XXXXXX4333</span>
                  <span>Current Account</span>
                </div>
              </RadioComponent>

              <br />
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

        {/* //Verify */}
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
                  {maskCharactersInside('+639279565916')}
                </p>
              </div>
              <div className="testss">
                <Input
                  required
                  type="text"
                  value={amount.value}
                  onChange={e => console.log('test')}
                  placeholder="Email or Mobile No."
                  className={amount.error ? 'error' : undefined}
                />
                <Button
                  type="submit"
                  color="default"
                  size="large"
                  variant="contained"
                  onClick={onSubmitCashIn}
                >
                  Cash In
                </Button>
              </div>
              <Flex justifyContent="flex-end">
                <Button
                  type="submit"
                  color="default"
                  size="large"
                  variant="contained"
                  onClick={onSubmitVerification}
                >
                  Verify
                </Button>
              </Flex>
            </Fragment>
          </Card>
        )}

        {isCashIn && (
          <Card title="Online Bank" size="medium">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              {bpiLogo()}
            </div>
            <Field>
              <Label>Amount</Label>
              <InputTextWrapper>
                <Input
                  type="number"
                  placeholder="0.00"
                  value={amount.value}
                  autoComplete="off"
                  onChange={e =>
                    setAmount({
                      value: e.currentTarget.value,
                      error: false,
                      errormsg: '',
                    })
                  }
                  error={amount.error ? true : undefined}
                />
                <span>PHP</span>
              </InputTextWrapper>

              {amount.error ? (
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

        <Dialog show={isSuccess} size="xsmall">
          <div style={{ margin: '20px', textAlign: 'center' }}>
            <Logo size="small" margin="0 0 30px" />
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H5 margin="10px 0 30px">Transaction successful</H5>
            <Button
              fullWidth
              onClick={() => history.push('/dashboard')}
              variant="contained"
              color="primary"
              size="medium"
            >
              Ok
            </Button>
          </div>
        </Dialog>
        <Dialog show={false} size="xsmall">
          <div style={{ margin: '20px', textAlign: 'center' }}>
            <CircleIndicator size="medium" color="danger">
              <FontAwesomeIcon icon="times" />
            </CircleIndicator>
            <H5 margin="10px 0 20px">Transaction failed</H5>
            <Button
              fullWidth
              // onClick={onClick}
              variant="outlined"
              size="medium"
            >
              Ok
            </Button>
          </div>
        </Dialog>
      </ProtectedContent>
    </Wrapper>
  );
}
