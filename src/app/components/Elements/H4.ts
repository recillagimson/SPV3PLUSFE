import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type H4Props = {
  align?: string;
  margin?: string;
  border?: boolean;
};

const H4 = styled.h4<H4Props>`
  font-weight: 700;
  font-size: 1.315rem;
  text-align: ${p => (p.align ? p.align : 'inherit')};
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
  padding-bottom: ${p => (p.border ? `10px` : '0')};
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.LIGHT_BORDER_COLOR}` : '0'};

  svg {
    margin-right: 10px;
  }
`;

export default H4;
