import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectClientToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { selectRequest, selectResendCodeRequest } from './selectors';
import { setCookie } from 'app/components/Helpers';

/**
 * Login
 */
function* getLogin() {
  const token = yield select(selectClientToken); // access_token
  const payload = yield select(selectRequest); // payload body from main component
  const requestURL = `${process.env.REACT_APP_API_URL}/auth/login`; // url

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
      // function returns the parsed string
      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      // set appropriate cookies
      // a 0 in parameter will set the cookie 1 hour from the current time
      setCookie('spv_expire', 'expiration', 0);
      setCookie('spv_uat', apirequest.data.payload, 0);
      setCookie('spv_uat_hmc', decryptPhrase.passPhrase, 0);
      // encrypt email/mobile used for logging and store in cookie for session persist
      const encryptUsername = yield spdCrypto.encrypt(
        JSON.stringify(payload.email ? payload.email : payload.mobile),
        decryptPhrase.passPhrase,
      );
      setCookie('spv_uat_u', encryptUsername);

      // write data in store state
      yield put(
        appActions.getSaveLoginName(
          payload.email ? payload.email : payload.mobile,
        ),
      );
      yield put(appActions.getUserToken(decryptData.user_token)); // write the new access token
      yield put(appActions.getIsAuthenticated(true)); // set the store state to true as user is authenticated
      yield put(appActions.getClientTokenLoading()); // let's get a new client token so expiration will be closely same as user token
      yield put(appActions.getLoadUserProfile()); // write the profile, NOTE: might be changed based on result

      // TODO: wait for UI to display, if password has expired and user need to update it
      //       for now, we will just send as true to redirect to dashboard page
      yield put(actions.getFetchSuccess(true));
      return;
    }
  } catch (err) {
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(newError));
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Resend Activation Code
 * @returns
 */
function* getResendActivationCode() {
  const token = yield select(selectClientToken); // access_token
  const payload = yield select(selectResendCodeRequest); // payload body from main component
  const requestURL = `${process.env.REACT_APP_API_URL}/auth/resend/otp`; // url NOTE: change to resending activation code

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
      yield put(actions.getResendCodeSuccess(true));
    }
  } catch (err) {
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getResendCodeError(newError));
    } else {
      yield put(actions.getResendCodeError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getLogin);
  yield takeLatest(actions.getResendCodeLoading.type, getResendActivationCode);
}
