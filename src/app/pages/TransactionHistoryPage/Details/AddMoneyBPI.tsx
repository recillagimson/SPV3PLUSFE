import * as React from 'react';

import { maskCharacters } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';

type AddMoneyBPIProps = {
  details: any;
};

export default function AddMoneyBPI({ details }: AddMoneyBPIProps) {
  let bank = details.transactable.bank_name || 'None';
  if (
    details.transactable &&
    details.transactable.transaction_response &&
    JSON.parse(details.transactable.transaction_response)
  ) {
    let transactionResponse = JSON.parse(
      details.transactable.transaction_response,
    );
    bank = transactionResponse.iss ? transactionResponse.iss : 'BPI';
  }
  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Bank</p>
        <p>{bank}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Account Number</p>
        <p>{maskCharacters(details.transactable?.account_number) || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
