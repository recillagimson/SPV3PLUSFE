/**
 * Use this wrapper if you want to have a button beside the input tag
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const InputIconWrapper = styled.div<{ left?: boolean }>`
  position: relative;
  flex-grow: 1;

  input {
    ${p =>
      !p.left &&
      `
    padding-right: 45px;
    `}
    ${p =>
      p.left &&
      `
    padding-left: 40px;
    `}
  }

  ${p =>
    p.left &&
    `
    .icon {
      position: absolute;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      z-index: 2;
    }
  `}

  button {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
    color: ${StyleConstants.GRAY_TEXT};
  }
`;

export default InputIconWrapper;
