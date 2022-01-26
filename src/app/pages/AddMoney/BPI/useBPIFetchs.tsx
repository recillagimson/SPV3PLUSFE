/**
 * This is for the BPI fetch only of
 * Credentials and Access Token
 * Other API should be used with the standard useFetch hook
 */
import { useState, useCallback } from 'react';
import { request } from 'utils/request';
import { useDispatch } from 'react-redux';
import { appActions } from 'app/App/slice';

/**
 * useFetch hooks that returns loading, error, response, goFetch(), fetchReset()
 * @returns {} {loading, error, response, goFetch, fetchReset}
 */
const useFetchAccessToken = () => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(false);
  const [response, setResponse] = useState<any>(false);

  /**
   * Execute fetching
   * @param {string}    url           BPI auth token url
   * @param {string}    payload       Request payload, must be the JSON.stringify payload if contentType is blank or application/json
   */
  const goFetch = useCallback(
    async (url: string, payload: any) => {
      setLoading(true);

      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: payload,
      };

      try {
        const resp: any = await request(url, options);

        if (resp && resp.access_token) {
          setResponse(resp);
        }
        setLoading(false);
      } catch (err: any) {
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
    [dispatch],
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

export default useFetchAccessToken;
