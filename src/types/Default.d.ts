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
  error?: any;
  message?: string;
}

/**
 * TokenState
 * Result from the API
 */
export interface TokenState {
  access_token?: string;
  created_at?: string;
  expires_in?: number;
  message?: string;
  errors?: {
    client: string[];
  };
}

/**
 * Passphrase State
 */
export interface PassphraseState {
  id: string;
  passPhrase: string;
}

/**
 * User Profile
 */
export interface UserProfileState {
  id?: string;
  entity_id?: string | null;
  user_account_id?: string;
  title?: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  name_extension: string | null;
  birth_date: string;
  place_of_birth: string;
  marital_status_id: string;
  nationality_id: string;
  encoded_nationality: string;
  occupation: string;
  house_no_street: string;
  city: string;
  provice_state: string;
  municipality: string;
  country_id: string;
  postal_code: string;
  nature_of_work_id: string;
  encoded_nature_of_work: string;
  source_of_fund_id: string;
  encoded_source_of_fund: string;
  mother_maidenname: string;
  currency_id: string;
  signup_host_id: string;
  verification_status?: null;
  user_account_status?: null;
  emergency_lock_status?: null;
  report_exception_status?: null;
  user_created: string;
  user_updated: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  user_account: any;
}
