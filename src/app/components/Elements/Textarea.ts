// Textarea styled component

import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Textarea = styled.textarea`
  height: 5em;
  resize: none;
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  padding: 15px;
  color: ${StyleConstants.MAIN_TEXT};
  display: block;
  width: 100%;
  outline: none;
  font-size: inherit;

  &:focus {
    border: 1px solid ${StyleConstants.GOLD};
    border-radius: ${StyleConstants.BORDER_RADIUS};
  }
`;

export default Textarea;
