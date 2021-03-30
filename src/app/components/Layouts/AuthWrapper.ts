import styled from 'styled-components/macro';

import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 110px;
  min-height: calc(100vh - 60px);
  position: relative;

  .form-container {
    border-radius: 20px;
    min-width: 300px;
    max-width: 95%;
  }

  .content {
    padding: 0 25px;
  }

  .content,
  form {
    margin: 30px 0 0;
    position: relative;

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

  .agreement {
    input[type='checkbox'],
    span {
      display: inline-block;
      vertical-align: top;
    }

    input[type='checkbox'] {
      cursor: pointer;
    }

    span {
      width: calc(100% - 25px);
    }

    a {
      font-weight: 600;
      text-decoration: none;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .code {
    text-align: center;

    .pin-input {
      input {
        border-radius: ${StyleConstants.BUTTON_RADIUS};
        background-color: ${StyleConstants.GRAY_BG};
        appearance: textfield;
        border: 1px solid transparent;
        margin: 2px 5px;
        font-size: 1.25rem;
        width: 50px;
        height: 50px;
        text-align: center;
        outline: 0;

        &:hover,
        &:focus {
          border-color: ${StyleConstants.GOLD};
        }

        &[data-valid='false'] {
          background-color: transparent;
          color: #ff645e;
          border-color: #ff645e;
        }
      }
    }
  }

  .link {
    color: inherit;
    transition: all 0.3s ease-in-out;
    text-decoration: underline;
    border: 0;
    outline: 0;
    padding: 0;
    margin: 0;
    background-color: transparent;
    cursor: pointer;
    font-size: inherit;
    font-family: inherit;

    &:hover {
      opacity: 0.9;
      text-decoration: none;
    }
  }

  ${media.large`
    .form-container {
      max-width: 500px;
    }
  `}
`;

export default Wrapper;
