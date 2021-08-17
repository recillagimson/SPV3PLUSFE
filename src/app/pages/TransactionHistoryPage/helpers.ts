import { parseToNumber, numberWithCommas } from 'utils/common';

export const bankListData = transactionHistoryDetailsData => {
  let fullName = transactionHistoryDetailsData?.transactable?.account_name;
  if (transactionHistoryDetailsData?.transactable?.receiver_details) {
    fullName = `${
      transactionHistoryDetailsData?.transactable?.receiver_details?.first_name
    } ${
      transactionHistoryDetailsData?.transactable?.receiver_details
        ?.last_name || ''
    } ${
      transactionHistoryDetailsData?.transactable?.receiver_details
        ?.middle_name || ''
    }`;
  }
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
  let fullName = '';
  if (transactionHistoryDetailsData?.transactable?.receiver_details) {
    fullName = `${
      transactionHistoryDetailsData?.transactable?.receiver_details?.first_name
    } ${
      transactionHistoryDetailsData?.transactable?.receiver_details
        ?.last_name || ''
    } ${
      transactionHistoryDetailsData?.transactable?.receiver_details
        ?.middle_name || ''
    }`;
  } else {
    fullName = `${
      transactionHistoryDetailsData?.transactable?.sender_details?.first_name
    } ${
      transactionHistoryDetailsData?.transactable?.sender_details?.last_name ||
      ''
    } ${
      transactionHistoryDetailsData?.transactable?.sender_details
        ?.middle_name || ''
    }`;
  }
  return [
    {
      label: 'Name',
      value: fullName,
    },
    {
      label: 'Mobile Number',
      value: transactionHistoryDetailsData?.transactable?.sender
        ? transactionHistoryDetailsData?.transactable?.sender.mobile_number
        : transactionHistoryDetailsData?.transactable?.receiver
        ? transactionHistoryDetailsData?.transactable?.receiver.mobile_number
        : 'None',
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
  let name = 'None';
  if (
    transactionHistoryDetailsData.transactable &&
    transactionHistoryDetailsData.transactable.user_details &&
    transactionHistoryDetailsData.transactable.user_details.first_name &&
    transactionHistoryDetailsData.transactable.user_details.last_name
  ) {
    name = `${transactionHistoryDetailsData.transactable.user_details.first_name} ${transactionHistoryDetailsData.transactable.user_details.last_name}`;
  }
  return [
    {
      label: 'Name',
      value: name,
    },
    {
      label: 'Mobile Number',
      value:
        transactionHistoryDetailsData.transactable &&
        transactionHistoryDetailsData?.transactable.user_details &&
        transactionHistoryDetailsData?.transactable.user_details.mobile_number
          ? transactionHistoryDetailsData?.user_details.mobile_number
          : 'None',
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

export const paybillsData = transactionHistoryDetailsData => {
  return [
    {
      label: 'Billers Name',
      value: transactionHistoryDetailsData?.transactable?.billers_name,
    },
    {
      label: 'Account Number',
      value: transactionHistoryDetailsData?.transactable?.account_number,
    },
    {
      label: 'Biller Reference Number',
      value:
        transactionHistoryDetailsData?.transactable?.biller_reference_number,
    },
    {
      label: 'Message',
      value: transactionHistoryDetailsData?.transactable?.message || 'None',
    },
    {
      label: 'Amount',
      value: `PHP ${numberWithCommas(
        transactionHistoryDetailsData?.transactable?.total_amount,
      )}`,
    },
    {
      label: 'Transaction Number',
      value: transactionHistoryDetailsData?.transactable?.reference_number,
    },
  ];
};
