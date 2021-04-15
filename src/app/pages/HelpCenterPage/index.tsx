import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from 'react-redux';

import Button from 'app/components/Elements/Button';

import * as S from './HelpCenter.style';

const MOCK_DATA = [
  {
    paymentType: 'instapay',
    amount: 'PHP 1,000.00',
    date: 'August 10, 2020',
    time: '03:46 PM',
  },
  {
    paymentType: 'instapay',
    amount: 'PHP 1,000.00',
    date: 'August 10, 2020',
    time: '03:46 PM',
  },
  {
    paymentType: 'instapay',
    amount: 'PHP 1,000.00',
    date: 'August 10, 2020',
    time: '03:46 PM',
  },
];
export function HelpCenterPage() {
  return (
    <>
      <Helmet>
        <title>Help center</title>
      </Helmet>
      <S.Wrapper>
        <S.HelpCenterHeader>
          <h3>Help center</h3>
        </S.HelpCenterHeader>
        <S.HelpCenterContent>
          <S.SearchContainer>
            <h3>How can we help you today</h3>
            <S.SearchBar type="text" placeholder="Search" />
          </S.SearchContainer>
          <S.List>
            <S.ListItem>
              <p>How do I change my pin?</p>
              <FontAwesomeIcon icon="angle-right" />
            </S.ListItem>
          </S.List>
        </S.HelpCenterContent>
      </S.Wrapper>
    </>
  );
}
