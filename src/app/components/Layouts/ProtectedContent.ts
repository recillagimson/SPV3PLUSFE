import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

/**
 * Wrapper for the content in the protected pages
 */
const ProtectedContentWrapper = styled.section`
  width: 95%;
  max-width: ${StyleConstants.PROTECTED_CONTENT_MAX_WIDTH};
  margin: 0 auto;
  padding-bottom: 20px;
`;

export default ProtectedContentWrapper;
