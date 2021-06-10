import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Dropzone UI Wrapper
 */
const Wrapper = styled.div<{ bg?: boolean }>`
  background-color: ${p =>
    p.bg ? StyleConstants.LIGHT_GRAY_BG : 'transparent'};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: 2px dashed ${StyleConstants.GOLD};
  width: 100%;
  margin: 0 0 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 250px;
  flex-direction: column;
  text-align: center;
  color: ${StyleConstants.LIGHT_GRAY_TEXT};
  position: relative;
  overflow: hidden;

  .svg-inline--fa {
    font-size: 2.5rem;
  }

  input {
    display: none;
    width: 0;
    height: 0;
    position: absolute;
    top: -999px;
    left: -999px;
  }

  .btn-upload {
    border: 0;
    background-color: transparent;
    padding: 0;
    color: ${StyleConstants.GOLD};
    font-size: inherit;
    cursor: pointer;
  }
`;

export default Wrapper;
