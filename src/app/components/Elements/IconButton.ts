/**
 * Icon Button
 * For use with the Font Awesome icons
 */
import styled from 'styled-components';
import { StyleConstants } from 'styles/StyleConstants';

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  line-height: 36px;
  padding: 0 0;
  border: none;
  background-color: transparent;
  transition: 0.3s ease;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  font-size: 0.9rem;
  color: #a9b1b8;

  &:hover,
  &:focus {
    background-color: ${StyleConstants.GRAY_BG};
    color: inherit;
  }
`;

export default IconButton;
