/**
 * Input Element
 * NOTE: this element should always be in full width,
 *       to make this element in an inline manner, wrap it in a element
 *       common style use for input element
 *       extend this style if necessary
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Input = styled.input`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  padding: 15px;
  color: ${StyleConstants.MAIN_TEXT};
  display: block;
  width: 100%;
  font-size: inherit;

  &:focus {
    outline-color: ${StyleConstants.GOLD};
  }
`;

export default Input;
