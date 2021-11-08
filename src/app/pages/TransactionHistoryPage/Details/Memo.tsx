import * as React from 'react';

import * as S from '../TransactionHistory.style';

type DebitCreditMemoProps = {
  details: any;
};

export default function DebitCreditMemo({ details }: DebitCreditMemoProps) {
  return (
    <>
      <S.TransactionDetailsListItem>
        <p>Memo Category</p>
        <p>{details.transactable?.category || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Type of Memo</p>
        <p>
          {details.transactable?.type_of_memo === 'CR' ? 'Credit' : 'Debit'}
        </p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Reference Number</p>
        <p>{details.reference_number || 'None'}</p>
      </S.TransactionDetailsListItem>
      <S.TransactionDetailsListItem>
        <p>Remarks</p>
        <p>{details?.transactable?.remarks || 'None'}</p>
      </S.TransactionDetailsListItem>
    </>
  );
}
