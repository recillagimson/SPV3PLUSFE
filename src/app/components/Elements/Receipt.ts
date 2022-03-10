import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const ReceiptWrapper = styled.div<{ width?: string; isDark?: boolean }>`
  position: relative;
  width: ${p => (p.width ? p.width : '380px')};
  background-color: ${p =>
    p.isDark
      ? StyleConstants.color.paleyellow2
      : StyleConstants.color.tones.softyellow};
  padding: ${StyleConstants.spacing[16]} ${StyleConstants.spacing[24]};
  margin: 24px auto 32px;

  &:before,
  &:after {
    content: '';
    display: block;
    width: 100%;
    height: 10px;
    position: absolute;
    left: 0;
    right: 0;
  }

  &:before {
    top: -10px;
    background: ${p => `linear-gradient(-135deg, #ffffff 10px, transparent 0) 0 10px,
      linear-gradient(135deg, #ffffff 10px, ${
        p.isDark
          ? StyleConstants.color.paleyellow2
          : StyleConstants.color.tones.softyellow
      } 0) 0 10px`};
    background-size: 13px 15px;
  }

  &:after {
    bottom: -10px;
    background: ${p =>
      `linear-gradient(-135deg, ${
        p.isDark
          ? StyleConstants.color.paleyellow2
          : StyleConstants.color.tones.softyellow
      } 10px, transparent 0) 0 10px,
      linear-gradient(135deg, ${
        p.isDark
          ? StyleConstants.color.paleyellow2
          : StyleConstants.color.tones.softyellow
      } 10px, #ffffff 0) 0 10px`};
    background-size: 13px 15px;
  }
`;

export default ReceiptWrapper;
