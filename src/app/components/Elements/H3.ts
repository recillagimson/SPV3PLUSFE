/** h3 element */
import styled from 'styled-components/macro';

const H3 = styled.h3<{ margin?: string; align?: string }>`
  font-size: 24px;
  font-weight: 700;
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
  text-align: ${p => (p.align ? p.align : 'inherit')};
`;

export default H3;
