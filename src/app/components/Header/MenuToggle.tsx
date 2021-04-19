/**
 * Menu Toggle
 * @prop {function}   onClick       Callback for button click
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Button = styled.button`
  width: 30px;
  height: 30px;
  border: 0;
  background: none;
  display: inline-flex;
  align-items: flex-end;
  justify-content: center;
  flex-direction: column;
  justify-self: flex-end;

  span {
    display: block;
    height: 2px;
    background-color: ${StyleConstants.BUTTONS.mainTextColor};
    width: 100%;
    margin: 2px 0;
  }

  span:last-child {
    width: 60%;
  }
`;
export default function MenuToggleButton({ onClick }: { onClick: () => void }) {
  return (
    <Button onClick={onClick} className="btn-toggle">
      <span />
      <span />
    </Button>
  );
}
