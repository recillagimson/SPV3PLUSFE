import styled from 'styled-components/macro';

const Card = styled.div`
  border-radius: 10px;
  min-width: 70%;
  max-width: 80%;
  background-color: white;

  .card-header {
    width: 100%;
    border-bottom: 1px solid lightgray;

    margin-bottom: 15px;
    padding: 20px 20px;
    h3 {
      margin: 0;
    }
  }

  .card-body {
    width: 100%;
    padding: 20px 20px;
  }
`;

export default Card;
