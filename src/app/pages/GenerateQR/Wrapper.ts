import styled from 'styled-components/macro';
import { media } from 'styles/media';

const Wrapper = styled.section`
  ${media.medium`
    .grid{
      margin: 0 150px;
    }
  `}
`;

export default Wrapper;
