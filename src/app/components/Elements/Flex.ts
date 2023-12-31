/**
 * Flex
 * @prop {string} justifyContent    valid css value ('flex-start' | 'flex-end' | 'center' | 'stretch') default: 'flex-start'
 * @prop {string} alignItems        valid css value ('flex-start' | 'flex-end' | 'center' | 'stretch') default: 'flex-start'
 * @prop {sring}  direction         valid css value ('row' | 'columns' | 'column-reverse' | 'row-reverse') default: 'row'
 */

import styled from 'styled-components/macro';

export interface FlexProps {
  alignItems?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around';
  direction?: 'row' | 'column' | 'column-reverser' | 'row-reverse';
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse' | 'initial' | 'inherit';
}

const Flex = styled.div<Partial<FlexProps>>`
  display: flex;
  align-items: ${p => (p.alignItems ? p.alignItems : 'flex-start')};
  justify-content: ${p => (p.justifyContent ? p.justifyContent : 'flex-start')};
  flex-direction: ${p => (p.direction ? p.direction : 'row')};
  flex-wrap: ${p => (p.wrap ? p.wrap : 'nowrap')};
`;

export default Flex;
