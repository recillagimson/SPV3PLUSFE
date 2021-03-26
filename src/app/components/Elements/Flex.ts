/**
 * Flex
 * @prop {string} justifyContent     Left, Center, Right
 * @prop {string} alignItems  Left, Center, Right
 */

import styled from 'styled-components/macro';

type Props = {
  justifyContent?: string;
  alignItems?: string;
};

const Flex = styled.div<Props>`
  display: flex;
  align-items: ${p => (p.alignItems ? p.alignItems : 'flex-start')};
  justify-content: ${p => (p.justifyContent ? p.justifyContent : 'flex-start')};
`;

export default Flex;
