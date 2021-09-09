import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';
import TypographyProps from './types';

const fontSize = {
  xsmall: '12px',
  small: '14px',
  regular: '16px',
};
const fontWeight = {
  bold: '600',
  bolder: '700',
  light: '300',
  lighter: '100',
  regular: '400',
};
const colors = {
  default: StyleConstants.color.black,
  primary: StyleConstants.color.primaryyellow,
  secondary: StyleConstants.color.gray2,
  mute: StyleConstants.color.lightgray1,
  danger: StyleConstants.color.tones.red,
  success: StyleConstants.color.tones.green,
};

// size?: 'xsmall' | 'small' | 'regular';
// weight?: 'bold' | 'bolder' | 'light' | 'lighter' | 'regular';
const Paragraph = styled.p<TypographyProps>`
  display: block;
  font-size: ${p => (p.size ? fontSize[p.size] : fontSize['regular'])};
  font-weight: ${p =>
    p.weight ? fontWeight[p.weight] : fontWeight['regular']};
  font-style: ${p => (p.italic ? 'italic' : 'normal')};
  color: ${p => (p.color ? colors[p.color] : colors['default'])};
  margin: ${p => (p.margin ? p.margin : '0 0 10px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
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

export default Paragraph;
