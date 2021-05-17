import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
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

      yield put(actions.getFetchSuccess(decryptData));
      if (decryptData && decryptData.tier) {
        appActions.getSaveTier(decryptData.tier);
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
      yield put(actions.getFetchError(newError));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
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
  yield takeLatest(actions.getFetchLoading.type, getDashboard);
}
