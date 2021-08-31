/**
 * Button for the Dashboard Page
 * NOTE: if this will show on other pages, move this to app/components/Elements
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const DashboardButton = styled.button<{ border?: boolean }>`
  outline: 0;
  border: 0;
  background: #fff;
  padding: 35px 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: ${StyleConstants.BORDER_RADIUS};
  border: ${p => (p.border ? `1px solid ${StyleConstants.BORDER_COLOR}` : '0')};
  font-size: 0.9rem;
  color: inherit;
  display: block;
  cursor: pointer;
  text-decoration: none;
  text-align: center;

  svg {
    height: 64px;
    display: block;
    margin: 0 auto 8px;
  }

  &:focus-visible {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }
  &:hover {
    background-color: ${StyleConstants.GRAY_BG};
  }

  &:disabled {
    background-color: ${StyleConstants.LIGHT_GRAY_BG};
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default DashboardButton;
