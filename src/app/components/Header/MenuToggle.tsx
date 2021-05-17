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
    transition: transform 0.2s ease-in;
  }

  span:last-child {
    width: 60%;
  }

  &.active {
    span:first-child {
      transform: rotate(45deg);
      transform-origin: 6px 3px;
    }
    span:last-child {
      width: 100%;
      transform: rotate(-45deg);
      transform-origin: 5px -1px;
    }
  }
`;
export default function MenuToggleButton({ onClick }: { onClick: () => void }) {
  const [toggle, setToggle] = React.useState(false);
  const onClickButton = () => {
    setToggle(prev => !prev);
    onClick();
  };
  return (
    <Button
      onClick={onClickButton}
      className={toggle ? 'btn-toggle active' : 'btn-toggle'}
    >
      <span />
      <span />
    </Button>
  );
}
