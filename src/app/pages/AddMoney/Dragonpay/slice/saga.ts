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
import { errorHandler } from './errorHandle';
import { selectAmount } from './selectors';

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

      // console.log({ decryptData });

      yield put(actions.getFetchSuccess(decryptData));
      return;
    }
  } catch (err) {
    if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getFetchReset());
    } else {
      const errMessage = errorHandler(err);
      yield put(actions.getFetchError(errMessage));
    }
  }
}

export function* containerSaga() {
  yield takeLatest(actions.getFetchLoading.type, addMoney);
}
