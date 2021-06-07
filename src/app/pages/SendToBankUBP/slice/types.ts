import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface SendToBankUBPState {
  loading: boolean;
  error?: object;
  data: boolean;
  request: object | boolean;
  generateOTP: object;
  successSendTobank: {
    [key: string]: any;
  };
  validate?: {
    [key: string]: any;
  };
  formData?: {
    [key: string]: any;
  };
}

export type ContainerState = SendToBankUBPState;
