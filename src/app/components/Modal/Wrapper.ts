import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const sizes = {
  xsmall: '320px',
  small: '400px',
  medium: '640px',
  large: '960px',
  xlarge: '85%',
};

type ModalWrapperProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  noPadding?: boolean;
};

const Wrapper = styled.div<ModalWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${StyleConstants.transparent.black};
  z-index: 3000;
  display: flex;
  align-items: center;
  justify-content: center;

  .dialog-child {
    position: relative;
    z-index: 2;
    width: ${p => (p.size ? sizes[p.size] : '100%')};
    max-width: 95%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    /* border: 1px solid ${StyleConstants.divider}; */
    box-shadow: ${StyleConstants.shadow[2]};
    border-radius: ${StyleConstants.radius.large};

    .dialog-close {
      position: absolute;
      top: 16px;
      right: 10px;
    }

    .dialog-content {
      flex: 1;
      padding: ${p => (p.noPadding ? '0 0 0' : StyleConstants.spacing[24])};

      &.center {
        text-align: center;
      }
    }
  }

  &.dialog-enter {
    opacity: 0;

    .dialog-child {
      opacity: 0;
      transform: scale(1.1);
    }
  }

  &.dialog-enter-active {
    opacity: 1;
    transition: opacity 200ms;

    .dialog-child {
      opacity: 1;
      transform: scale(1);
      transition: opacity 300ms, transform 300ms;
    }
  }

  &.dialog-exit {
    opacity: 1;

    .dialog-child {
      opacity: 1;
      transform: scale(1);
    }
  }

  &.dialog-exit-active {
    opacity: 0;
    transition: opacity 200ms;

    .dialog-child {
      opacity: 0;
      transform: scale(0.9);
      transition: opacity 300ms, transform 300ms;
    }
  }
`;

export default Wrapper;
