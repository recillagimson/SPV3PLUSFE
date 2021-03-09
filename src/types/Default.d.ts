/**
 * Indicate here the Default State types/interface to be used in the application globally
 *
 */

export interface StoreState {
  loading: boolean;
  error?: object | boolean;
  data: object | boolean;
  request: object | boolean;
}
