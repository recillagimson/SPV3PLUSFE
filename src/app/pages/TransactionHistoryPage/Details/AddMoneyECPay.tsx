import { selectUser } from 'app/App/slice/selectors';
import * as React from 'react';
import { useSelector } from 'react-redux';

import * as S from '../TransactionHistory.style';

type AddMoneyECPayProps = {
  details: any;
};

export default function AddMoneyECPay({ details }: AddMoneyECPayProps) {
  const profile: any = useSelector(selectUser);

  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Name</p>
        <p>
          {profile
            ? `${profile.first_name} ${profile.middle_name} ${profile.last_name}`
            : ''}
        </p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
