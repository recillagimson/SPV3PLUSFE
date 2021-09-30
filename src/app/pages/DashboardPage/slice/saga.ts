import { delay, call, put, select, takeLatest, fork } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectUserToken } from 'app/App/slice/selectors';
import { getResponsePassphrase } from 'app/App/slice/saga';

import { containerActions as actions } from '.';
import { appActions } from 'app/App/slice';

/**
 * Get Dashboard Data
 */
function* getDashboard() {
  yield delay(500);
  const token = yield select(selectUserToken);

  const requestURL = `${process.env.REACT_APP_API_URL}/dashboard`;

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
      yield fork(getTransactionHistory);

      if (decryptData && decryptData.tier) {
        yield put(actions.getFetchSuccess(decryptData));
        yield put(appActions.getSaveTier(decryptData.tier));
      }
    }
  } catch (err: any) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getFetchError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getFetchReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getFetchReset());
    } else {
      yield put(actions.getFetchError(err));
    }
  }
}

/**
 * Get Transaction History
 */
function* getTransactionHistory() {
  yield delay(500);
  const token = yield select(selectUserToken);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/transaction/histories`;

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

      if (decryptData && decryptData.data && decryptData.data.length > 0) {
        const recentTransaction =
          decryptData.data.length > 2
            ? decryptData.data.slice(0, 2)
            : decryptData.data;

        yield put(actions.getTransactionSuccess(recentTransaction));
      }
    }
  } catch (err: any) {
    // special case, check the 422 for invalid data (account already exists)
    if (err && err.response && err.response.status === 422) {
      const body = yield err.response.json();
      const newError = {
        code: 422,
        ...body,
      };
      yield put(actions.getTransactionError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getTransactionReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getTransactionReset());
    } else {
      yield put(actions.getTransactionError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getDashboard);
  yield takeLatest(actions.getTransactionLoading.type, getTransactionHistory);
}
