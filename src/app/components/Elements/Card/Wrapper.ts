import styled from 'styled-components/macro';
import { media } from 'styles/media';
import { StyleConstants } from 'styles/StyleConstants';

type Props = {
  size?: 'small' | 'medium';
};

const sizes = {
  small: '50%',
  medium: '75%',
};

const Wrapper = styled.div<Props>`
  background-color: ${StyleConstants.WHITE};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  margin: 0 auto 15px;
  display: flex;
  align-items: flex-start;
  justify-content: stretch;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  position: relative;

  & > * {
    flex: 0 0 100%;
  }

  .title {
    font-weight: bold;
    padding: 20px 20px;
    border-bottom: 1px solid #eee;
  }
  .body {
    padding: 20px 20px;
    flex: 1;
  }
  .footer {
    border-top: 1px solid #eee;
    padding: 15px 20px;
  }

  ${media.medium`
    max-width: 930px;
  `}

  ${media.large`
    max-width: 950px;
  `}
`;

export default Wrapper;
