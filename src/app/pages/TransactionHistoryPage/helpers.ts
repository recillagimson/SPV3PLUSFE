import { parseToNumber, numberWithCommas } from 'utils/common';

export const bankListData = transactionHistoryDetailsData => {
  return [
    {
      label: 'Bank',
      value: transactionHistoryDetailsData?.transactable?.bank_name,
    },
    {
      label: 'Account Number',
      value: transactionHistoryDetailsData?.transactable?.account_number,
    },
    {
      label: 'Account Name',
      value: transactionHistoryDetailsData?.transactable?.account_name,
    },
    {
      label: 'Amount',
      value: `PHP ${numberWithCommas(
        parseToNumber(transactionHistoryDetailsData?.transactable?.amount),
      )}`,
    },
    {
      label: 'Send Receipt To',
      value: transactionHistoryDetailsData?.transactable?.send_receipt_to,
    },
    {
      label: 'Purpose of transaction',
      value: transactionHistoryDetailsData?.transactable?.purpose,
    },
  ];
};

export const receivedMoneyListData = transactionHistoryDetailsData => {
  return [
    {
      label: 'Name',
      value: transactionHistoryDetailsData?.transaction_category?.name,
    },
    {
      label: 'Mobile Number',
      value: 'None',
    },
    {
      label: 'Message',
      value: transactionHistoryDetailsData?.transactable?.message || 'None',
    },
    {
      label: 'Transaction Number',
      value: transactionHistoryDetailsData?.transactable?.reference_number,
    },
  ];
};

export const dragonpayListData = transactionHistoryDetailsData => {
  return [
    {
      label: 'Name',
      value: transactionHistoryDetailsData?.transaction_category?.name,
    },
    {
      label: 'Mobile Number',
      value: 'None',
    },
    {
      label: 'Transaction Number',
      value: transactionHistoryDetailsData?.transactable?.reference_number,
    },
  ];
};
