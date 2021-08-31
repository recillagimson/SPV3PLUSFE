import * as React from 'react';
import { DateTime } from 'luxon';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

// Components
import Button from 'app/components/Elements/Button';
import ComponentLoading from 'app/components/ComponentLoading';
import Dialog from 'app/components/Dialog';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';

// Utils
import { parseToNumber, numberWithCommas } from 'utils/common';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  // selectError,
  selectTransactionHistoryDetailsData,
} from './slice/selectors';

// Styles
import * as S from './TransactionHistory.style';

// Helpers
import {
  bankListData,
  receivedMoneyListData,
  dragonpayListData,
  loadListtData,
  paybillsData,
  drCrMemoData,
} from './helpers';
import { toTitleCase } from 'app/components/Helpers';

// Assets
import Logo from 'app/components/Assets/Logo';
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';
import TransactionScreenshotLogo from 'app/components/Assets/TransactionScreenshotLogo.svg';

function TransactionHistoryDetailsPage(props) {
  const [isOpen, setOpen] = React.useState(false);
  const { id } = props.match.params;
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const transactionHistoryDetailsData = useSelector(
    selectTransactionHistoryDetailsData,
  );

  React.useEffect(() => {
    dispatch(actions.getTransactionHistoryDetailsLoading(id));
  }, [actions, dispatch, id]);

  const isPostiveAmount =
    transactionHistoryDetailsData?.transaction_category?.transaction_type ===
    'POSITIVE';

  const isBankTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Bank',
    ) !== -1;

  const isReceiveMoneyTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Receive',
    ) !== -1;

  const isSendMoneyTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Send',
    ) !== -1;

  const isDragonpayTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Dragonpay',
    ) !== -1;

  const isLoadTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Load',
    ) !== -1;

  const isPayBillsTransaction =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Bills Payment',
    ) !== -1;

  const isDebitCreditMemo =
    transactionHistoryDetailsData?.transaction_category?.title?.indexOf(
      'Memo',
    ) !== -1;

  const renderListItems = () => {
    if (isBankTransaction) return bankListData(transactionHistoryDetailsData);
    if (isReceiveMoneyTransaction || isSendMoneyTransaction)
      return receivedMoneyListData(transactionHistoryDetailsData);
    if (isDragonpayTransaction)
      return dragonpayListData(transactionHistoryDetailsData);
    if (isLoadTransaction) return loadListtData(transactionHistoryDetailsData);
    if (isPayBillsTransaction)
      return paybillsData(transactionHistoryDetailsData);
    if (isDebitCreditMemo) return drCrMemoData(transactionHistoryDetailsData);

    return [];
  };

  // const hasServiceFee = isBankTransaction || isLoadTransaction;
  const hasServiceFee = isPayBillsTransaction;
  let date = DateTime.fromSQL(
    transactionHistoryDetailsData?.transactable?.created_at,
  );
  if (date.invalid) {
    date = DateTime.fromISO(
      transactionHistoryDetailsData?.transactable?.created_at,
    );
  }
  const monthDateYearTime = date.toLocaleString(DateTime.DATETIME_MED);

  return (
    <ProtectedContent>
      <Helmet>
        <title>Transaction History - Details</title>
      </Helmet>
      <S.Wrapper>
        <S.TransactionHeader>
          <h3>Transaction History</h3>
        </S.TransactionHeader>
        <ComponentLoading isLoading={loading}>
          {!loading && (
            <S.TransactionContent width="420px">
              <S.TransactionDetailsWrapper>
                <S.CuttedImageWrapper
                  src={WrapperCuttedCornerTop}
                  alt="Squid pay"
                />
                <S.TransactionDetailsWrapperContent>
                  <h6>
                    {isDragonpayTransaction
                      ? transactionHistoryDetailsData?.transaction_category
                          ?.title
                      : transactionHistoryDetailsData?.transaction_category
                          ?.description}
                  </h6>
                  <S.TransactionDetailsList>
                    {renderListItems().map((d, i) => (
                      <S.TransactionDetailsListItem key={i}>
                        <p>{d.label}</p>
                        <p>{d.value}</p>
                      </S.TransactionDetailsListItem>
                    ))}
                    <S.TransactionDetailsListItem>
                      <p>Status</p>
                      <p
                        className={
                          transactionHistoryDetailsData.status === 'SUCCESS' ||
                          transactionHistoryDetailsData.status === 'APPROVED'
                            ? 'text-green'
                            : transactionHistoryDetailsData.status === 'PENDING'
                            ? 'text-yellow'
                            : 'text-red'
                        }
                      >
                        {toTitleCase(transactionHistoryDetailsData.status)}
                      </p>
                    </S.TransactionDetailsListItem>
                  </S.TransactionDetailsList>
                  <S.TotalTransactions>
                    <p>Total Amount</p>
                    <p
                      className={`total ${
                        isPostiveAmount ? '--positive' : '--negative'
                      }`}
                    >
                      PHP&nbsp;
                      {numberWithCommas(
                        parseToNumber(
                          transactionHistoryDetailsData.signed_total_amount,
                        ),
                      )}
                    </p>
                    {hasServiceFee && (
                      <p>
                        Service Fee: PHP&nbsp;
                        {numberWithCommas(
                          parseToNumber(
                            transactionHistoryDetailsData.transactable
                              .service_fee,
                          ),
                        )}
                      </p>
                    )}
                  </S.TotalTransactions>
                  <S.FooterWrapper>
                    <Logo size="small" />
                    {/* <p>{DateTime.fromISO('2021-05-11 14:44:19').toString()}</p> */}
                    <p>{monthDateYearTime}</p>
                  </S.FooterWrapper>
                </S.TransactionDetailsWrapperContent>
                <S.CuttedImageWrapper src={WrapperCuttedCornerBottom} alt="" />
              </S.TransactionDetailsWrapper>
              <S.ButtonContainer direction="column" margin="20px 0 0">
                <Button
                  fullWidth
                  onClick={() => setOpen(!isOpen)}
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
                  onClick={() => props.history.push('/transaction-history')}
                  fullWidth
                >
                  Close
                </Button>
              </S.ButtonContainer>
            </S.TransactionContent>
          )}
        </ComponentLoading>
        <Dialog show={isOpen} size="small">
          <S.PaddingWrapper>
            <h3>Instructions</h3>
            <p>Capture and Save your receipt.</p>
            <img src={TransactionScreenshotLogo} alt="Squid pay transaction" />
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => setOpen(!isOpen)}
              fullWidth
            >
              Ok
            </Button>
          </S.PaddingWrapper>
        </Dialog>
      </S.Wrapper>
    </ProtectedContent>
  );
}

export { TransactionHistoryDetailsPage };
