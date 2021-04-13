/**
 * Pin Input
 * @prop {number}   length
 * @prop {boolean}  isValid
 * @prop {boolean}  secret
 * @prop {string}   type
 * @prop {function} onChange
 */
import * as React from 'react';
import styled from 'styled-components';
import ReactCodeInput from 'react-code-input';

import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div`
  .pin-input {
    input {
      border-radius: ${StyleConstants.BUTTON_RADIUS};
      background-color: ${StyleConstants.GRAY_BG};
      appearance: textfield;
      border: 1px solid transparent;
      margin: 2px 5px;
      font-size: 1.25rem;
      width: 50px;
      height: 50px;
      text-align: center;
      outline: 0;

      &:hover,
      &:focus {
        border-color: ${StyleConstants.GOLD};
      }

      &[data-valid='false'] {
        background-color: transparent;
        color: ${StyleConstants.BUTTONS.danger.main};
        border-color: ${StyleConstants.BUTTONS.danger.main};
      }
    }
  }
`;

type PinInputProps = {
  length: number;
  isValid: boolean;
  secret: boolean;
  type: string;
  onChange: () => void;
};

export default function PinInputComponent({
  length,
  isValid,
  secret,
  type,
  onChange,
}: PinInputProps) {
  const [code, setCode] = React.useState('');

  return null;
  // return (
  //   <Wrapper>
  //     <ReactCodeInput
  //       name="verify"
  //       inputMode="numeric"
  //       type="text"
  //       fields={4}
  //       onChange={() => onChange()}
  //       className="pin-input"
  //       isValid={isValid}
  //     />
  //   </Wrapper>
  // );
}
