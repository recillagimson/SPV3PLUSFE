import styled from 'styled-components/macro';

const Balance = styled.div`
  margin: 0;
  text-align: center;
  display: flex;
  justify-content: center;

  .currency {
    font-size: 0.85em;
    align-self: center;
    margin-right: 2px;
    margin-top: 7px;
  }

  .amount {
    font-weight: 700;
    font-size: 1.75em;
    align-self: flex-end;
  }

  button {
    align-self: center;
    margin-left: 5px;
  }
`;

export default Balance;
