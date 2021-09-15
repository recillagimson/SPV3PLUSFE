import styled from 'styled-components/macro';

import { StyleConstants } from 'styles/StyleConstants';

const Button = styled.button`
  cursor: pointer;
  transition: color 0.2s ease-in;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 400;
  color: inherit;
  padding: 14px 35px 14px 2px;
  text-align: left;
  background-color: transparent;
  border: 0;
  display: flex;
  align-items: center;
  position: relative;

  &.active,
  &:hover {
    color: ${StyleConstants.GOLD};
  }

  .svg-inline--fa {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default Button;
