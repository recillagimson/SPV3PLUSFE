import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section`
  width: 95%;
  max-width: ${StyleConstants.MAX_WIDTH};
  margin: 0 auto;
  font-size: 0.9rem;
  line-height: 1.7;
  padding: 30px 0;

  h5 {
    margin: 2em 0 1em;
    font-weight: 700;
    font-size: 0.85rem;
  }

  h6 {
    margin: 2em 0 1em;
    font-weight: 700;
    font-size: 0.8rem;
  }
`;

export default Wrapper;
