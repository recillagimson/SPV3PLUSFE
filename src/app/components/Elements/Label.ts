import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Label = styled.label`
  color: ${StyleConstants.LABEL_TEXT};
  font-size: 0.9rem;
  margin: 0 0 5px;
  display: block;

  i {
    font-style: normal;
    font-size: 0.9em;
    color: ${StyleConstants.BUTTONS.danger.main};
  }
`;

export default Label;
