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
  height: calc(100vh - 60px);
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

  React.useEffect(() => {
    const params = location ? location.search : '';
    // console.log(params, token);
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

    if (params && params !== '') {
      // passParams();
      setSuccess(true);
      setLoading(false);
    }

    if (!params || (params && params === '')) {
      setLoading(false);
    }
  }, [location, token]);

  return (
    <Wrapper>
      <div className="success-msg" style={{ padding: '20px 20px 30px' }}>
        {loading && <Loading position="fixed" />}
        <Logo size="small" margin="0 0 30px" />
        {success && (
          <>
            <CircleIndicator size="medium" color="primary">
              <FontAwesomeIcon icon="check" />
            </CircleIndicator>
            <H3 margin="15px 0 10px">Transaction Successfull</H3>
            <p style={{ marginBottom: 30 }}>You may now close this window.</p>
          </>
        )}
      </div>
    </Wrapper>
  );
}
