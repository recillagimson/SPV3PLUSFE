import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useContainerSaga } from './slice';
import isEmpty from 'lodash/isEmpty';

// components
import Input from 'app/components/Elements/Input';
import Loading from 'app/components/Loading';
import Box from 'app/components/Box';
import ProtectedContent from 'app/components/Layouts/ProtectedContent';
import {
  selectLoading,
  // selectError,
  selectForeignExchangeData,
} from './slice/selectors';

// styles
import * as Styled from './ForeignExchangePage.style';
import { numberCommas } from 'app/components/Helpers';

export function ForeignExchangePage() {
  const dispatch = useDispatch();
  const { actions } = useContainerSaga();
  const [searchValue, setSearchValue] = React.useState<{
    value: string;
  }>({
    value: '',
  });
  const foreignExchangeData: any = useSelector(selectForeignExchangeData);

  const loading = useSelector(selectLoading);

  React.useEffect(() => {
    dispatch(actions.getForeignExchangeLoading());
  }, [actions, dispatch]);

  const { value } = searchValue;

  return (
    <ProtectedContent>
      <Helmet>
        <title>Foreign exchange</title>
      </Helmet>
      {loading ? (
        <Loading position="fixed" />
      ) : (
        <Box title="Foreign Exchange" titleBorder withPadding>
          <section
            style={{
              display: 'flex',
              flexFlow: 'row',
              justifyContent: 'flex-end',
              margin: '8px 0 15px',
            }}
          >
            <Input
              style={{
                width: '100%',
                maxWidth: '320px',
              }}
              value={value}
              onChange={e => setSearchValue({ value: e.currentTarget.value })}
              placeholder="Search"
            />
          </section>

          <Styled.RatesContainer>
            {!isEmpty(foreignExchangeData) &&
              foreignExchangeData
                .filter(currency => {
                  return (
                    currency.name.toLowerCase().includes(value.toLowerCase()) ||
                    currency.code.toLowerCase().includes(value.toLowerCase())
                  );
                })
                .map(currency => (
                  <Styled.Rate key={currency?.code}>
                    <Styled.CurrencyContainer>
                      <Styled.Currency>{currency?.code}</Styled.Currency>
                      <Styled.CurrentFull>{currency?.name}</Styled.CurrentFull>
                    </Styled.CurrencyContainer>
                    <Styled.Spacer />
                    <Styled.Rates>
                      {numberCommas(currency?.rate, 4)}
                    </Styled.Rates>
                  </Styled.Rate>
                ))}
          </Styled.RatesContainer>
        </Box>
      )}
    </ProtectedContent>
  );
}
