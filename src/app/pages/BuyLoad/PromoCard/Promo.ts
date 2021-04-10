import styled from 'styled-components/macro';

const Promo = styled.section`
    border-bottom: 1px solid #eceae0ff;
    padding: 15px 20px;
    cursor: pointer;

    :hover {
      background-color: #eceae0ff;
      border-radius: 10px;
    }

    .promo-title {
      font-weight: bold;
      text-transform: uppercase;
      color: #38434dff;
      margin-bottom: 5px;
      font-size: 15px;
    }
    .promo-description {
      color: #526372ff;
      font-size: 13px;
      margin-bottom: 5px;
    }
    .promo-amount {
      color: #38434dff;
      margin-bottom: 5px;
      font-size: 15px;
    }
  }
`;

export default Promo;
