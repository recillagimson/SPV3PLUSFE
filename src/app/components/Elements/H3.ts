/** h3 element */
import styled from 'styled-components/macro';

const H3 = styled.h3<{ margin?: string }>`
  font-size: 24px;
  font-weight: 700;
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
`;

export default H3;
