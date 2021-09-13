import React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

type NavProps = {
  children: React.ReactNode | React.ReactNodeArray;
};

const Navigation = styled.nav<NavProps>`
  text-align: right;
  padding: 0 5px;
  z-index: 1;
  box-shadow: ${StyleConstants.BOX_SHADOW};
  background-color: #fff;

  &.mainNav {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    transform: translateY(-200%);
    transition: transform 0.4s ease-in-out;
    padding: 10px 15% 15px;
  }

  .show & {
    transform: translateY(0);
  }

  & > * {
    display: block;
    margin: 1px 0;
  }

  ${media.small`
    &.mainNav {
      padding: 10px 25% 15px;
    }
  `}

  ${media.medium`
    &.mainNav {
      position: static;
      padding: 0;
      background-color: transparent;
      transform: translateY(0);
      box-shadow: none;
    }

    & > * {
      display: inline-block;
      margin: 0;
    }
  `}
`;

export default Navigation;
