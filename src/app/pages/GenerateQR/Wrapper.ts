import styled from 'styled-components/macro';
import { media } from 'styles/media';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 50px;

  ${media.medium`
    .grid{
      margin: 0 150px;
    }
  `}
`;

export default Wrapper;
