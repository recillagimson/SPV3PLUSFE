import styled, { css } from 'styled-components';

export const DetailsWrapper = styled.div<{
  padding?: string;
}>`
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const ButtonWrapper = styled.section`
  width: 183px;
  height: 183px;
  border: 0.5px solid #ced4da;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  flex-direction: column;
  cursor: pointer;
  outline: 0;
  transition: 0.5s all ease;

  &:not(:last-child) {
    margin-inline-end: 24px;
  }

  &:hover {
    opacity: 0.4;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
  margin: 0 0 20px;
`;
