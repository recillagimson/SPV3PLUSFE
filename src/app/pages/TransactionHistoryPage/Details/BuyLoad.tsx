import * as React from 'react';

import { maskMobileNumber } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';

type BuyLoadProps = {
  details: any;
};

export default function BuyLoad({ details }: BuyLoadProps) {
  let mobile = 'None';
  if (details.transactable.recipient_mobile_number) {
    mobile = maskMobileNumber(details.transactable.recipient_mobile_number);
  }

  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Mobile Number</p>
        <p>{mobile}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
