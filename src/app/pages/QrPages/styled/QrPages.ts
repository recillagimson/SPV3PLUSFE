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

export const ButtonWrapper = styled.button`
  width: 183px;
  height: 183px;
  background-color: transparent;
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
    opacity: 0.7;
  }
`;

export const Title = styled.div`
  font-weight: bold;
  font-size: 24px;
  line-height: 1.2;
  margin: 0 0 20px;
`;

interface ImageAvatarProps {
  url?: string;
}

export const ImageAvatar = styled.div<ImageAvatarProps>`
  background-image: ${({ url }) => `url(${url})`};
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin: 0 auto;
  display: block;
  border-radius: 50%;
  height: 64px;
  width: 64px;
  border: 1px solid #f0f0f0;
  margin-block-end: 12px;
`;
