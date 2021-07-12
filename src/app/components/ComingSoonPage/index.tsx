/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useDispatch } from 'react-redux';

import ButtonLink from 'app/components/Elements/ButtonLink';

import comingSoon from 'app/components/Assets/coming-soon.png';

import { appActions } from 'app/App/slice';

export function ComingSoonPage() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const appMain = document.querySelector('#appMain');
    appMain?.classList.add('not-found');

    dispatch(appActions.getIsBlankPage(true));

    return () => {
      appMain?.classList.remove('not-found');
      dispatch(appActions.getIsBlankPage(false));
    };
  }, []);

  return (
    <>
      <Helmet>
        <title>Coming Soon</title>
        <meta name="description" content="Coming Soon" />
      </Helmet>
      <Wrapper>
        <img src={comingSoon} alt="Coming Soon!" />
        <Title>Feature Coming Soon</Title>
        <p>
          Sorry for the inconvenience. We're currently working on this feature
          for you. We'll notify you when it's available.
        </p>
        <ButtonLink
          variant="contained"
          color="primary"
          to="/dashboard"
          fullWidth
        >
          Close
        </ButtonLink>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 95vh;
  width: 400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #38434d;
  text-align: center;

  img {
    display: inline-block;
    margin-bottom: -15px;
  }

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 0 25px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
  margin: 0 0 20px;
`;
