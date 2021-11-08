import * as React from 'react';

import { maskMobileNumber } from 'app/components/Helpers';

import * as S from '../TransactionHistory.style';

type AddMoneyDragonpayProps = {
  details: any;
};

export default function AddMoneyDragonpay({ details }: AddMoneyDragonpayProps) {
  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Name</p>
        <p>
          {details?.transactable?.user_details
            ? `${details?.transactable?.user_details?.first_name} ${
                details?.transactable?.user_details?.middle_name || ''
              } ${details?.transactable?.user_details?.last_name || ''}`
            : 'None'}
        </p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Mobile Number</p>
        <p>
          {details?.transactable?.user_details &&
          details?.transactable?.user_details?.mobile_number
            ? maskMobileNumber(
                details?.transactable?.user_details?.mobile_number,
              )
            : 'None'}
        </p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
