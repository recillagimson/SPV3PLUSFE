/**
 * Pin Input
 * @prop {number}   length        the number of fields to show, default to 4
 * @prop {boolean}  isValid       true/false if PIN is valid (if false, will show the red design of invalide inputs)
 * @prop {function} onChange      callback to return the value of the PIN inputted by the user
 * @prop {string}   value         the value of the PIN
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import ReactCodeInput from 'react-code-input';

import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div`
  margin: 0 0 5px;

  .pin-input {
    input {
      border-radius: ${StyleConstants.BUTTON_RADIUS};
      background-color: ${StyleConstants.GRAY_BG};
      border: 1px solid transparent;
      margin: 2px 7px;
      font-size: 1.15rem;
      line-height: 1;
      width: 25px;
      height: 25px;
      text-align: center;
      outline: 0;
      color: ${StyleConstants.GOLD};

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }

      &[type='number'] {
        -moz-appearance: textfield;
      }
      &[type='number'] {
        appearance: textfield;
      }

      &:hover,
      &:focus-visible {
        border-color: ${StyleConstants.GOLD};
      }

      &[value]:not([value='']) {
        background-color: ${StyleConstants.GOLD};
      }

      &[data-valid='false'] {
        background-color: ${StyleConstants.BUTTONS.danger.main};
        border-color: ${StyleConstants.BUTTONS.danger.main};
      }
    }
  }
`;

type PinInputProps = {
  length: number;
  isValid: boolean;
  onChange: (code: any) => void;
  value?: any;
};

export default function PinInputComponent({
  length,
  isValid,
  onChange,
  value,
}: PinInputProps) {
  return (
    <Wrapper>
      <ReactCodeInput
        name="verify"
        inputMode="numeric"
        type="password"
        fields={length || 4}
        onChange={onChange}
        className="pin-input"
        isValid={isValid}
        pattern="[0-9]"
        value={value || ''}
      />
    </Wrapper>
  );
}
