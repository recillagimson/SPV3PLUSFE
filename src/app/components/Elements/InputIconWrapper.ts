/**
 * Use this wrapper if you want to have a button beside the input tag
 */
import styled from 'styled-components/macro';

const InputIconWrapper = styled.div`
  position: relative;

  input {
    padding-right: 45px;
  }

  button {
    position: absolute;
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export default InputIconWrapper;
