import { parseToNumber, numberWithCommas } from 'utils/common';

export const bankListData = transactionHistoryDetailsData => {
  const fullName = `${
    transactionHistoryDetailsData?.transactable?.receiver_details?.first_name
  } ${
    transactionHistoryDetailsData?.transactable?.receiver_details?.last_name ||
    ''
  } ${
    transactionHistoryDetailsData?.transactable?.receiver_details
      ?.middle_name || ''
  }`;
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
      value: fullName,
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
  const fullName = `${
    transactionHistoryDetailsData?.transactable?.receiver_details?.first_name
  } ${
    transactionHistoryDetailsData?.transactable?.receiver_details?.last_name ||
    ''
  } ${
    transactionHistoryDetailsData?.transactable?.receiver_details
      ?.middle_name || ''
  }`;
  return [
    {
      label: 'Name',
      value: fullName,
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

export const loadListtData = transactionHistoryDetailsData => {
  return [
    {
      label: 'Mobile Number',
      value:
        transactionHistoryDetailsData?.transactable?.recipient_mobile_number,
    },
    {
      label: 'Transaction Number',
      value: transactionHistoryDetailsData?.transactable?.reference_number,
    },
    {
      label: 'Message',
      value: transactionHistoryDetailsData?.transactable?.message || 'None',
    },
  ];
};
