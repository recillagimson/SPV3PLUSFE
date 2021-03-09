import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { StyleConstants } from 'styles/StyleConstants';
import squiderror from 'app/components/Assets/img/squiderror.png';

export function NotFoundPage() {
  return (
    <>
      <Helmet>
        <title>404 Page Not Found</title>
        <meta name="description" content="Page not found" />
      </Helmet>
      <Wrapper>
        <img src={squiderror} alt="404 - Page Not Found" />
        <Title>
          4
          <span role="img" aria-label="Crying Face">
            😢
          </span>
          4
        </Title>
        <p>Page not found.</p>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  min-height: 320px;
  background-color: ${StyleConstants.GRAY_BG};
  color: #fff;

  img {
    width: 300px;
  }

  p {
    font-size: 1.25rem;
    line-height: 1.5;
    margin: 0.625rem 0 1.5rem 0;
  }
`;

const Title = styled.div`
  margin-top: -8vh;
  font-weight: bold;
  color: black;
  font-size: 10rem;
  color: #fff;

  span {
    font-size: 8rem;
  }
`;
