/**
 * Nav Button for Sidebar
 *
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const NavButton = styled.button`
  border: 0;
  background-color: transparent;
  padding: 5px 3px;
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
  max-height: 38px;
  line-height: 1;
  color: ${StyleConstants.MAIN_TEXT};
  text-decoration: none;
  transition: all 0.2s ease;
  cursor: pointer;
  width: 100%;
  font-size: 1rem;
  outline: 0;

  svg {
    width: 38px;
    max-height: 38px;
    margin-right: 10px;
    transition: all 0.2s ease;
  }

  &:focus-visible {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }

  &:hover {
    color: ${StyleConstants.LINK_TEXT_GOLD_HOVER};
    text-decoration: none;

    svg {
      opacity: 0.8;
    }
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;

export default NavButton;
