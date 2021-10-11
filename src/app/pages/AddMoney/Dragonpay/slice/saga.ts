import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import spdCrypto from 'app/components/Helpers/EncyptDecrypt';
import { PassphraseState } from 'types/Default';

import { appActions } from 'app/App/slice';
import { selectUserToken } from 'app/App/slice/selectors';
import { containerActions as actions } from './';
import {
  getResponsePassphrase,
  getRequestPassphrase,
} from 'app/App/slice/saga';
// import { errorHandler } from './errorHandle';
import { selectAmount } from './selectors';
import { analytics } from 'utils/firebase';
import { events } from 'utils/firebaseConstants';

function* addMoney() {
  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/cashin`;

  const amount = yield select(selectAmount);

  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify({
        amount,
        provider: 'DragonPay',
      }),
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

      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getFetchSuccess(decryptData));
      analytics.logEvent(events.addMoney, { type: 'dragonpay' });
    }
  } catch (err: any) {
    if (
      err &&
      err.response &&
      (err.response.status === 422 || err.response.status === 500)
    ) {
      const body = yield err.response.json();
      const newError = {
        code: err.response.status,
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

export function* containerSaga() {
  yield takeLatest(actions.getFetchLoading.type, addMoney);
}
