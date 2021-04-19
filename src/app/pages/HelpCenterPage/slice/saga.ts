import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import CryptoJS from 'crypto-js';
import encDec from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectToken } from 'app/App/slice/selectors';
import { getResponsePassphrase } from 'app/App/slice/saga';

import { containerActions as actions } from '.';

/**
 * Help center data
 */
function* getHelpCenter() {
  yield delay(500);
  const token = yield select(selectToken);

  const requestURL = `${process.env.REACT_APP_API_URL}/api/help_center`;

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
        apirequest.id,
      );

      // decrypt payload data
      let decryptData = CryptoJS.AES.decrypt(
        apirequest.payload,
        decryptPhrase.passPhrase,
        { format: encDec },
      ).toString(CryptoJS.enc.Utf8);

      yield put(actions.getFetchSuccess(JSON.parse(decryptData)));
    } else {
      yield put(
        actions.getFetchError({
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
      yield put(actions.getFetchError(newError));
    } else {
      yield put(actions.getFetchError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getHelpCenter);
}
