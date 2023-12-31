import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory } from 'react-router';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import Input from 'app/components/Elements/Input';
import InputTextWrapper from 'app/components/Elements/InputTextWrapper';
import ErrorMsg from 'app/components/Elements/ErrorMsg';
import Loading from 'app/components/Loading';
import Logo from 'app/components/Assets/Logo';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';

import { numberCommas } from 'app/components/Helpers';

import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectAddMoneyDragonpay,
  selectError,
} from './slice/selectors';
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { containerActions as dashActions } from 'app/pages/DashboardPage/slice';
import Label from 'app/components/Elements/Label';
import Paragraph from 'app/components/Elements/Paragraph';

export function Dragonpay() {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dashData: any = useSelector(selectDashData);
  const addMoneyDragonpay = useSelector(selectAddMoneyDragonpay);

  const [amount, setAmount] = React.useState({
    value: '',
    error: false,
    msg: '',
  });

  const [showIframe, setShowIframe] = React.useState({
    show: false,
    url: '',
  });
  const [apiError, setApiError] = React.useState(false);
  const [apiErrorMsg, setApiErrorMsg] = React.useState('');

  let windowObjectReference: Window | null = null;

  function handlerSubmitMoney() {
    let hasError = false;

    if (amount.value === '') {
      hasError = true;
      setAmount({ ...amount, error: true, msg: 'Please enter amount.' });
    }

    if (amount.value !== '' && parseInt(amount.value) < 200) {
      hasError = true;
      setAmount({
        ...amount,
        error: true,
        msg: 'The amount must be at least 200 or greater.',
      });
    }

    if (!hasError) {
      dispatch(actions.getFetchLoading(parseInt(amount.value)));
    }
  }

  function handlerCloseModal() {
    // setShowModal({ status: '', show: false });
    setApiError(false);
    setApiErrorMsg('');
    dispatch(actions.getFetchReset());
    dispatch(dashActions.getFetchLoading());
  }

  function handlerCloseFrame(url) {
    if (windowObjectReference === null) {
      windowObjectReference = window.open(
        url,
        'dragonpayWeb',
        'scrollbars=no,resizable=no,toolbar=no,menubar=no,width=720,height=560,left=200,top=200',
      );
    }
    dispatch(actions.getFetchReset());
    setShowIframe({ show: false, url: '' });
    setAmount({ value: '', error: false, msg: '' });

    if (windowObjectReference) {
      windowObjectReference.addEventListener(
        'beforeunload',
        beforeUnloadListener,
        { capture: true },
      );
    }
  }

  // listener for the opened window
  const beforeUnloadListener = e => {
    if (e && e.preventDefault) e.preventDefault();
    history.push('/dashboard');
  };

  React.useEffect(() => {
    return () => {
      if (windowObjectReference) {
        windowObjectReference.removeEventListener(
          'beforeunload',
          beforeUnloadListener,
          { capture: true },
        );
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (error && Object.keys(error).length > 0) {
      onApiError(error);
    }

    if (addMoneyDragonpay) {
      setShowIframe({
        show: true,
        url: addMoneyDragonpay.Url,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, addMoneyDragonpay]);

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onApiError = (err: any) => {
    let apiError = '';
    if (err.code && err.code === 422) {
      if (
        err.errors &&
        err.errors.error_code &&
        err.errors.error_code.length > 0
      ) {
        const i405 = err.errors.error_code.findIndex(j => j === 405);
        if (i405 !== -1) {
          apiError = err.errors.message.join('\n');
        }
      }

      if (err.errors && !err.errors.error_code) {
        if (err.errors.amount && err.errors.amount.length > 0) {
          apiError = err.errors.amount.join('\n');
        }
      }
      setApiErrorMsg(apiError || '');
      setApiError(true);
    }
    if (err.code && err.code === 500) {
      setApiErrorMsg(
        'Oops! We are having problem connecting to Dragonpay. Please try again later.',
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

  return (
    <ProtectedContent>
      <Box
        title="Online Bank"
        titleBorder
        footer={
          <Button
            size="large"
            color="primary"
            variant="contained"
            style={{ width: '150px' }}
            disabled={loading}
            onClick={handlerSubmitMoney}
          >
            Next
          </Button>
        }
        footerAlign="right"
        withPadding
      >
        {loading && <Loading position="absolute" />}

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={`${process.env.PUBLIC_URL}/banks/dragonpay.png`}
            alt="dragonpay"
            width="auto"
            height="auto"
            style={{ margin: 'auto' }}
          />
        </div>
        <div id="addMoneyDragonpay" style={{ marginTop: 30 }}>
          <Label htmlFor="amount">Amount</Label>
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
            <Paragraph size="xsmall" color="mute" margin="3px 0 0">
              Available Balance PHP {balanceInfo}
            </Paragraph>
          )}
          {amount.error && <ErrorMsg formError>{amount.msg}</ErrorMsg>}
        </div>
      </Box>

      <Dialog show={apiError} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="danger">
            <FontAwesomeIcon icon="times" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">{apiErrorMsg}</H3>

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

      <Dialog show={showIframe.show} size="small">
        <div className="text-center" style={{ padding: '20px 20px 30px' }}>
          <Logo size="small" margin="0 0 30px" />
          <CircleIndicator size="medium" color="primary">
            <FontAwesomeIcon icon="check" />
          </CircleIndicator>
          <H3 margin="15px 0 30px">
            When you click Ok, you will be redirected to the Dragonpay page
          </H3>

          <Button
            fullWidth
            onClick={() => handlerCloseFrame(showIframe.url)}
            variant="contained"
            color="primary"
            size="large"
          >
            Ok
          </Button>
        </div>
      </Dialog>
    </ProtectedContent>
  );
}
