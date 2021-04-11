import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);

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
  }


  .pills {
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

    
  /* p {
    font-size: 15px;
    color: #536372ff;
    margin-bottom: 5px;
  } */
  }

  /* This style will appear after clicking promo */
  .selected-promo{
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
  }

  /* This style is the buttons under Regular Load Category */
  .regular-load-btn {
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

  }
`;

export default Wrapper;
