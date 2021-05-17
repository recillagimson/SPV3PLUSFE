import * as React from 'react';
import { DateTime } from 'luxon';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';

// get our fontawesome imports
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Components
import Button from 'app/components/Elements/Button';
import ComponentLoading from 'app/components/ComponentLoading';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import Dialog from 'app/components/Dialog';

// Utils
import { parseToNumber, numberWithCommas } from 'utils/common';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  selectError,
  selectTransactionHistoryDetailsData,
} from './slice/selectors';

// Styles
import * as S from './TransactionHistory.style';

// Assets
import Logo from 'app/components/Assets/Logo';
import WrapperCuttedCornerBottom from 'app/components/Assets/WrapperCuttedCornerBottom.svg';
import WrapperCuttedCornerTop from 'app/components/Assets/WrapperCuttedCornerTop.svg';

function TransactionHistoryDetailsPage(props) {
  const { id } = props.match.params;
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const error: any = useSelector(selectError);
  const transactionHistoryDetailsData = useSelector(
    selectTransactionHistoryDetailsData,
  );

  React.useEffect(() => {
    dispatch(actions.getTransactionHistoryDetailsLoading(id));
  }, [actions, dispatch]);

  const transactionListData = [
    {
      label: 'Account Name',
      value: transactionHistoryDetailsData?.accountName,
    },
    {
      label: 'Account Number',
      value: transactionHistoryDetailsData?.accountNumber,
    },
    {
      label: 'Transaction Number',
      value: transactionHistoryDetailsData?.transactionNumber,
    },
    {
      label: 'Purpose of transaction',
      value: transactionHistoryDetailsData?.purpose,
    },
  ];

  const isPostiveAmount =
    transactionHistoryDetailsData?.transactionType === 'POSITIVE';

  console.log(
    'transactionHistoryDetailsData?.transactionDate',
    transactionHistoryDetailsData?.transactionDate,
  );
  return (
    <>
      <Helmet>
        <title>Transaction History</title>
      </Helmet>
      <S.Wrapper>
        <S.TransactionHeader>
          <h3>Transaction History</h3>
        </S.TransactionHeader>
        <ComponentLoading isLoading={loading}>
          {!loading && (
            <S.TransactionContent width="420px">
              <S.TransactionDetailsWrapper>
                <S.CuttedImageWrapper src={WrapperCuttedCornerTop} alt="" />
                <S.TransactionDetailsWrapperContent>
                  <h6>Send Money to Land Bank of the Philippines</h6>
                  <S.TransactionDetailsList>
                    {transactionListData?.map((d, i) => (
                      <S.TransactionDetailsListItem key={i}>
                        <p>{d.label}</p>
                        <p>{d.value}</p>
                      </S.TransactionDetailsListItem>
                    ))}
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
                          transactionHistoryDetailsData.signedAmount,
                        ),
                      )}
                    </p>
                    <p>
                      Service Fee: PHP&nbsp;
                      {numberWithCommas(
                        parseToNumber(transactionHistoryDetailsData.serviceFee),
                      )}
                    </p>
                  </S.TotalTransactions>
                  <S.FooterWrapper>
                    <Logo size="small" />
                    <p>{DateTime.fromISO('2021-05-11 14:44:19').toString()}</p>
                  </S.FooterWrapper>
                </S.TransactionDetailsWrapperContent>
                <S.CuttedImageWrapper src={WrapperCuttedCornerBottom} alt="" />
              </S.TransactionDetailsWrapper>
              <S.ButtonContainer direction="column" margin="20px 0 0">
                <Button
                  fullWidth
                  onClick={() => {}}
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
        <Dialog show={false} size="small">
          <S.PaddingWrapper>
            <Logo size="small" margin="0 0 40px" />
            <CircleIndicator size="medium">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <h3>Transaction successfully saved</h3>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={() => alert('For Development')}
              fullWidth
            >
              Close
            </Button>
          </S.PaddingWrapper>
        </Dialog>
      </S.Wrapper>
    </>
  );
}

export { TransactionHistoryDetailsPage };
