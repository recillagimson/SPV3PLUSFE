import * as React from 'react';

import * as S from '../TransactionHistory.style';

type AddMoneyECPayProps = {
  details: any;
};

export default function AddMoneyECPay({ details }: AddMoneyECPayProps) {
  return (
    <>
      {/* <S.TransactionDetailsListItem>
        <p>ECPay Reference Number</p>
        <p>{details?.transactable.ec_pay_reference_number || 'None'}</p>
      </S.TransactionDetailsListItem> */}
      <S.TransactionDetailsListItem>
        <p>Transaction Number</p>
        <p>{details?.transactable.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
