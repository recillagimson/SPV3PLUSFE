/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';

import ButtonLink from 'app/components/Elements/ButtonLink';

import notFoundImg from 'app/components/Assets/not_found.png';

import { appActions } from 'app/App/slice';
import { selectIsAuthenticated } from 'app/App/slice/selectors';

export function NotFoundPage() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);

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
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <img src={notFoundImg} alt="Page not found!" />
        <Title>Uh-oh, page not found...</Title>
        <ButtonLink
          variant="contained"
          color="primary"
          to={isAuthenticated ? '/dashboard' : '/'}
          fullWidth
        >
          Go home
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

  img {
    display: inline-block;
    margin-bottom: -40px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
  margin: 0 0 30px;
`;
