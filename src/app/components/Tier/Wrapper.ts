/**
 * Tier Wrapper
 *
 */
import styled from 'styled-components/macro';
import { media } from 'styles/media';

const Wrapper = styled.div`
  width: 90%;
  max-width: 1280px;
  margin: 20px auto;
  padding: 0 10px;
  overflow-x: auto;
  display: flex;

  ${media.medium`
    margin-top: 80px;
  `}
`;

export default Wrapper;
