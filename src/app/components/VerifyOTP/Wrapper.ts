import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.div`
  /* margin: 10px 0; */
  padding: 10px 5px;
  text-align: center;
  position: relative;

  .otp-input {
    justify-content: center;
    margin-bottom: 20px;

    input {
      background-color: ${StyleConstants.color.tones.mute};
      border-radius: ${StyleConstants.radius.xlarge};
      border: 1px solid ${StyleConstants.color.tones.mute};
      padding: 7px;
      margin: 2px 7px;
      font-size: 1.15rem;
      line-height: 1;
      width: 50px;
      height: 50px;
      text-align: center;
      outline: 0;

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
        border-color: ${StyleConstants.color.primaryyellow};
        box-shadow: ${StyleConstants.focus};
      }

      &[value].error-pin,
      &[data-valid='false'] {
        background-color: ${StyleConstants.color.white};
        border-color: ${StyleConstants.color.tones.red};
        color: ${StyleConstants.color.tones.red};
      }
    }
  }
`;

export default Wrapper;
