import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { selectRequest, selectOTPRequest } from './selectors';
import { appActions } from 'app/App/slice';
import { deleteCookie } from 'app/components/Helpers';

/**
 * Update Profile
 */
function* getUpdateProfile() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/profile/tobronze`;

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
      let decryptPhrase: PassphraseState = yield call(
        getResponsePassphrase,
        apirequest.data.id,
      );

      // decrypt payload data
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      deleteCookie('spv_uat_f'); // delete the force update cookie
      yield put(actions.getFetchSuccess(decryptData));
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getFetchReset());
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Generate OTP
 */
function* getGenerateOTP() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const payload = yield select(selectOTPRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/auth/generate/otp`;

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
      // no need to decrypt data
      yield put(actions.getSendOTPSuccess(true));
    }
  } catch (err) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getSendOTPError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getSendOTPReset());
    } else {
      yield put(actions.getSendOTPError(err));
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* componentSaga() {
  // Watches for  actions and calls the function associated with it when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getFetchLoading.type, getUpdateProfile);
  yield takeLatest(actions.getSendOTPLoading.type, getGenerateOTP);
}
