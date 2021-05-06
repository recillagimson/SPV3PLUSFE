import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const LetterAvatar = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 200px;
  width: 48px;
  height: 48px;
  background-color: ${StyleConstants.GOLD};
  color: white;
  font-size: 18px;
  font-weight: normal;
`;

export default LetterAvatar;
