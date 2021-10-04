export const accountsResponseMock = {
  body: {
    transactionalAccounts: [
      {
        accountNumber: 'XXXXXX3144',
        accountPreferredName: 'SAVINGS ACCOUNT',
        accountType: 'SAVINGS ACCOUNT',
      },
      {
        accountNumber: 'XXXXXX1206',
        accountPreferredName: 'SAVINGS ACCOUNT',
        accountType: 'SAVINGS ACCOUNT',
      },
    ],
  },
};

export const fundTopUpResponseMock = {
  response: {
    body: {
      mobileNumber: '+63927****863',
      mobileNumberToken: 'ee75b24b4b5c39c3a471f43f28882345',
    },
  },
  transactionId: '765bccc8-9b2d-43bf-98e3-578b88b707c6',
  refId: 'AB0024402',
  otpResponse: {
    body: {
      otpValidUntil: new Date().setMinutes(new Date().getMinutes() + 5),
    },
  },
};
