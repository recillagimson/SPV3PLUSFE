import { delay, call, put, select, takeLatest } from 'redux-saga/effects';
import { request } from 'utils/request';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { PassphraseState } from 'types/Default';
import { selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'app/App/slice/saga';

import {
  selectBillerCode,
  selectFormData,
  selectValidatedBiller,
} from './selectors';

import { containerActions as actions } from '.';
import { appActions } from 'app/App/slice';
import { analytics } from 'utils/firebase';
import { events } from 'utils/firebaseConstants';

/**
 * GET List of Billers
 */
function* getBillers() {
  yield delay(500);
  const token = yield select(selectUserToken);

  const requestURL = `${process.env.REACT_APP_API_URL}/pay/bills`;

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

      yield put(actions.getBillersSuccess(decryptData?.data));
    } else {
      yield put(
        actions.getBillersError({
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
      yield put(actions.getBillersError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.getBillersError({}));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.getBillersError({}));
    } else {
      yield put(actions.getBillersError(err));
    }
  }
}

// Validate Pay Billers
function* validatePaybills() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const billerCode = yield select(selectBillerCode);
  const formData = yield select(selectFormData);
  const referenceNumber = formData?.account_number || formData?.referenceNumber;
  const requestURL = `${process.env.REACT_APP_API_URL}/pay/bills/validate/account/${billerCode}/${referenceNumber}`;
  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);

  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify(formData),
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
      yield put(actions.validatePayBillsSuccess(decryptData));
    } else {
      yield put(
        actions.validatePayBillsError({
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
      yield put(actions.validatePayBillsError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.validatePayBillsError({}));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.validatePayBillsError({}));
    } else {
      yield put(actions.validatePayBillsError(err));
    }
  }
}

// Validate Pay Billers
function* createPayBills() {
  yield delay(500);
  const token = yield select(selectUserToken);
  const billerCode = yield select(selectBillerCode);
  const validatedBiller = yield select(selectValidatedBiller);
  const requestURL = `${process.env.REACT_APP_API_URL}/pay/bills/create/payment/${billerCode}`;
  let encryptPayload: string = '';
  let requestPhrase: PassphraseState = yield call(getRequestPassphrase);
  if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
    encryptPayload = spdCrypto.encrypt(
      JSON.stringify({
        validationNumber: validatedBiller.validationNumber,
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

      if (decryptData) {
        yield put(actions.createPayBillsSuccess(decryptData));
        analytics.logEvent(events.paybills, { code: billerCode });
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
      yield put(actions.createPayBillsError(newError));
    } else if (err && err.response && err.response.status === 500) {
      yield put(appActions.getIsServerError(true));
      yield put(actions.createPayBillsError({}));
    } else if (err && err.response && err.response.status === 401) {
      yield put(appActions.getIsSessionExpired(true));
      yield put(actions.createPayBillsError({}));
    } else {
      yield put(actions.createPayBillsError(err));
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
  yield takeLatest(actions.getBillersLoading.type, getBillers);
  yield takeLatest(actions.validatePayBillsLoading.type, validatePaybills);
  yield takeLatest(actions.createPayBillsLoading.type, createPayBills);
}
