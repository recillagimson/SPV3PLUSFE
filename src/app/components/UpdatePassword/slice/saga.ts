import { call, put, select, takeLatest, delay } from 'redux-saga/effects';
import { request } from 'utils/request';

import { selectRequest } from './selectors';
import { appActions as actions } from '.';

/**
 * Global function for user data or other data
 */
function* getUpdatePassword() {
  yield delay(500);
  // select the request data
  const body: object = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/posts`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer <insertTokenHere>`,
    },
    body: JSON.stringify(body),
  };

  try {
    // Call our request helper (see 'utils/request')
    const apirequest = yield call(request, requestURL, options);

    if (apirequest) {
      yield put(actions.getFetchSuccess(apirequest));
    } else {
      yield put(actions.getFetchError(apirequest));
    }
  } catch (err) {
    yield put(actions.getFetchError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export function* appSaga() {
  // Watches for loadRepos actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actions.getFetchLoading.type, getUpdatePassword);
}
