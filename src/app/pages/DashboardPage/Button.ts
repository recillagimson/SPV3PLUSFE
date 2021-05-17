/**
 * Button for the Dashboard Page
 * NOTE: if this will show on other pages, move this to app/components/Elements
 */
import styled from 'styled-components/macro';
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
  cursor: pointer;

  svg {
    height: 64px;
    display: block;
    margin: 0 auto 2px;
  }

  &:focus-visible {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }
  &:hover {
    background-color: ${StyleConstants.GRAY_BG};
  }
`;

export default DashboardButton;
