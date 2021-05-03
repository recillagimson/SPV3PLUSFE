/**
 * Nav Button for Sidebar
 *
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const NavButton = styled.button<{ icon?: string; fullWidth?: boolean }>`
  border: 0;
  background-color: transparent;
  background-image: ${p => (p.icon ? p.icon : 'none')};
  background-repeat: no-repeat;
  background-size: auto 100%;
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
  width: ${p => (p.fullWidth ? '100%' : 'auto')};
  font-size: 1rem;
  outline: 0;

  svg {
    width: 38px;
    max-height: 38px;
    margin-right: 10px;
    transition: all 0.2s ease;
  }

  &:focus {
    box-shadow: 0 0 2px 2px ${StyleConstants.FOCUS_COLOR};
  }

  &:hover {
    color: ${StyleConstants.LINK_TEXT_GOLD_HOVER};

    svg {
      opacity: 0.8;
    }
  }
`;

export default NavButton;
