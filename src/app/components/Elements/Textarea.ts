// Textarea styled component

import styled from 'styled-components/macro';
import FormElementStyle from './FormElementsStyle';

const Textarea = styled.textarea`
  ${FormElementStyle};

  width: 100%;
  display: block;
  min-height: 110px;
  max-height: 12em;
  resize: none;
  font-family: inherit;
`;

export default Textarea;
