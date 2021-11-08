import * as React from 'react';

import * as S from '../TransactionHistory.style';

type AddMoneyUBPProps = {
  details: any;
};

export default function AddMoneyUBP({ details }: AddMoneyUBPProps) {
  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Reference Number</p>
        <p>{details?.reference_number || 'No Data'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
