import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Main box wrapper
 * NOTE: this box will always take 100% width of the parent container
 *       if you want to resize this box, wrap it in a container with your specified width of choice
 *       ie: <div style={{width: 300px}}><Box>child</Box></div>
 */
const Wrapper = styled.div<{ children?: any }>`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  margin: 15px auto;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;

  & > * {
    flex: 0 0 100%;
  }

  .bt-child {
    flex-grow: 1;
  }

  ${media.medium`
    max-width: 930px;
  `}

  ${media.large`
    max-width: 1000px;
  `}
`;

export default Wrapper;
