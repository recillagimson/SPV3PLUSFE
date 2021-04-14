// Textarea styled component

import styled from 'styled-components/macro';
import FormElementStyle from './FormElementsStyle';

const Textarea = styled.textarea`
  ${FormElementStyle};
  max-height: 5em;
  resize: none;
`;

export default Textarea;
