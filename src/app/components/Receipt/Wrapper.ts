import styled from 'styled-components/macro';
import { css } from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const valueDescription = css`
  font-size: 13px;
  display: block;
  margin: 5px 0px;
  font-weight: 500;
`;

const Wrapper = styled.div`
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
