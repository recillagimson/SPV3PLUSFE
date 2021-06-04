import { call, put, takeLatest } from 'redux-saga/effects';
import { containerActions as actions } from '.';

function* getTermsAndConditions() {
  const requestURL = 'https://squidpay.ph/tac';

  const options = {
    method: 'GET',
    headers: {
      Accept: 'text/html',
      'Content-Type': 'text/html; charset=UTF-8',
    },
  };

  try {
    const apirequest = yield call(fetch, requestURL, options);
    const textResponse = yield apirequest.text();
    yield put(actions.getFetchSuccess(textResponse));
    return;
  } catch (err) {
    yield put(actions.getFetchError(err.message));
  }
}

export function* containerSaga() {
  yield takeLatest(actions.getFetchLoading.type, getTermsAndConditions);
}
