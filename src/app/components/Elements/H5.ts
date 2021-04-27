import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

type H5Props = {
  margin?: string;
  border?: boolean;
};

const H5 = styled.h5<H5Props>`
  font-weight: 700;
  font-size: 1.125rem;
  margin: ${p => (p.margin ? p.margin : '0 0 0')};
  border-bottom: ${p =>
    p.border ? `1px solid ${StyleConstants.BORDER_COLOR}` : '0'};
`;

export default H5;
