import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const LogoutWrapper = styled.div`
  text-align: center;
  padding-top: 25px;

  p {
    margin: 0 0 15px;
  }

  .buttons {
    margin-top: 30px;
    border-top: 1px solid ${StyleConstants.BORDER_COLOR};

    button {
      padding: 12px;
      outline: 0;
      border: 0;
      background: none;
      width: 50%;
      opacity: 0.85;
      transition: opacity 0.3s ease-in;
      cursor: pointer;

      &.btn-logout {
        border-left: 1px solid ${StyleConstants.BORDER_COLOR};
        color: ${StyleConstants.BUTTONS.danger.main};
      }

      &:hover {
        opacity: 1;
      }
    }
  }
`;

export default LogoutWrapper;
