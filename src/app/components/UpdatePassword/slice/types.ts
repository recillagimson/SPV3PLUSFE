/* --- STATE --- */
export interface UpdatePasswordState {
  loading: boolean;
  error?: object | boolean;
  data: boolean;
  request: object | boolean;
}

export type ComponentState = UpdatePasswordState;
