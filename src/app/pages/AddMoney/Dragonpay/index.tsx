import * as React from 'react';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Button from 'app/components/Elements/Button';
import Input from 'app/components/Elements/Input';
import AddMoneyModal from '../components/AddMoneyModal';
import AddMoneyFrame from '../components/AddMoneyFrame';
import Loading from 'app/components/Loading';
import { StyleConstants } from 'styles/StyleConstants';
import { useSelector, useDispatch } from 'react-redux';
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectAddMoneyDragonpay,
  selectError,
} from './slice/selectors';

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
    setShowModal({ status: '', show: false });
  }

  function handlerCloseFrame() {
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
      >
        <div
          style={{
            padding: '25px',
            position: 'relative',
          }}
        >
          {loading && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '300px',
                width: '100%',
                background: 'white',
              }}
            >
              <Loading />
            </div>
          )}

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
            <label htmlFor="amount">Amount</label>
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
                Available Balance PHP xxx.xx
              </span>
            )}
          </div>
        </div>
        {showModal.show && (
          <AddMoneyModal
            success={showModal.status}
            onClick={handlerCloseModal}
          />
        )}
        {showIframe.show && (
          <AddMoneyFrame
            urlLink={showIframe.url}
            title="Dragonpay"
            onClick={handlerCloseFrame}
          />
        )}
      </Box>
    </ProtectedContent>
  );
}
