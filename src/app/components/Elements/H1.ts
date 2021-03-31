import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const H1 = styled.h1<{ margin?: string }>`
  font-size: 38px;
  color: ${StyleConstants.TITLE};
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
`;

export default H1;
