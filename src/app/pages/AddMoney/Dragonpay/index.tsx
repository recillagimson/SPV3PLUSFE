import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import Input from 'app/components/Elements/Input';
import Loading from 'app/components/Loading';
import Logo from 'app/components/Assets/Logo';
import Dialog from 'app/components/Dialog';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';

import { numberCommas } from 'app/components/Helpers';

import { StyleConstants } from 'styles/StyleConstants';

// dragonpay own component
import AddMoneyModal from '../components/AddMoneyModal';
// import AddMoneyFrame from '../components/AddMoneyFrame';

import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectAddMoneyDragonpay,
  selectError,
} from './slice/selectors';
import { selectData as selectDashData } from 'app/pages/DashboardPage/slice/selectors';
import { containerActions as dashActions } from 'app/pages/DashboardPage/slice';
import Label from 'app/components/Elements/Label';

export function Dragonpay() {
  const inputEl: any = React.useRef(null);
  const [showModal, setShowModal] = React.useState({
    status: '',
    show: false,
  });
  const [showIframe, setShowIframe] = React.useState({
    show: false,
    url: '',
  });
  const [errorMessage, setErrorMessage] = React.useState('');

  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const dashData: any = useSelector(selectDashData);
  const addMoneyDragonpay = useSelector(selectAddMoneyDragonpay);

  function handlerSubmitMoney() {
    if (inputEl) {
      setErrorMessage('');
      if (inputEl.current.value > 0) {
        dispatch(actions.getFetchLoading(inputEl.current.value));
      } else {
        setErrorMessage('Invalid amount.');
      }
    }
  }

  function handlerCloseModal() {
    dispatch(actions.getFetchReset());
    dispatch(dashActions.getFetchLoading());
    setShowModal({ status: '', show: false });
  }

  function handlerCloseFrame(url) {
    // console.log(url);
    window.open(
      url,
      'dragonpay',
      'scrollbars=no,resizable=no,toolbar=no,menubar=no,width=720,height=560',
    );
    dispatch(actions.getFetchReset());
    setShowIframe({ show: false, url: '' });
  }

  React.useEffect(() => {
    if (
      error &&
      Object.keys(error).length !== 0 &&
      Object.values(error).length !== 0
    ) {
      setShowModal({
        status: 'failed',
        show: true,
      });
    }

    if (addMoneyDragonpay) {
      setShowIframe({
        show: true,
        url: addMoneyDragonpay.Url,
      });
      if (inputEl) {
        inputEl.current.value = '';
      }
    }
  }, [error, addMoneyDragonpay]);

  React.useEffect(() => {
    return () => {
      dispatch(actions.getFetchReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            ref={inputEl}
            id="amount"
            placeholder="PHP 0.00"
            type="number"
            hidespinner={true}
            onChange={() => setErrorMessage('')}
            style={{
              borderColor:
                errorMessage && `${StyleConstants.BUTTONS.danger.main}`,
            }}
          />
          {errorMessage.length ? (
            <span
              style={{
                fontSize: '12px',
                color: `${StyleConstants.BUTTONS.danger.main}`,
              }}
            >
              {errorMessage}
            </span>
          ) : (
            <span style={{ fontSize: '12px', fontWeight: 'lighter' }}>
              Available Balance PHP {balanceInfo}
            </span>
          )}
        </div>
      </Box>
      {showModal.show && (
        <AddMoneyModal success={showModal.status} onClick={handlerCloseModal} />
      )}
      {/* {showIframe.show && (
        <AddMoneyFrame
          urlLink={showIframe.url}
          title="Dragonpay"
          onClick={handlerCloseFrame}
        />
      )} */}

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
