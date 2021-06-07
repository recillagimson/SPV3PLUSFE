/**
 * Tier Item Style
 */
import styled from 'styled-components/macro';
import { StyleConstants } from 'styles/StyleConstants';

const ItemWrapper = styled.div`
  min-width: 300px;
  width: 300px;
  margin: 0 10px;
  background-color: ${StyleConstants.WHITE};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  border-radius: ${StyleConstants.BORDER_RADIUS};
  padding: 15px 20px 25px;
  position: relative;

  button {
    width: 175px;
    margin: 0 auto;
    display: block;
  }
`;

const TierName = styled.div`
  position: absolute;
  top: 0;
  left: 20px;
  padding: 15px 8px;
  font-size: 0.9rem;
  background-color: ${StyleConstants.BUTTONS.primary.textColor};
  color: ${StyleConstants.WHITE};
  border-radius: ${`0 0 ${StyleConstants.BORDER_RADIUS}
    ${StyleConstants.BORDER_RADIUS}`};
`;

const TierClass = styled.h4`
  font-size: 1.5rem;
  font-weight: 700;
  padding: 5px 0 20px;
  margin: 0 0 20px;
  text-align: right;
  border-bottom: 1px solid ${StyleConstants.BORDER_COLOR};
`;

const TierServices = styled.div`
  width: 175px;
  margin: 0 auto;

  h6 {
    font-size: 1.125rem;
    margin: 0 0 15px;
    text-align: center;
    color: ${StyleConstants.BUTTONS.primary.textColor};
  }

  ul {
    list-style: none;
    margin: 0 0 0;
    padding: 0 15px;

    li {
      display: block;
      line-height: 1;
      padding: 5px 0;
      color: ${StyleConstants.MAIN_TEXT};

      .icon {
        display: inline-block;
        vertical-align: middle;
        width: 25px;
        height: 25px;
        text-align: center;
        padding: 5px 0 0 1px;
        font-size: 0.9rem;
        border-radius: ${StyleConstants.BUTTON_RADIUS};
        border: 1px solid ${StyleConstants.GOLD};
        color: ${StyleConstants.GOLD};
        margin-right: 8px;
      }
    }
  }
`;

const TierLimit = styled.p`
  margin: 20px 0;
  text-align: center;
  font-size: 1.65rem;
  font-weight: 700;

  small {
    font-size: 1rem;
    display: block;
    font-weight: 500;
  }
`;

export { ItemWrapper, TierClass, TierName, TierServices, TierLimit };
