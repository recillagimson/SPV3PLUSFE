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

export interface ApiErrorState {
  response?: {
    status?: string | number;
    statusText?: string;
  };
  error?: boolean;
  message?: string;
}

/**
 * ClientTokenState
 * Result from the API
 */
export interface ClientTokenState {
  access_token?: string;
  created_at?: string;
  expires_in?: number;
  message?: string;
  errors?: {
    client: string[];
  };
}

export interface PassphraseState {
  id: string;
  passPhrase: string;
}
