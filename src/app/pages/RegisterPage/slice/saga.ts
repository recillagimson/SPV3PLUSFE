import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import { selectToken } from 'app/App/slice/selectors';

import { containerActions as actions } from '.';
import { selectRequest } from './selectors';

/**
 * Register
 */
function* getRegister() {
  const token = yield select(selectToken);
  const payload = yield select(selectRequest);

  const requestURL = `${process.env.REACT_APP_API_URL}/connect/token`;

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  };

  try {
    const apirequest = yield call(request, requestURL, options);
    if (apirequest) {
      yield put(actions.getFetchSuccess({ data: 'sample data' }));
    } else {
      yield put(
        actions.getFetchError({
          error: true,
          message: 'An error has occured.',
        }),
      );
    }
  } catch (err) {
    yield put(actions.getFetchError(err));
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
  yield takeLatest(actions.getFetchLoading.type, getRegister);
}
