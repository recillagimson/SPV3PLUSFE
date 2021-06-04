import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface TermsAndConditions {
  loading: boolean;
  error?: object;
  termsAndConditionsData: any;
}

export type ContainerState = TermsAndConditions;
