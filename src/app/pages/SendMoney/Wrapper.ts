import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';
import { css } from 'styled-components/macro';

const valueDescription = css`
  font-size: 13px;
  display: block;
  margin: 5px 0px;
  font-weight: 500;
`;

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 60px);

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

  .dialog-container {
    padding: 30px 20px;

    .logo-container {
      margin: 0 60px 20px;
    }
    .bg-lightgold {
      margin: 5px 0;
      padding: 20px 10px;
      background-color: #fff9ddff;
      border-radius: 10px;

      .message {
        margin: 20px 0px;
        color: ${StyleConstants.TITLE};
      }

      .details {
        margin: 30px 10px;
        .description {
          ${valueDescription}
          text-align: left;
        }
        .value {
          ${valueDescription}
          text-align: right;
        }
      }

      .total {
        text-align: center;
        margin: 30px 0px;

        span {
          font-size: 13px;
          display: block;
          margin: 5px 0px;
          font-weight: 500;
        }
        p {
          margin: 5px 0px;
          color: ${StyleConstants.TITLE};
          font-size: 20px;
        }
      }

      .date {
        text-align: center;
        font-size: 11px;
      }
    }
    .note {
      margin: 10px 25px 0;
      display: block;
      text-align: center;
      font-size: 11px;
    }
  }
`;

export default Wrapper;
