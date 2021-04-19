import styled from 'styled-components/macro';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 60px);

  small {
    color: #a9b1b8;
  }

  .row {
    display: flex;
    flex-direction: row;
    column-gap: 1em;

    img {
      border: 1px solid #e0e0e0ff;
    }
    .col {
      flex: 1;
      padding: 10px;
      border: 1px solid #e0e0e0ff;
      margin-bottom: 10px;
      border-radius: 8px;

      .parent {
        display: flex;
        column-gap: 1em;

        .image {
          flex-grow: 1;
          min-width: 20%;
          /* border: 1px solid #e0e0e0ff; */
          border-radius: 8px;
        }
        .details {
          flex-grow: 3;
          min-width: 70%;
        }
        p {
          font-size: 12px;
          color: #526372;
          margin-bottom: 0;
          padding-bottom: 0;

          span {
            font-weight: 700;
            text-align: right;
          }
        }
      }
    }

    @media only screen and (max-width: 992px) {
      & {
        flex-direction: row;
      }

      .parent {
        flex-direction: column;
      }
      .image {
        margin-bottom: 10px;
      }
    }

    @media only screen and (max-width: 768px) {
      & {
        flex-direction: column;
      }

      .parent {
        flex-direction: column;
      }
      .image {
        margin-bottom: 10px;
      }
    }
  }
`;

export default Wrapper;
