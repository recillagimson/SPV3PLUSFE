/**
 * Use this wrapper if you want to have a text beside the input tag
 */
import styled from 'styled-components/macro';

const InputTextWrapper = styled.div`
  position: relative;
  flex-grow: 1;

  input {
    padding-left: 45px;
  }

  span {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #38434d;
  }
`;

export default InputTextWrapper;
