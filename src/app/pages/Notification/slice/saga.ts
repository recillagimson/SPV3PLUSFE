import { call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';
import spdCrypto from 'app/components/Helpers/EncyptDecrypt';
import { PassphraseState } from 'types/Default';
import { appActions } from 'app/App/slice';
import { selectUserToken } from 'app/App/slice/selectors';
import { containerActions as actions } from '.';
import { getResponsePassphrase } from 'app/App/slice/saga';

function* getNotifications() {
  const token = yield select(selectUserToken);
  const requestURL = `${process.env.REACT_APP_API_URL}/notifications`;

  const options = {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'text/plain',
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

      let decryptData = spdCrypto.decrypt(
        apirequest.data.payload,
        decryptPhrase.passPhrase,
      );

      yield put(actions.getFetchSuccess([...decryptData]));
      return;
    }
  } catch (err) {
    if (err && err.response && err.response.status > 299) {
      const body = yield err.response.json();

      const newError = {
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
  yield takeLatest(actions.getFetchLoading.type, getNotifications);
}
