import * as React from 'react';

import { maskCharacters } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';

type SendToBankProps = {
  details: any;
};

export default function SendToBank({ details }: SendToBankProps) {
  let name = details.transactable.account_name || 'None';
  // if (details?.transactable?.receiver_details) {
  //   name = `${details?.transactable?.receiver_details?.first_name} ${
  //     details?.transactable?.receiver_details?.middle_name || ''
  //   } ${details?.transactable?.receiver_details?.last_name || ''}`;
  // }

  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Bank</p>
        <p>{details.transactable?.bank_name || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Account Number</p>
        <p>{maskCharacters(details.transactable?.account_number)}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Account Name</p>
        <p>{name}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Send Receipt To</p>
        <p>{details.transactable?.send_receipt_to || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Purpose of Transaction</p>
        <p>{details.transactable?.purpose || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
