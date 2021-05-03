/**
 * Button for the Dashboard Page
 * NOTE: if this will show on other pages, move this to app/components/Elements
 */
import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const DashboardButton = styled.button`
  outline: 0;
  border: 0;
  background: #fff;
  padding: 35px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: ${StyleConstants.BORDER_RADIUS};
  font-size: 0.9rem;
  color: inherit;
  display: block;
  width: 48%;
  margin-bottom: 15px;

  svg {
    height: 64px;
    display: block;
    margin: 0 auto 2px;
  }

  &:focus {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }
  &:hover {
    background-color: ${StyleConstants.GRAY_BG};
  }

  ${media.small} {
    width: 31%;
  }

  ${media.medium} {
    width: 23%;
  }
`;

export default DashboardButton;
