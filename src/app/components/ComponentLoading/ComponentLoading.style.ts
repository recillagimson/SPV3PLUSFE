import styled, { css } from 'styled-components';

export const Wrapper = styled.div<{
  isLoading?: boolean;
}>`
  ${({ isLoading }) =>
    !isLoading &&
    css`
      outline: none;
      cursor: default;
    `}

  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 300px;
  }
`;
