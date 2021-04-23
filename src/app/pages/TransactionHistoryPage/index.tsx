import * as React from 'react';
import { Helmet } from 'react-helmet-async';

import Button from 'app/components/Elements/Button';

import * as S from './TransactionHistory.style';

const MOCK_DATA = [
  {
    paymentType: "instapay",
    amount: "PHP 1,000.00",
    date: "August 10, 2020",
    time: "03:46 PM",
  },
  {
    paymentType: "instapay",
    amount: "PHP 1,000.00",
    date: "August 10, 2020",
    time: "03:46 PM",
  },
  {
    paymentType: "instapay",
    amount: "PHP 1,000.00",
    date: "August 10, 2020",
    time: "03:46 PM",
  },
]
export function TransactionHistoryPage() {
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
              onClick={() => {}}
              color="secondary"
              size="medium"
              variant="contained"
            >
              All
            </Button>
            <Button
              onClick={() => {}}
              color="secondary"
              size="medium"
              variant="outlined"
            >
              Received
            </Button>
            <Button
              onClick={() => {}}
              color="secondary"
              size="medium"
              variant="outlined"
            >
              Sent
            </Button>
          </S.ButtonContainer>
          <S.TransactionTitle>Recent</S.TransactionTitle>
          <S.TransactionList>
            {MOCK_DATA.map((d, i) => (
              <S.TransactionListItem>
                <S.ListContainer>
                  <S.ListTitle>Online Transfer</S.ListTitle>
                  <S.ListDescription>Fund Transfer via</S.ListDescription>
                  <S.ListDescription>{d.paymentType}</S.ListDescription>
                </S.ListContainer>
                <S.ListContainer>
                  <S.ListTitle>{d.amount}</S.ListTitle>
                  <S.ListDescription textAlign="right">{d.date}</S.ListDescription>
                  <S.ListDescription textAlign="right">{d.time}</S.ListDescription>
                </S.ListContainer>
              </S.TransactionListItem>
            ))}
          </S.TransactionList>
        </S.TransactionContent>
      </S.Wrapper>
    </>
  );
}
