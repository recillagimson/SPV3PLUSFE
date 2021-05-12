import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 0 50px;
  /* min-height: calc(100vh - 60px); */

  small {
    display: block;
    color: #526372;
    margin-top: 5px;
    font-weight: lighter;
  }

  /* For review details  */
  .review-send-money {
    text-align: center;
    .email {
      text-align: center;
      color: ${StyleConstants.MAIN_TEXT};
      font-size: 18px;
      font-weight: 500;
      margin-top: 10px;
      margin-bottom: 5px;
    }
    .number {
      text-align: center;
      font-size: 14px;
    }
    .name {
      font-size: 16px;
      float: left;
      color: ${StyleConstants.LABEL_TEXT};
    }
    .value {
      font-size: 16px;
      float: right;
      color: ${StyleConstants.LABEL_TEXT};
    }
    .item {
      padding: 8px;
    }
    .total-amount {
      color: ${StyleConstants.TITLE};
    }
  }

  /* For verification */
  .verification {
    padding: 50px 0px;
  }

  /* Resend OTP Button */
  .link {
    color: inherit;
    transition: all 0.3s ease-in-out;
    text-decoration: none;
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;

    &:hover {
      opacity: 0.9;
      text-decoration: none;
    }
  }
`;

export default Wrapper;
