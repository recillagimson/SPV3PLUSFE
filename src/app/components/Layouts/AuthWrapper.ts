import styled from 'styled-components/macro';

import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.section<{ bg?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 130px 10px 10px;
  min-height: calc(100vh - 60px);
  position: relative;
  background-color: ${p => (p.bg ? StyleConstants.BODY_COLOR : 'transparent')};

  .form-container {
    border-radius: 20px;
    min-width: 300px;
    max-width: 95%;
    width: 100%;
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

    /* span {
      font-size: 0.85rem;
    } */
  }

  .content {
    width: 90%;
    margin-left: auto;
    margin-right: auto;
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

    a {
      text-decoration: underline;
      color: inherit;
      transition: all 0.3s ease;

      &:hover {
        text-decoration: none;
      }
    }

    .as-link {
      padding: 0;
      background-color: transparent;
      border: 0;
      cursor: pointer;
      color: inherit;
      text-decoration: underline;

      &:hover {
        color: #000;
      }
    }
  }

  .code {
    text-align: center;
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

  ${media.medium`
    .form-container {
      max-width: 540px;
    }
  `}
`;

export default Wrapper;
