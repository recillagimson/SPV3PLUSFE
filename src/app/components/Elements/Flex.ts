/**
 * Flex
 * @prop {string} justifyContent    Left, Center, Right
 * @prop {string} alignItems        Left, Center, Right
 * @prop {sring}  direction         Flex direction, must be valid CSS value
 */

import styled from 'styled-components/macro';

type Props = {
  justifyContent?: string;
  alignItems?: string;
  direction?: string;
};

const Flex = styled.div<Props>`
  display: flex;
  align-items: ${p => (p.alignItems ? p.alignItems : 'flex-start')};
  justify-content: ${p => (p.justifyContent ? p.justifyContent : 'flex-start')};
  flex-direction: ${p => (p.direction ? p.direction : 'row')};
`;

export default Flex;
