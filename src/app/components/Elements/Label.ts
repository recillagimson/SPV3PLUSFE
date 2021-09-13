import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Label = styled.label<{ nomargin?: boolean }>`
  color: ${StyleConstants.LABEL_TEXT};
  /* font-size: 0.95rem; */
  margin: ${p => (p.nomargin ? '0 0 2px' : '0 0 5px')};
  display: block;

  i {
    font-style: normal;
    color: ${StyleConstants.BUTTONS.danger.main};
  }
`;

export default Label;
