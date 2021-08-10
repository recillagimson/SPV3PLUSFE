import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectUserToken } from 'app/App/slice/selectors';
import { getResponsePassphrase } from 'app/App/slice/saga';
import { selectPage, selectTransactionHistoryId } from './selectors';

import { containerActions as actions } from '.';

/**
 * Transaction History data
 */
function* getTransactionHistory() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const page = yield select(selectPage);

  const requestURL = `${process.env.REACT_APP_API_URL}/user/transaction/histories?page=${page}`;

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

      yield put(actions.getFetchSuccess(decryptData));
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

function* getTransactionHistoryDetails() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const transactionHistoryId = yield select(selectTransactionHistoryId); // payload body from main component

  const requestURL = `${process.env.REACT_APP_API_URL}/user/transaction/histories/${transactionHistoryId}`;

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

      yield put(actions.getTransactionHistoryDetailsSuccess(decryptData));
    } else {
      yield put(
        actions.getTransactionHistoryDetailsError({
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
      yield put(actions.getTransactionHistoryDetailsError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getTransactionHistoryDetailsReset());
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getTransactionHistoryDetailsReset());
    } else {
      yield put(actions.getTransactionHistoryDetailsError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getTransactionHistory);
  yield takeLatest(
    actions.getTransactionHistoryDetailsLoading.type,
    getTransactionHistoryDetails,
  );
}
