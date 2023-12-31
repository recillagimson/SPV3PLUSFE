import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Main box wrapper
 * NOTE: this box will always take 100% width of the parent container
 *       if you want to resize this box, wrap it in a container with your specified width of choice
 *       ie: <div style={{width: 300px}}><Box>child</Box></div>
 */
const Wrapper = styled.div<{ children?: any; pad?: boolean }>`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  margin: 0 auto 15px;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  & > * {
    flex: 0 0 100%;
  }

  .bt-child {
    padding: ${p => (p.pad ? '20px 25px' : '0 0')};
    flex-grow: 1;
  }

  ${media.medium`
    max-width: 930px;
  `}

  ${media.large`
    max-width: 950px;
  `}
`;

export default Wrapper;
