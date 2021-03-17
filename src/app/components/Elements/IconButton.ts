/**
 * Icon Button
 * For use with the Font Awesome icons
 */
import styled from 'styled-components';

const IconButton = styled.button`
  width: 36px;
  height: 36px;
  line-height: 36px;
  padding: 0 0;
  border: none;
  transition: 0.3s;
  background-color: #efefef;
  border-radius: 50%;
  cursor: pointer;
  outline: 0;
  font-size: 0.9rem;

  &:hover,
  &:focus {
    background-color: #ccc;
  }
`;

export default IconButton;
