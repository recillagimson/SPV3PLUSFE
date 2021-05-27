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
  margin-top: 30px;
  margin-bottom: 30px;
  /* min-height: calc(100vh - 60px); */

  .product-list {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e7eaf3;
    padding: 15px 15px;
    cursor: pointer;
    border-radius: ${StyleConstants.BORDER_RADIUS};

    &:hover {
      background-color: #e7eaf3;
    }

    &:first-child {
      border-top: 1px solid #e7eaf3;
    }
  }

  .review-details {
    p {
      margin: 5px 0;
    }
  }

  .active {
    background-color: #e7eaf3;
  }
  /* 
  .grid {
    padding: 1em 1.50em;
    border: 1px solid #efefefff;
    border-radius: 0.5em;
    cursor: pointer;
    &:hover {
      background-color: #f0f0f0ff;
      transition: 0.3s;
    }
    img {
      border: 2px solid #efefefff;
    }
  } */

  /* .pills {
    cursor: pointer;
    white-space: nowrap;
    width: 99%;
    overflow: auto;
  }

  .network-name{
    display: block;
    text-align: center;
  }

  .circle {
    border-radius: 50%;
  }

  .review-text{
    font-size: 15px;
    margin-bottom: 5px;
    color: #536372ff;
  } */

  /* This style will appear after clicking promo */
  /* .selected-promo{
    border-left: 3px solid #E0AC3BFF;
    padding: 10px 10px 5px;
    position: relative;

    .remove-selected-promo{
      position: absolute;
      top: 8px;
      right: 16px;
      font-size: 18px;
      cursor: pointer;

      :hover{
        color: #A9B1B8FF;
      }
    }
  } */

  /* This style is the buttons under Regular Load Category */
  /* .regular-load-btn {
    background-color: #f0f0f0ff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #d1cfcbff;
    }

    small {
      color: #677788ff;
    }
    p {
      color: #677788ff;
    }
  }

  .logoContainer{
    margin: 0 60px 20px;
  } */

  /* .dialog{
    .bg-lightgold{
      margin: 5px 0;
      padding: 20px 10px;
      background-color: #FFF9DDFF;
      border-radius: 10px;

      .message{
        margin: 20px 0px;
        color: ${StyleConstants.TITLE};
      }

      .details{
        margin: 30px 10px;
        .description{
          ${valueDescription}
          text-align: left;
        }
        .value{
          ${valueDescription}
          text-align: right;
        }
      }

      .total{
        text-align: center;
        margin: 30px 0px;

        span{
          font-size: 13px;
          display: block;
          margin: 5px 0px;
          font-weight: 500;
        }
        p{
          margin: 5px 0px;
          color: ${StyleConstants.TITLE};
          font-size: 20px;
        }
      }

      .date{
        text-align: center;
        font-size: 11px;
      }
    }
    .note{
      margin: 10px 25px 0;
      display: block;
      text-align: center;
      font-size: 11px;
    }
  } */

  /* } */
`;

export default Wrapper;
