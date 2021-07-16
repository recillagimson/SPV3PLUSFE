import * as React from 'react';
// import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';

// Components
import Button from 'app/components/Elements/Button';
import ComponentLoading from 'app/components/ComponentLoading';
import LoadingLogo from 'app/components/ComponentLoading/loading_dark.gif';

// Utils
import { parseToNumber, numberWithCommas } from 'utils/common';

/** slice */
import { useContainerSaga } from './slice';
import {
  selectLoading,
  // selectError,
  selectTransactionHistoryData,
} from './slice/selectors';
// import { transactionHistoryDefaultState } from './slice';

// Constants
import { TRANSACTION_TYPE } from 'constants/transactions';

// Styles
import * as S from './TransactionHistory.style';

// Assets
import NoTransactionsLogo from 'app/components/Assets/no-transactions.svg';

export function TransactionHistoryPage(props) {
  const [isLoading, setLoading] = React.useState(false); // Temporary loading for pagination
  const [pagination, setPagination] = React.useState(5); // Temporary pagination
  const [transactionType, setTransactionType] = React.useState(
    TRANSACTION_TYPE.ALL,
  );
  const [transactionHistory, setFilteredTransactionHistory] = React.useState(
    [],
  );
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const success: any = useSelector(selectTransactionHistoryData);
  React.useEffect(() => {
    dispatch(actions.getFetchLoading());
  }, [actions, dispatch]);

  React.useEffect(() => {
    if (success && success.data && success.data.length > 0) {
      setFilteredTransactionHistory(success.data);
    }
  }, [success]);

  const handleViewTransactionDetails = (id: string) => {
    props.history.push(`/transaction-history/${id}`);
  };

  const filteredTransactionDetails = (type: string) => {
    setTransactionType(type);
    if (type === TRANSACTION_TYPE.ALL) {
      setFilteredTransactionHistory(success?.data);
    } else {
      const data = success?.data?.filter(
        transaction => transaction.transaction_type === type,
      );
      setFilteredTransactionHistory(data);
    }
  };

  const renderTransactionTypeTitle = () => {
    switch (transactionType) {
      case TRANSACTION_TYPE.ALL:
        return 'All Transactions';
      case TRANSACTION_TYPE.RECEIVED:
        return 'Received';
      case TRANSACTION_TYPE.SENT:
        return 'Sent';
      default:
        return 'All Transactions';
    }
  };

  return (
    <>
      <Helmet>
        <title>Transaction History</title>
      </Helmet>
      <S.Wrapper>
        <S.TransactionHeader>
          <h3>Transaction History</h3>
        </S.TransactionHeader>
        <S.TransactionContent>
          <S.ButtonContainer>
            <Button
              onClick={() => filteredTransactionDetails(TRANSACTION_TYPE.ALL)}
              color="secondary"
              size="medium"
              variant={
                transactionType === TRANSACTION_TYPE.ALL
                  ? 'contained'
                  : 'outlined'
              }
            >
              All
            </Button>
            <Button
              onClick={() => filteredTransactionDetails(TRANSACTION_TYPE.SENT)}
              color="secondary"
              size="medium"
              variant={
                transactionType === TRANSACTION_TYPE.SENT
                  ? 'contained'
                  : 'outlined'
              }
            >
              Sent
            </Button>
            <Button
              onClick={() =>
                filteredTransactionDetails(TRANSACTION_TYPE.RECEIVED)
              }
              color="secondary"
              size="medium"
              variant={
                transactionType === TRANSACTION_TYPE.RECEIVED
                  ? 'contained'
                  : 'outlined'
              }
            >
              Received
            </Button>
          </S.ButtonContainer>
          <S.TransactionTitle>
            {renderTransactionTypeTitle()}
            <p>Recent transaction will reflect within 24 hours.</p>
          </S.TransactionTitle>
          <ComponentLoading isLoading={loading}>
            {transactionHistory.length > 0 ? (
              <S.TransactionList>
                {transactionHistory?.slice(0, pagination).map((d: any, i) => {
                  const isPostiveAmount =
                    d.transaction_category.transaction_type === 'POSITIVE';
                  const isNegativeAmount =
                    d.transaction_category.transaction_type === 'NEGATIVE';
                  const date = DateTime.fromISO(d.created_at);
                  const monthDateYear = date.toLocaleString(DateTime.DATE_MED);
                  const time = date.toLocaleString(DateTime.TIME_SIMPLE);

                  return (
                    <S.TransactionListItem
                      key={i}
                      isLast={i + 1 === transactionHistory.length}
                    >
                      <S.ListContainer>
                        <S.ListTitle>
                          {d.transaction_category.title}
                        </S.ListTitle>
                        <S.ListDescription>{monthDateYear}</S.ListDescription>
                        <S.ListDescription>{time}</S.ListDescription>
                      </S.ListContainer>
                      <S.ListContainer textAlign="right">
                        <S.ListTitle
                          isPositive={isPostiveAmount}
                          isNegative={isNegativeAmount}
                        >
                          PHP{' '}
                          {numberWithCommas(
                            parseToNumber(d.signed_total_amount),
                          )}
                        </S.ListTitle>
                        <Button
                          onClick={() => handleViewTransactionDetails(d.id)}
                          color="secondary"
                          size="small"
                          variant="outlined"
                        >
                          View Details
                        </Button>
                      </S.ListContainer>
                    </S.TransactionListItem>
                  );
                })}
                <S.TransactionListItem noBorder>
                  {isLoading && (
                    <img src={LoadingLogo} alt="Squid pay loading..." />
                  )}
                  {!isLoading && transactionHistory.length >= pagination && (
                    <Button
                      onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                          setPagination(pagination + 5);
                          setLoading(false);
                        }, 2000);
                      }}
                      color="secondary"
                      size="medium"
                      variant="outlined"
                    >
                      See more transactions
                    </Button>
                  )}
                </S.TransactionListItem>
              </S.TransactionList>
            ) : (
              <S.EmptyWrapper>
                <img src={NoTransactionsLogo} alt="No transactions..." />
                <h6>No Transactions</h6>
                <p>You haven't made any transactions yet</p>
              </S.EmptyWrapper>
            )}
          </ComponentLoading>
        </S.TransactionContent>
      </S.Wrapper>
    </>
  );
}
