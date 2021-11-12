import * as React from 'react';

import { maskEmailAddress, maskMobileNumber } from 'app/components/Helpers';

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
  let isEmail = false;
  if (details.transactable.sender) {
    isEmail = !details.transactable.sender.mobile_number;
    mobile = details.transactable.sender.mobile_number
      ? maskMobileNumber(details.transactable.sender.mobile_number)
      : maskEmailAddress(details.transactable.sender.email);
  }

  if (details.transactable.receiver) {
    isEmail = !details.transactable.receiver.mobile_number;
    mobile = details.transactable.receiver.mobile_number
      ? maskMobileNumber(details.transactable.receiver.mobile_number)
      : maskEmailAddress(details.transactable.receiver.email);
  }

  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Name</p>
        <p>{name}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>{isEmail ? 'Email Address' : 'Mobile Number'}</p>
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
