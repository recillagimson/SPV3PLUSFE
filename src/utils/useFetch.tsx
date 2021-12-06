/**
 * Use Fetch Hook
 */
import { useState, useCallback } from 'react';
import { request } from 'utils/request';
import { useDispatch, useSelector } from 'react-redux';
import { appActions } from 'app/App/slice';

import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { selectClientToken, selectUserToken } from 'app/App/slice/selectors';
import {
  getRequestPassphrase,
  getResponsePassphrase,
} from 'utils/useRequestPassphrase';

/**
 * useFetch hooks that returns loading, error, response, goFetch(), fetchReset()
 * @returns {} {loading, error, response, goFetch, fetchReset}
 */
const useFetch = () => {
  const dispatch = useDispatch();
  const clientToken: any = useSelector(selectClientToken); // for use on requesting passphrase for encrypting and decrypting
  const userToken: any = useSelector(selectUserToken); // for use on requesting passphrase for encrypting and decrypting

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const [response, setResponse] = useState<any>(false);

  /**
   * Execute fetching
   * NOTE: Payload data must be encrypted when passed on this function
   * @param {string}    url           API url no need to pass the whole path, only the URL after the `/api` specified in the document ie: `/auth/login` or `/send/money/validate`
   * @param {string}    method        Fetch Method (GET, POST, PUT, DELETE)
   * @param {string}    payload       Request payload, must be the JSON.stringify payload not the object
   * @param {string}    contentType   Enter an empty string `''` for default application/json content type
   * @param {string}    isUserToken   If true, will use the user token instead of client token
   * @param {boolean}   decrypt       if we are going to decrypt the data set as true, if not, function will return the response as true
   */
  const goFetch = useCallback(
    async (
      url: string,
      method: string,
      payload: any,
      contentType?: '' | 'application/json' | 'form-data',
      isUserToken?: boolean,
      decrypt?: boolean,
    ) => {
      setLoading(true);

      // for development console logging only
      if (
        process.env.REACT_APP_SENTRY_ENV === 'development' &&
        contentType !== 'form-data'
      ) {
        const cons = {
          url: url,
          data: payload !== '' ? JSON.parse(payload) : payload,
        };
        console.info('%cPayload for API', 'color: #E0AC3B', cons);
      }

      // pass the necessary token
      const token = isUserToken
        ? userToken.access_token
        : clientToken.access_token;

      let encryptedPayload = '';
      let reqPhrase: any = {};
      if (contentType !== 'form-data') {
        // NOTE: we might need to further enhance the validation of payload,
        //       one idea if we can use JSON.parse on the given payload string to validate
        if (payload && payload !== '') {
          reqPhrase = await getRequestPassphrase(clientToken.access_token);
          if (reqPhrase && reqPhrase.id && reqPhrase.id !== '') {
            encryptedPayload = spdCrypto.encrypt(
              payload || '',
              reqPhrase.passPhrase,
            );
          }
        }
      }

      // create the necessary request headers
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      };
      // if contenType is blank or application/json, insert the Content-Type
      if (contentType === '' || contentType === 'application/json') {
        headers['Content-Type'] = 'application/json';
      }

      const options = {
        method: method || 'GET',
        headers: headers,
        credential: 'include',
        body:
          contentType === 'form-data'
            ? payload
            : encryptedPayload !== ''
            ? JSON.stringify({ id: reqPhrase.id, payload: encryptedPayload })
            : undefined,
      };

      try {
        const resp: any = await request(
          `${process.env.REACT_APP_API_URL}${url}`,
          options,
        );

        if (resp && resp.data) {
          if (decrypt) {
            const respPhrase: any = await getResponsePassphrase(
              clientToken.access_token,
              resp.data.id,
            );

            if (respPhrase && respPhrase.id) {
              let decryptedData = spdCrypto.decrypt(
                resp.data.payload,
                respPhrase.passPhrase,
              );

              if (decryptedData) {
                // for development console logging only
                if (process.env.REACT_APP_SENTRY_ENV === 'development') {
                  const cons = {
                    url: url,
                    data: decryptedData,
                  };
                  console.info('%cResponse from API', 'color: #E0AC3B', cons);
                }
                setResponse(decryptedData);
              }
            }
          } else {
            setResponse(true);
          }
        }
        setLoading(false);
      } catch (err) {
        // for development console logging only
        if (process.env.REACT_APP_SENTRY_ENV === 'development') {
          const cons = {
            url: url,
            error: err,
          };
          console.info(cons);
        }

        /**
         * Session is Expired
         * Status 401
         */
        if (err && err.response && err.response.status === 401) {
          dispatch(appActions.getIsSessionExpired(true)); // session expired
          return;
        }

        /**
         * Show Error Page for Status 500 or 405
         */
        if (
          err &&
          err.response &&
          (err.response.status === 500 || err.response.status === 405)
        ) {
          dispatch(appActions.getIsServerError(true)); // error 500 - there is something wrong with the BE server or in their code
          return;
        }

        /**
         * API URL not found 404
         * We shouldn't reach this part of the code, if we encounter this, kindly double check the API url or ask the BE devs
         */
        // if (err && err.response && err.response.status === 404) {
        //   dispatch(appActions.getIsNotFound(true)); //
        //   return;
        // }

        /**
         * Default Error Messages from the API endpoint
         * Status 422
         */
        if (err && err.response && err.response.status === 422) {
          const errorBody = await err.response.json();
          setError(errorBody);
          setLoading(false);
          setResponse(false);
          return;
        }

        // if none of the above met, pass the whole err object
        // should not reach this part, for this will be an unknown error
        setError(err);
        setLoading(false);
        setResponse(false);
      }
    },
    [userToken, clientToken, dispatch],
  );

  /**
   * Resets only the local state of this hook
   * It depends on your use case if you want to trigger this
   */
  const fetchReset = () => {
    setLoading(false);
    setError(false);
    setResponse(false);
  };

  return { loading, error, response, goFetch, fetchReset };
};

export default useFetch;
