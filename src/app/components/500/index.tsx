/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Button from 'app/components/Elements/Button';

import { appActions } from 'app/App/slice';
import { selectIsAuthenticated } from 'app/App/slice/selectors';

export function Page500() {
  const history = useHistory();
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
        <title>500 - Server Error</title>
        <meta name="description" content="500 - Server Error" />
      </Helmet>
      <Wrapper>
        <img src={`${process.env.PUBLIC_URL}/img/500.png`} alt="500" />

        <Title>Oops, something went wrong</Title>
        <p>
          Try to click go back button or feel free to contact us if the problem
          persists.
        </p>
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={() => history.push(isAuthenticated ? '/dashboard' : '/')}
        >
          Go back
        </Button>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  width: 95%;
  height: 95vh;
  max-width: 380px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #38434d;
  text-align: center;

  p {
    font-size: 1rem;
    line-height: 1.5;
    margin: 0 0 25px;
  }
`;

const Title = styled.div`
  font-weight: bold;
  font-size: 1.125rem;
  line-height: 1.2;
  margin: 0 0 10px;
`;
