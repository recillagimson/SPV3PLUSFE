/**
 * Error Boundary
 * This will component will be the top most component in our app, shows an error and where it occur for debugging purposes
 */
import * as React from 'react';
import { useLocation } from 'react-router';
// import { request } from 'utils/request';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Logo from 'app/components/Assets/Logo';
import CircleIndicator from 'app/components/Elements/CircleIndicator';
import H3 from 'app/components/Elements/H3';

// import spdCrypto from 'app/components/Helpers/EncyptDecrypt';

import { selectUserToken } from './slice/selectors';
// import { getRequestPassphrase } from './slice/saga';
import Loading from 'app/components/Loading';

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  .success-msg {
    text-align: center;
    max-width: 400px;
  }
`;

export default function SuccessPostback() {
  const location: any = useLocation();
  const token: any = useSelector(selectUserToken);

  const [loading, setLoading] = React.useState(true);
  const [success, setSuccess] = React.useState(false);
  const [pending, setPending] = React.useState(false);

  React.useEffect(() => {
    const params = new URLSearchParams(window.location.href);
    /*
    const passParams = async () => {
      setLoading(true);
      let encryptedPayload = '';
      const requestPhrase: any = await getRequestPassphrase();

      if (requestPhrase && requestPhrase.id && requestPhrase.id !== '') {
        encryptedPayload = spdCrypto.encrypt(params, requestPhrase.id);
      }

      const options = {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${token.access_token}`,
        },
        body: JSON.stringify({
          id: requestPhrase.id,
          payload: encryptedPayload,
        }),
      };

      try {
        const apirequest: any = await request('', options);
        if (apirequest && apirequest.data) {
          setSuccess(true);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    };
    */

    if (params && params.has('status')) {
      // passParams();
      if (params.get('status') === 'S') {
        setSuccess(true);
      }
      if (params.get('status') === 'P') {
        setPending(true);
      }
      setLoading(false);
    }

    // if (!params || (params && params === '')) {
    //   setLoading(false);
    // }
  }, [location, token]);

  return (
    <Wrapper>
      <div
        className="postback-msg"
        style={{ width: '95%', maxWidth: '400px', padding: '20px 20px 20px' }}
      >
        {loading && <Loading position="fixed" />}
        {success && (
          <>
            <Logo size="small" margin="0 0 30px" />
            <CircleIndicator
              size="medium"
              color="primary"
              style={{ display: 'flex', margin: '0 auto' }}
            >
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H3 margin="15px 0 10px" style={{ textAlign: 'center' }}>
              Transaction Successful
            </H3>
            {/* <p style={{ marginBottom: 30, textAlign: 'center' }}>
              You may now close this window.
            </p> */}
          </>
        )}
        {pending && (
          <>
            <CircleIndicator
              size="medium"
              color="primary"
              style={{ display: 'flex', margin: '0 auto' }}
            >
              <FontAwesomeIcon icon="history" />
            </CircleIndicator>
            <H3 margin="15px 0 10px" style={{ textAlign: 'center' }}>
              Transaction pending
            </H3>
            <p style={{ marginBottom: 30, textAlign: 'center' }}>
              Awesome! Your Add money transaction will reflect once you’ve
              processed the payment through your chosen bank.
            </p>
            <p style={{ marginBottom: 20, textAlign: 'center' }}>
              Please make sure to follow the instructions sent to your email or
              mobile number to complete your transaction.
            </p>
          </>
        )}
      </div>
    </Wrapper>
  );
}
