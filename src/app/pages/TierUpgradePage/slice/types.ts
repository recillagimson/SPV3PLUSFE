import { ApiErrorState, IDTypes } from 'types/Default';

/* --- STATE --- */
export type ErrorState = ApiErrorState;

export interface TierUpgradeState {
  loading: boolean;
  error?: string;
  data: { primary?: IDTypes[]; secondary?: IDTypes[] };
  request: object | boolean;
  validate: {
    loading: boolean;
    error?: string;
    data: boolean;
    request: object | boolean;
  };
}

export type ContainerState = TierUpgradeState;
