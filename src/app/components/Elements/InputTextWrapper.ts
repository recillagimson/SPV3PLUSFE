/**
 * Use this wrapper if you want to have a text beside the input tag
 */
import styled from 'styled-components/macro';

const InputTextWrapper = styled.div<{ position?: 'left' | 'right' }>`
  position: relative;
  flex-grow: 1;

  input {
    ${p =>
      p.position === 'right' ? 'padding-right: 45px;' : 'padding-left: 45px;'};
  }

  span {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: #38434d;
    padding-top: 2px;
    ${p => (p.position === 'right' ? 'right: 5px;' : 'left: 10px')};
  }
`;

export default InputTextWrapper;
