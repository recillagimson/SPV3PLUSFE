import * as React from 'react';

import { maskCharacters } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';
import { numberWithCommas } from 'utils/common';

type PaybillsProps = {
  details: any;
};

export default function Paybills({ details }: PaybillsProps) {
  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Account Name</p>
        <p>{details.transactable?.billers_name || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Account Number</p>
        <p>{maskCharacters(details.transactable?.account_number)}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Reference Number</p>
        <p>{details.transactable?.biller_reference_number}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Amount</p>
        <p>PHP {numberWithCommas(details.transactable?.total_amount)}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable?.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
