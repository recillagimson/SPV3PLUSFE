/* --- STATE --- */
export interface UpdatePasswordState {
  loading: boolean;
  error?: object | boolean;
  data: object | boolean;
  request: object | boolean;
}

export type ComponentState = UpdatePasswordState;
