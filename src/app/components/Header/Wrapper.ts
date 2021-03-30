import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

import { Props } from './type';

const Wrapper = styled.header<Props>`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  background-color: ${StyleConstants.WHITE};
  box-shadow: ${StyleConstants.BOX_SHADOW};
  padding: ${p => (p.isLoggedIn ? '15px 25px' : '20px')};

  .spdin & {
    position: sticky;
  }

  .wrapped {
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .logo {
    width: 150px;
    align-self: flex-start;
  }

  ${media.medium`
    .wrapped {
      max-width: ${p => (!p.isLoggedIn ? StyleConstants.MAX_WIDTH : 'auto')};
    }
  `}
`;

export default Wrapper;
