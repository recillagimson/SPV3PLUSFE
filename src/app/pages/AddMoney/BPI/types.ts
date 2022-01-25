export type FundTopUpTypes = {
  response?: {
    jti: string;
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    status: string;
    code: string;
    description: string;
    body: {
      mobileNumber: string;
      mobileNumberToken: string;
    };
  };
  transactionId?: string;
  refId?: string;
  otpResponse?: {
    jti: string;
    iss: string;
    sub: string;
    aud: string;
    exp: number;
    iat: number;
    status: string;
    code: string;
    description: string;
  };
};
