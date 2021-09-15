import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const H2 = styled.h2<{ margin?: string }>`
  font-size: 32px;
  font-weight: 700;
  color: ${StyleConstants.TITLE};
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
`;

export default H2;
