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
      margin: 0 auto 20px;
      width: 200px;
      text-align: center;
    }
    .bg-lightgold {
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
        p,
        span {
          ${valueDescription}
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

  .bg-lightgold:before,
  .bg-lightgold:after {
    background-size: 14px 30px;
    background-repeat: repeat-x;
    content: '';
    display: block;
    height: 33px;
    width: 100%;
    position: relative;
    left: 0px;
  }

  .bg-lightgold:before {
    background: linear-gradient(
        -45deg,
        #fff9ddff 16px,
        red 16px,
        blue 16px,
        transparent 0
      ),
      linear-gradient(45deg, #fff9ddff 16px, transparent 0);
    background-position: left top;
    bottom: 15px;
  }

  .bg-lightgold:after {
    background: linear-gradient(-45deg, transparent 16px, #fff9ddff 0),
      linear-gradient(45deg, transparent 16px, #fff9ddff 0);
    background-position: left bottom;
    top: 15px;
  }
`;

export default Wrapper;
