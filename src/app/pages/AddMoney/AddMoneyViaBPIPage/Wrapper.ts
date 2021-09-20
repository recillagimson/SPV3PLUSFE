import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section`
  .logo {
    display: flex;
    justify-content: center;
  }

  .list-account-wrapper {
    min-height: 100px;

    &.reverse {
      .check {
        position: absolute;
        right: 30%;
      }
    }
    .account-details {
      display: flex;
      justify-content: center;
      flex-direction: column;
      margin-left: 20px;
    }
  }
  .number {
    height: 20px;
    font-weight: 700;
  }

  .otp-wrapper {
    display: flex;
    align-items: center;
    max-width: 600px;
    margin: auto;
    div {
      width: 100%;
      height: 30px;
    }
    input {
      height: 30px;
      border-radius: unset;
      border: unset;
      padding-bottom: unset;
      border-bottom: 1px solid ${StyleConstants.LIGHT_BORDER_COLOR};
    }
    .timer {
      width: 114px;
      height: 30px;
      border: 1px solid ${StyleConstants.LIGHT_BORDER_COLOR};
      color: ${StyleConstants.LIGHT_GRAY_TEXT};
      text-align: center;
      display: flex;
      align-items: center;
      border-radius: 4px;
      justify-content: center;
    }
  }
`;

export default Wrapper;
