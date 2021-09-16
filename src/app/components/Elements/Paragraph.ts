import styled from 'styled-components/macro';

type ParagraphProps = {
  /**
   * Font Weight
   * @default 'normal'
   */
  weight?: 'bolder' | 'bold' | 'normal' | 'light';
  /**
   * Text align
   * @default 'left'
   */
  align?: 'center' | 'left' | 'right';
  /**
   * Font Sizes
   * @default 'regular'
   */
  size?: 'xsmall' | 'small' | 'regular';
  /**
   * Margin (CSS value)
   * @default '0 0 15px'
   */
  margin?: string;
  /**
   * Padding (CSS value)
   * @default '0 0'
   */
  padding?: string;
};

const fontSize = {
  xsmall: '0.8rem',
  small: '0.9rem',
  regular: '1rem',
};

const weights = {
  bolder: 900,
  bold: 700,
  normal: 500,
  light: 300,
};

/**
 * Paragraph Typography Component
 * @typedef ParagraphProps
 */
const Paragraph = styled.p<ParagraphProps>`
  font-size: ${p => (p.size ? fontSize[p.size] : fontSize['regular'])};
  font-weight: ${p => (p.weight ? weights[p.weight] : weights['normal'])};
  text-align: ${p => (p.align ? p.align : 'left')};
  margin: ${p => (p.margin ? p.margin : '0 0 15px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
`;

export default Paragraph;
