/**
 * Wrapper for the buttons
 */
import styled from 'styled-components/macro';
import { media } from 'styles/media';

const Wrapper = styled.div<{ children: any }>`
  display: grid;
  grid-gap: 15px;
  grid-template-columns: repeat(2, 1fr);

  ${media.small`
    grid-template-columns: repeat(3, 1fr);
  `}

  ${media.medium`
    grid-template-columns: repeat(4, 1fr);
  `}
`;

export default Wrapper;
