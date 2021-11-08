import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

type H6Props = {
  align?: 'left' | 'right' | 'center';
  margin?: string;
  border?: boolean;
};

const H6 = styled.h6<H6Props>`
  font-weight: 700;
  font-size: 1rem;
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
  text-align: ${p => (p.align ? p.align : 'inherit')};
  padding-bottom: ${p => (p.border ? `10px` : '0')};
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.LIGHT_BORDER_COLOR}` : '0'};

  svg {
    margin-right: 10px;
  }
`;

export default H6;
