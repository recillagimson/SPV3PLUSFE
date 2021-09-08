import styled from 'styled-components/macro';

type ParagraphProps = {
  /**
   * Font Weight
   * @default 'normal'
   */
  weight: 'bold' | 'normal' | 'light';
  /**
   * Text align
   * @default 'left'
   */
  align: 'center' | 'left' | 'right';
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

const weights = {
  bold: 700,
  normal: 500,
  light: 300,
};

/**
 * Paragraph Typography Component
 * @typedef ParagraphProps
 */
const Paragraph = styled.p<ParagraphProps>`
  font-size: 1rem;
  font-weight: ${p => (p.weight ? weights[p.weight] : weights['normal'])};
  text-align: ${p => (p.align ? p.align : 'left')};
  margin: ${p => (p.margin ? p.margin : '0 0 15px')};
  padding: ${p => (p.padding ? p.padding : '0 0')};
`;

export default Paragraph;
