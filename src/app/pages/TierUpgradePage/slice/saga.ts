import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectClientToken, selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { appActions } from 'app/App/slice';
import { selectValidateRequest } from './selectors';

/**
 * Get ID Types
 */
function* getPrimaryID() {
  const token = yield select(selectClientToken);

  const primaryRequestURL = `${process.env.REACT_APP_API_URL}/id/types?is_primary=1`;
  const secondaryRequestURL = `${process.env.REACT_APP_API_URL}/id/types?is_primary=0`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.access_token}`,
    },
  };

  try {
    const primaryRequest = yield call(request, primaryRequestURL, options);
    const secondaryRequest = yield call(request, secondaryRequestURL, options);

    let primaryData = [];
    let secondaryData = [];
    if (primaryRequest && primaryRequest.data && primaryRequest.data.id) {
      // request decryption passphrase
      let primaryRespPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        primaryRequest.data.id,
      );

      // decrypt payload data
      let primaryDataDecrypt = spdCrypto.decrypt(
        primaryRequest.data.payload,
        primaryRespPhrase.passPhrase,
      );
      primaryData = primaryDataDecrypt;
    }

    if (secondaryRequest && secondaryRequest.data && secondaryRequest.data.id) {
      // request decryption passphrase
      let secondaryRespPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        secondaryRequest.data.id,
      );

      // decrypt payload data
      let secondaryDataDecrypt = spdCrypto.decrypt(
        secondaryRequest.data.payload,
        secondaryRespPhrase.passPhrase,
      );
      secondaryData = secondaryDataDecrypt;
    }

    if (primaryData.length > 0 && secondaryData.length > 0) {
      yield put(
        actions.getFetchSuccess({
          primary: primaryData,
          secondary: secondaryData,
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
      yield put(actions.getFetchError(JSON.stringify(newError)));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getFetchReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getFetchReset());
    } else {
      yield put(actions.getFetchError(JSON.stringify(err)));
    }
  }
}

/**
 * Validate if User has already a pending request
 */
function* getValidateUpgradeTier() {
  const token = yield select(selectUserToken);
  const payload = yield select(selectValidateRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/profile/tosilver/check/pending`;

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

    if (apirequest && apirequest.data) {
      // request decryption passphrase
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      if (decryptData) {
        yield put(actions.getValidateSuccess(true));
      }
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getValidateError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getValidateReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getValidateReset());
    } else {
      yield put(actions.getValidateError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getPrimaryID);
  yield takeLatest(actions.getValidateLoading.type, getValidateUpgradeTier);
}
