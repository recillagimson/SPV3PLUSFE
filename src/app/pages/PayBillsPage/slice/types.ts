import { ApiErrorState } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface PayBillsState {
  loading: boolean;
  error?: object;
  billers: BillersState[];
  billerCode: string;
  formData: object;
  validatePayBills: object;
}

export interface BillersState {
  active: string;
  category: string;
  code: string;
  description: string;
  logo: string;
  name: string;
  type: string;
}

export interface BillerStateOptions {
  value?: string;
  icon?: string;
  label?: string;
  code?: string;
  isActive?: boolean;
}

export type ContainerState = PayBillsState;
