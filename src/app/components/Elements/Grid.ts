import styled from 'styled-components/macro';
import { media } from 'styles/media';

export type GridProps = {
  columns?: string;
  rows?: string;
  gap?: string;
  alignItems?: string;
  justifyItems?: string;
  margin?: string;
};
/**
 * Grid Component
 * @prop {string} columns        Grid CSS value, will be applied to grid-template-columns
 * @prop {string} rows           Grid CSS value, will be applied to grid-template-rows
 * @prop {string} gap            Grid Gap CSS value, will be applied to grid-gap
 * @prop {string} alignItems     Grid align-items CSS value
 * @prop {string} justifyItems   Grid justify-items CSS value
 */
const Grid = styled.div<GridProps>`
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  grid-gap: ${p => (p.gap ? p.gap : '0 0')};
  align-items: ${p => (p.alignItems ? p.alignItems : 'stretch')};
  justify-items: ${p => (p.justifyItems ? p.justifyItems : 'stretch')};
  margin: ${p => (p.margin ? p.margin : '0 0')};

  ${media.medium`
    grid-template-columns: ${p => (p.columns ? p.columns : '100%')};
    grid-template-rows: ${p => (p.rows ? p.rows : 'auto')};
  `}
`;

export default Grid;
