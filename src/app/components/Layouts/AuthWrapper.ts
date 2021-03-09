import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

import { media } from 'styles/media';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  .form-container {
    border-radius: 20px;
    min-width: 300px;
    max-width: 80%;
  }

  form {
    .icon-btn {
      position: absolute;
      top: 5px;
      right: 5px;
    }

    input[type='checkbox'] {
      margin-right: 7px;
      margin-top: 3px;
    }

    button[type='submit'] {
      margin: 15px 0 10px;
    }

    span {
      font-size: 0.85rem;
    }
  }

  .flex {
    display: flex;
    align-items: flex-start;
  }

  ${media.large`
    .form-container {
      max-width: 500px;
    }
  `}
`;

export default Wrapper;
