import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { DateTime } from 'luxon';

import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import Box from 'app/components/Box';
import Loading from 'app/components/Loading';
import ReceiptWrapper from 'app/components/Elements/Receipt';
import H6 from 'app/components/Elements/H6';
import Logo from 'app/components/Assets/Logo';
import Button from 'app/components/Elements/Button';
import Dialog from 'app/components/Dialog';
import TransactionScreenshotLogo from 'app/components/Assets/TransactionScreenshotLogo.svg';

import { toTitleCase } from 'app/components/Helpers';
import { numberWithCommas } from 'utils/common';

// slice
import { containerActions as actions } from '../slice';
import { selectTransactionHistoryDetailsData } from '../slice/selectors';

import * as S from '../TransactionHistory.style';

import AddMoneyUBP from './AddMoneyUBP';
import AddMoneyDragonpay from './AddMoneyDragonpay';
import AddMoneyECPay from './AddMoneyECPay';
import AddMoneyBPI from './AddMoneyBPI';
import SendMoneySquidpayAccount from './SendMoneySquidpayAccount';
import SendToBank from './SendToBank';
import BuyLoad from './BuyLoad';
import DebitCreditMemo from './Memo';
import Paybills from './Paybills';

export function TransactionHistoryDetailsPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const details = useSelector(selectTransactionHistoryDetailsData);

  const [isInstruction, setIsInstruction] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    return () => {
      dispatch(actions.getTransactionHistoryDetailsReset());
    };
  }, [dispatch]);

  React.useEffect(() => {
    const id: string =
      location && location.state ? (location.state as string) : '';

    if (id) {
      dispatch(actions.getTransactionHistoryDetailsLoading(id));
    }
  }, [dispatch, location]);

  React.useEffect(() => {
    if (details && details.status) {
      setLoading(false);
    }
  }, [details]);

  const isPositiveAmount = details
    ? details?.transaction_category?.transaction_type === 'POSITIVE'
    : false;

  const hasServiceFee = details
    ? details?.transaction_category?.title?.indexOf('Bills Payment') !== -1
    : false;

  let monthDateYearTime = '';
  if (details) {
    let date = DateTime.fromSQL(details?.transactable?.created_at);
    if (!date.isValid) {
      date = DateTime.fromISO(details?.transactable?.created_at);
    }
    monthDateYearTime = date.toLocaleString(DateTime.DATETIME_MED);
  }

  return (
    <ProtectedContent>
      <Helmet title="Transaction History - Details" />
      <Box
        title="Transaction History"
        titleBorder
        withPadding
        onBack={() => history.goBack()}
      >
        {loading && <Loading position="relative" />}

        {details && details.status && (
          <>
            <ReceiptWrapper isDark>
              <H6 align="center">
                {details?.transaction_category.name === 'CASHINDRAGONPAY' ||
                details?.transaction_category.name === 'ADDMONEYECPAY'
                  ? details.transaction_category?.title
                  : details.transaction_category?.description}
              </H6>

              <S.TransactionDetailsList>
                {details?.transaction_category.name === 'CASHINDRAGONPAY' && (
                  <AddMoneyDragonpay details={details} />
                )}
                {details?.transaction_category.name === 'CASHINBPI' && (
                  <AddMoneyBPI details={details} />
                )}
                {details?.transaction_category.name === 'ADDMONEYUBPDIRECT' && (
                  <AddMoneyUBP details={details} />
                )}
                {details?.transaction_category.name === 'ADDMONEYECPAY' && (
                  <AddMoneyECPay details={details} />
                )}
                {(details.transaction_category.name === 'CXSEND' ||
                  details.transaction_category.name === 'CXRECEIVE') && (
                  <SendMoneySquidpayAccount details={details} />
                )}
                {(details.transaction_category.name === 'WITHDRAWUBPINSTAPAY' ||
                  details.transaction_category.name ===
                    'WITHDRAWUBPPESONET') && <SendToBank details={details} />}
                {details.transaction_category.name === 'CXLOAD' && (
                  <BuyLoad details={details} />
                )}
                {details.transaction_category.name === 'BILLS' && (
                  <Paybills details={details} />
                )}
                {details.transaction_category.name === 'CR_MEMO' && (
                  <DebitCreditMemo details={details} />
                )}

                <S.TransactionDetailsListItem>
                  <p>Status</p>
                  <p
                    className={
                      details.status === 'SUCCESS' ||
                      details.status === 'APPROVED'
                        ? 'text-green'
                        : details.status === 'PENDING'
                        ? 'text-yellow'
                        : 'text-red'
                    }
                  >
                    {toTitleCase(details.status)}
                  </p>
                </S.TransactionDetailsListItem>
              </S.TransactionDetailsList>

              <S.TotalTransactions>
                <p>Total Amount</p>
                <p
                  className={`total ${
                    isPositiveAmount ? '--positive' : '--negative'
                  }`}
                >
                  PHP&nbsp;
                  {isPositiveAmount && '+'}
                  {numberWithCommas(details.signed_total_amount)}
                </p>
                {hasServiceFee && (
                  <p>
                    Service Fee: PHP{' '}
                    {numberWithCommas(details.transactable.service_fee)}
                  </p>
                )}
              </S.TotalTransactions>
              <S.FooterWrapper>
                <Logo size="small" />
                {/* <p>{DateTime.fromISO('2021-05-11 14:44:19').toString()}</p> */}
                <p>{monthDateYearTime}</p>
              </S.FooterWrapper>
            </ReceiptWrapper>

            <S.ButtonContainer
              direction="column"
              margin="20px auto 0"
              style={{ maxWidth: 380 }}
            >
              <Button
                fullWidth
                onClick={() => setIsInstruction(true)}
                variant="outlined"
                color="secondary"
                size="large"
              >
                Save Transaction
              </Button>
              <Button
                size="large"
                color="primary"
                variant="contained"
                onClick={() => history.push('/transaction-history')}
                fullWidth
              >
                Close
              </Button>
            </S.ButtonContainer>
          </>
        )}
      </Box>

      <Dialog show={isInstruction} size="small">
        <S.PaddingWrapper>
          <h3>Instructions</h3>
          <p>Capture and Save your receipt.</p>
          <img src={TransactionScreenshotLogo} alt="Squid pay transaction" />
          <Button
            size="large"
            color="primary"
            variant="contained"
            onClick={() => setIsInstruction(false)}
            fullWidth
          >
            Ok
          </Button>
        </S.PaddingWrapper>
      </Dialog>
    </ProtectedContent>
  );
}
