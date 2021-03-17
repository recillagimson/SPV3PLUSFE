/* --- STATE --- */
export interface LoginState {
  loading: boolean;
  error?: object | boolean;
  data: object | boolean;
  request: object | boolean;
}

export type ContainerState = LoginState;
