import * as React from 'react';

import { maskMobileNumber } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';

type SendMoneySquidpayAccountProps = {
  details: any;
};

export default function SendMoneySquidpayAccount({
  details,
}: SendMoneySquidpayAccountProps) {
  let name = 'None';
  if (details?.transactable?.receiver_details) {
    name = `${details?.transactable?.receiver_details?.first_name} ${
      details?.transactable?.receiver_details?.middle_name || ''
    } ${details?.transactable?.receiver_details?.last_name || ''}`;
  }
  if (details?.transactable?.sender_details) {
    name = `${details?.transactable?.sender_details?.first_name} ${
      details?.transactable?.sender_details?.middle_name || ''
    } ${details?.transactable?.sender_details?.last_name || ''}`;
  }

  let mobile = 'None';
  if (details.transactable.sender) {
    mobile =
      maskMobileNumber(details.transactable.sender.mobile_number) || 'None';
  }

  if (details.transactable.receiver) {
    mobile =
      maskMobileNumber(details.transactable.receiver.mobile_number || '') ||
      'None';
  }

  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Name</p>
        <p>{name}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Mobile Number</p>
        <p>{mobile}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Message</p>
        <p>{details.transactable?.message || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
