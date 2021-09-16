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
    background-repeat: repeat-x;
    background-size: 22px 32px;
    content: ' ';
    display: block;
    height: 32px;
    width: 100%;
    position: relative;
    bottom: 20px;
    left: 0;
  }

  /* #d-wrapper	div > * {
		margin: 0 40px;
	} */

  /* .zig-zag-bottom {
    margin: 32px 0;
    margin-top: 0;
    background: #fff9ddff;
  }

  .zig-zag-top {
    margin: 32px 0;
    margin-bottom: 0;
    background: #fff9ddff;
  } */

  /* .zig-zag-bottom,
  .zig-zag-top {
    padding: 32px 0;
  } */

  .bg-lightgold:after {
    background: linear-gradient(-45deg, transparent 16px, #fff9ddff 0),
      linear-gradient(45deg, transparent 16px, #fff9ddff 0);
    background-repeat: repeat-x;
    background-position: left bottom;
    background-size: 22px 32px;
    content: '';
    display: block;
    width: 100%;
    height: 32px;
    position: relative;
    top: 10px;
    left: 0px;
  }
`;

export default Wrapper;
