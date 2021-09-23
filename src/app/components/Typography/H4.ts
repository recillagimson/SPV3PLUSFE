import styled from 'styled-components/macro';
import TypographyProps from './types';

const H4 = styled.h4<TypographyProps>`
  font-size: 24px;
  font-weight: 700;
  font-style: ${p => (p.italic ? 'italic' : 'normal')};
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
  text-align: ${p => (p.align ? p.align : 'left')};
  text-align: ${p => (p.align ? p.align : 'left')};
  text-decoration: ${p =>
    p.underline && !p.strikethrough
      ? 'underline'
      : !p.underline && p.strikethrough
      ? 'line-through'
      : p.underline && p.strikethrough
      ? 'line-through underline'
      : 'none'};
`;

export default H4;
