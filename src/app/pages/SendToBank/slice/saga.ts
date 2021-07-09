import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';
import { selectBankTransactionType, selectFormData } from './selectors';

import { containerActions as actions } from '.';

/**
 * Get Purpose
 */
function* getPurposes() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/send2bank/ubp-instapay/purposes`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getPurposesSuccess(decryptData));
    } else {
      yield put(
        actions.getPurposesError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getPurposesError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getPurposesReset());
    } else {
      yield put(actions.getPurposesError(err));
    }
  }
}

/**
 * Get Banks data
 */
function* getBanks() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const bankTransactionType = yield select(selectBankTransactionType);
  const requestURL = `${process.env.REACT_APP_API_URL}/send2bank/ubp-${bankTransactionType}/banks`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getBanksSuccess(decryptData));
    } else {
      yield put(
        actions.getBanksError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getBanksError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getBanksReset());
    } else {
      yield put(actions.getBanksError(err));
    }
  }
}

// Validate Transaction for selected Bank
function* validateSendToBank() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const bankTransactionType = yield select(selectBankTransactionType);
  const formData = yield select(selectFormData);
  const requestURL = `${process.env.REACT_APP_API_URL}/send2bank/ubp-${bankTransactionType}/validate`;

  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(formData),
      requestPhrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({ id: requestPhrase.id, payload: encryptPayload }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.validateBankSuccess(decryptData));
    } else {
      yield put(
        actions.validateBankError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.validateBankError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
    } else {
      yield put(actions.validateBankError(err));
    }
  }
}

// Generate Send to bank OTP
function* generateSendToBankOTP() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/auth/generate/otp`;
  const payload = {
    otp_type: 'send2bank',
  };

  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(payload),
      requestPhrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({ id: requestPhrase.id, payload: encryptPayload }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );
      yield put(actions.generateSendToBankOTPSuccess(decryptData));
    } else {
      yield put(
        actions.generateSendToBankOTPError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.generateSendToBankOTPError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
    } else {
      yield put(actions.generateSendToBankOTPError(err));
    }
  }
}

// Validate Transaction for selected Bank
function* sendToBank() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const bankTransactionType = yield select(selectBankTransactionType);
  const formData = yield select(selectFormData);
  const requestURL = `${process.env.REACT_APP_API_URL}/send2bank/ubp-${bankTransactionType}`;

  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(formData),
      requestPhrase.passPhrase,
    );
  }

  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
    body: JSON.stringify({ id: requestPhrase.id, payload: encryptPayload }),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );
      yield put(actions.sendToBankSuccess(decryptData));
    } else {
      yield put(
        actions.sendToBankError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.sendToBankError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
    } else {
      yield put(actions.sendToBankError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* containerSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getPurposesLoading.type, getPurposes);
  yield takeLatest(actions.getBanksLoading.type, getBanks);
  yield takeLatest(actions.validateBankLoading.type, validateSendToBank);
  yield takeLatest(actions.sendToBankLoading.type, sendToBank);
  yield takeLatest(
    actions.generateSendToBankOTPLoading.type,
    generateSendToBankOTP,
  );
}
