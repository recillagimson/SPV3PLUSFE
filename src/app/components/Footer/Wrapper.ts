import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const Wrapper = styled.footer`
  text-align: center;
  padding: 20px;
  font-size: 0.9em;

  p {
    margin: 0 0;
    color: #a9b1b8;

    .small {
      display: inline-block;
      font-size: 0.8em;
      opacity: 0.75;
      padding-left: 5px;
    }
  }

  .authenticated & {
    margin-top: auto;
    border-top: 1px solid ${StyleConstants.BORDER_COLOR};
  }
`;

export default Wrapper;
