/**
 * Wrapper for the dialog component
 * this will have a fixed position on the page
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const sizes = {
  xsmall: '320px',
  small: '400px',
  medium: '640px',
  large: '960px',
  xlarge: '80%',
};

type DialogWrapperProps = {
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | undefined;
};

const Wrapper = styled.div<DialogWrapperProps>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: ${StyleConstants.BLACK_TRANSPARENT_BG};
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
    border: 1px solid ${StyleConstants.BORDER_COLOR};
    border-radius: ${StyleConstants.DIALOG_BORDER_RADIUS};

    .dialog-content {
      flex: 1;
      max-height: 85vh;
      overflow-y: auto;
      /* padding: 20px; */
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
