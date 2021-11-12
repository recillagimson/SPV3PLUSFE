import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory, useLocation } from 'react-router';
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
import UbpLogoImage from 'app/components/Assets/ubp-logo-add.png';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import H3 from 'app/components/Elements/H3';
import Loading from 'app/components/Loading';

import Wrapper from './Wrapper';
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { useContainerSaga } from './slice';
import {
  selectAuthUrl,
  selectData,
  selectLoading,
  selectError,
  selectLinkSuccess,
  selectCashInSuccess,
} from './slice/selectors';

export function AddMoneyViaUBP() {
  const dispatch = useDispatch();
  const history = useHistory();

  const location = useLocation();
  const { actions } = useContainerSaga();

  const dashData: any = useSelector(selectDashData);
  const cashinSuccess: object | any = useSelector(selectData);
  const data: object | any = useSelector(selectCashInSuccess);
  const linkSuccess: object | any = useSelector(selectLinkSuccess);
  const error: any = useSelector(selectError);
  const loading: boolean = useSelector(selectLoading);
  const authUrlPayload: string | any = useSelector(selectAuthUrl);
  const linkAccount = React.useCallback(
    (code: string) => {
      dispatch(actions.getLinkAccountLoading({ code }));
    },
    [actions, dispatch],
  );
  useEffect(() => {
    const code = new URLSearchParams(location.search).get('code');
    if (code) {
      linkAccount(code);
    }
  }, [linkAccount, location]);

  const [isError901, setIsError901] = useState(false);
  const [isError902, setIsError902] = useState(false);
  useEffect(() => {
    if (isError901 || isError902) {
      dispatch(actions.getGenerateAuthUrlLoading());
    }
  }, [actions, dispatch, isError901, isError902]);

  const [isSuccess, setIsSuccess] = useState(false);
  const [isCashIn, setIsCashIn] = useState(true);
  const [isError412, setIsError412] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiErrorMsg, setApiErrorMsg] = useState('');
  const [amount, setAmount] = useState({
    value: sessionStorage.getItem('amount') ?? '',
    isError: false,
    errormsg: '',
  });

  const resetAddMoney = () => {
    setIsCashIn(true);
    setAmount({
      ...amount,
      value: '',
      isError: false,
      errormsg: '',
    });
    setIsError412(false);
    setIsError901(false);
    setIsError902(false);
    dispatch(actions.getTopUpReset());
  };

  const successLink = React.useMemo(() => {
    return linkSuccess;
  }, [linkSuccess]);

  useEffect(() => {
    if (successLink) {
      const data = {
        amount: parseFloat(amount.value),
      };
      dispatch(actions.getFetchLoading(data));
    }
  }, [actions, amount.value, dispatch, successLink]);

  useEffect(() => {
    if (cashinSuccess || (data && data?.status === 'SUCCESS')) {
      setIsCashIn(false);
      setIsSuccess(true);
    }
  }, [cashinSuccess, data]);

  useEffect(() => {
    if (authUrlPayload?.authorizeUrl) {
      sessionStorage.setItem('amount', amount.value);
      sessionStorage.setItem('ubpUrl', authUrlPayload?.authorizeUrl);
      window.location.href = authUrlPayload?.authorizeUrl;
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUrlPayload, amount]);

  //Error useEffect
  //BPI login redirect useEFfect
  useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, amount.value]);

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
        const i901 = err.errors.error_code.findIndex(j => j === 901);
        const i902 = err.errors.error_code.findIndex(j => j === 902);

        // dont reset on error i426 & i412
        if (i426 === -1 && i412 === -1 && i901 === -1) {
          apiError = err.errors.message.join('\n');
          resetAddMoney();
        }
        // display error on 426
        if (i426 !== -1) {
          apiError = err.errors.message.join('\n');
        }
        // display error on 412
        if (i412 !== -1) {
          apiError = err.errors.message.join('\n');
          setIsError412(true);
        }

        // display error for 901
        if (i901 !== -1) {
          apiError = err.errors.message.join('\n');
          setIsError901(true);
        }
        // display error for 902
        if (i902 !== -1) {
          apiError = err.errors.message.join('\n');
          setIsError902(true);
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

  const handlerCloseModal = () => {
    setApiError(false);
    setApiErrorMsg('');
    dispatch(actions.getFetchReset());
    if (isError412) {
      const url: any = sessionStorage.getItem('url');
      dispatch(actions.getFetchRedirectLoading());
      window.location.href = url;
    } else {
      sessionStorage.clear();
    }
  };

  let balanceInfo = '000.00';
  if (dashData && dashData.balance_info) {
    balanceInfo = numberCommas(dashData.balance_info.available_balance);
  }

  const ubpLogo = () => {
    return (
      <img src={UbpLogoImage} alt="UBP Logo" width="166px" height="auto" />
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
            <div className="logo">{ubpLogo()}</div>
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
                sessionStorage.clear();
                resetAddMoney();
                history.push('/dashboard');
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
