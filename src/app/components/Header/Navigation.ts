import React from 'react';
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

type NavProps = {
  children: React.ReactNode | React.ReactNodeArray;
};

const Navigation = styled.nav<NavProps>`
  text-align: right;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  padding: 2px 15% 15px;
  background-color: #fff;
  transform: translateY(-200%);
  transition: transform 0.3s ease-in-out;
  z-index: 1;
  box-shadow: ${StyleConstants.BOX_SHADOW};

  .show & {
    transform: translateY(0);
  }

  & > * {
    display: block;
    margin: 1px 0;
  }

  ${media.small`
    padding: 2px 25% 15px;
  `}

  ${media.medium`
    position: static;
    padding: 0;
    background-color: transparent;
    transform: translateY(0);
    box-shadow: none;

    & > * {
      display: inline-block;
      margin: 0;
    }
  `}
`;

export default Navigation;
