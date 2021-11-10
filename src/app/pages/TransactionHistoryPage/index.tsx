import * as React from 'react';
// import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { useSelector, useDispatch } from 'react-redux';
import { DateTime } from 'luxon';
import { useHistory } from 'react-router-dom';

// Components
import Button from 'app/components/Elements/Button';
import ComponentLoading from 'app/components/ComponentLoading';
import Loading from 'app/components/Loading';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';

// Utils
import { numberWithCommas } from 'utils/common';

/** slice */
import { useContainerSaga } from './slice';
import { selectTransactionHistoryData } from './slice/selectors';
// import { transactionHistoryDefaultState } from './slice';

// Constants
import { TRANSACTION_TYPE } from 'constants/transactions';

// Styles
import * as S from './TransactionHistory.style';

// Assets
import NoTransactionsLogo from 'app/components/Assets/no-transactions.svg';
import RequestTransactionLogo from 'app/components/Assets/search.svg';
import { toTitleCase } from 'app/components/Helpers';

export function TransactionHistoryPage(props) {
  const history = useHistory();
  const { actions } = useContainerSaga();
  const dispatch = useDispatch();
  // const loading = useSelector(selectLoading);
  // const error: any = useSelector(selectError);
  const success: any = useSelector(selectTransactionHistoryData);

  const [isLoading, setLoading] = React.useState(false); // Temporary loading for pagination
  const [noRecords, setNoRecords] = React.useState(false);
  const [noFiltered, setNoFiltered] = React.useState(false);
  const [records, setRecords] = React.useState<any[]>([]);
  const [transactionType, setTransactionType] = React.useState(
    TRANSACTION_TYPE.ALL,
  );
  const [transactionHistory, setTransactionHistory] = React.useState<any[]>([]);
  const [pageDetails, setPageDetails] = React.useState({
    current_page: 1,
    last_page: 1,
  });
  const [currentPage, setCurrentPage] = React.useState(1);

  React.useEffect(() => {
    dispatch(actions.getFetchLoading(currentPage));
    setLoading(true);

    return () => {
      setTransactionHistory([]);
      setRecords([]);
      setCurrentPage(1);
      setPageDetails({
        current_page: 1,
        last_page: 1,
      });
      dispatch(actions.getFetchReset());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (success && success.data) {
      setLoading(false);

      if (success.data.length > 0) {
        // concatenate previous data with newly loaded data
        const { data, ...pageDetails } = success;
        const newArray = [...records, ...data];
        setRecords(newArray); // store all records in a state where we can reference it again when filter is All
        // check the filter first for proper handling of loading more data
        if (transactionType === TRANSACTION_TYPE.ALL) {
          setTransactionHistory(newArray);
        } else if (
          transactionType === TRANSACTION_TYPE.PENDING ||
          transactionType === TRANSACTION_TYPE.FAILED
        ) {
          const newRecords = [...records];
          const data = newRecords.filter(
            transaction => transaction.status.toLowerCase() === transactionType,
          );
          setTransactionHistory(data);
          if (data.length === 0) {
            setNoFiltered(true);
          } else {
            setNoFiltered(false);
          }
        } else {
          const data = newArray.filter(
            transaction =>
              transaction.transaction_type.toLowerCase() === transactionType,
          );
          if (data.length === 0) {
            setNoFiltered(true);
          } else {
            setNoFiltered(false);
          }
          setTransactionHistory(data);
        }

        setPageDetails(pageDetails);
      }
      if (success.data.length === 0) {
        setNoRecords(true);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success]);

  const onLoadMore = page => {
    setCurrentPage(page);
    setLoading(true);
    dispatch(actions.getFetchLoading(page));
  };

  const handleViewTransactionDetails = (id: string) => {
    props.history.push({
      pathname: `/transaction-history/${id}`,
      state: id,
    });
  };

  const filteredTransactionDetails = (type: string) => {
    setTransactionType(type);

    if (type.toLowerCase() === TRANSACTION_TYPE.ALL) {
      setTransactionHistory(records);
      setNoFiltered(false);
      return;
    }

    if (
      type.toLowerCase() === TRANSACTION_TYPE.PENDING ||
      type.toLowerCase() === TRANSACTION_TYPE.FAILED
    ) {
      const newRecords = [...records];
      const data = newRecords.filter(
        transaction => transaction.status.toLowerCase() === type,
      );
      setTransactionHistory(data);
      if (data.length === 0) {
        setNoFiltered(true);
      } else {
        setNoFiltered(false);
      }
      return;
    }

    const newRecords = [...records];
    const data = newRecords.filter(
      transaction => transaction.transaction_type.toLowerCase() === type,
    );
    setTransactionHistory(data);
    if (data.length === 0) {
      setNoFiltered(true);
    } else {
      setNoFiltered(false);
    }
    return;
  };

  const renderTransactionTypeTitle = () => {
    switch (transactionType) {
      case TRANSACTION_TYPE.ALL:
        return 'All Transactions';
      case TRANSACTION_TYPE.RECEIVED:
        return 'Received';
      case TRANSACTION_TYPE.SENT:
        return 'Sent';
      case TRANSACTION_TYPE.PENDING:
        return 'Pending';
      case TRANSACTION_TYPE.FAILED:
        return 'Failed';
      default:
        return 'All Transactions';
    }
  };

  // console.log('TRANSACTION_TYPE', Object.keys(TRANSACTION_TYPE));
  return (
    <ProtectedContent>
      <Helmet>
        <title>Transaction History</title>
      </Helmet>
      <S.Wrapper>
        <S.TransactionHeader>
          <h3>Transaction History</h3>
          <img
            src={RequestTransactionLogo}
            alt="Request Transaction"
            onClick={() => history.push('/transaction-request')}
          />
        </S.TransactionHeader>
        <S.TransactionContent>
          <S.ButtonContainer>
            {Object.keys(TRANSACTION_TYPE).map((transaction, i) => (
              <Button
                key={i}
                onClick={() =>
                  filteredTransactionDetails(TRANSACTION_TYPE[transaction])
                }
                color="secondary"
                size="medium"
                variant={
                  transactionType === TRANSACTION_TYPE[transaction]
                    ? 'contained'
                    : 'outlined'
                }
              >
                {TRANSACTION_TYPE[transaction]}
              </Button>
            ))}
          </S.ButtonContainer>
          <S.TransactionTitle>
            {renderTransactionTypeTitle()}
            <p>Recent transaction will reflect within 24 hours.</p>
          </S.TransactionTitle>
          <ComponentLoading>
            {!noRecords && !noFiltered && transactionHistory.length > 0 && (
              <S.TransactionList>
                {transactionHistory.map((d: any, i) => {
                  const isPositiveAmount =
                    d.transaction_category.transaction_type === 'POSITIVE';
                  const isNegativeAmount =
                    d.transaction_category.transaction_type === 'NEGATIVE';

                  let classColor = 'text-yellow';
                  if (d.status !== 'PENDING') {
                    classColor = isPositiveAmount
                      ? 'text-green'
                      : isNegativeAmount
                      ? 'text-red'
                      : 'text-yellow';
                  }
                  // check date
                  let date = DateTime.fromSQL(d.created_at);
                  if (date.invalid) {
                    date = DateTime.fromISO(d.created_at);
                  }
                  const monthDateYear = date.toFormat('LLLL dd, yyyy');
                  const time = date.toLocaleString(DateTime.TIME_SIMPLE);

                  return (
                    <S.TransactionListItem
                      key={d.transaction_id + i}
                      isLast={i + 1 === transactionHistory.length}
                    >
                      <S.ListContainer>
                        <S.ListTitle>
                          {d.transaction_category.title}{' '}
                          <span
                            className={
                              d.status === 'SUCCESS' || d.status === 'APPROVED'
                                ? 'text-green'
                                : d.status === 'PENDING'
                                ? 'text-yellow'
                                : 'text-red'
                            }
                          >
                            ({toTitleCase(d.status)})
                          </span>
                        </S.ListTitle>
                        <S.ListDescription>{monthDateYear}</S.ListDescription>
                        <S.ListDescription>{time}</S.ListDescription>
                      </S.ListContainer>
                      <S.ListContainer textAlign="right">
                        <S.ListTitle className={classColor}>
                          PHP {isPositiveAmount ? '+' : '-'}
                          {numberWithCommas(d.total_amount)}
                        </S.ListTitle>
                        <Button
                          onClick={() =>
                            handleViewTransactionDetails(d.transaction_id)
                          }
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
                  {!isLoading && currentPage < pageDetails.last_page && (
                    <Button
                      onClick={() => onLoadMore(currentPage + 1)}
                      color="secondary"
                      size="medium"
                      variant="outlined"
                    >
                      See more transactions
                    </Button>
                  )}
                </S.TransactionListItem>
              </S.TransactionList>
            )}
            {noRecords && (
              <S.EmptyWrapper>
                <img src={NoTransactionsLogo} alt="No transactions..." />
                <h6>No Transactions</h6>
                <p>You haven't made any transactions yet</p>
              </S.EmptyWrapper>
            )}
            {noFiltered && (
              <S.EmptyWrapper>
                <img src={NoTransactionsLogo} alt="No transactions..." />
                <h6>No Transactions</h6>
              </S.EmptyWrapper>
            )}
          </ComponentLoading>
          {isLoading && <Loading position="relative" />}
        </S.TransactionContent>
      </S.Wrapper>
    </ProtectedContent>
  );
}
