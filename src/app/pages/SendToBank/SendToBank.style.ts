import styled, { css } from 'styled-components';

import { StyleConstants } from 'styles/StyleConstants';

export const Wrapper = styled.div<{
  display?: string;
  alignment?: string;
  direction?: string;
  justify?: string;
  margin?: string;
  width?: string;
}>`
  margin: 20px;

  ${({ display }) =>
    display &&
    css`
      display: ${display};
    `}

  ${({ alignment }) =>
    alignment &&
    css`
      align-items: ${alignment};
    `}
	
	${({ justify }) =>
    justify &&
    css`
      justify-content: ${justify};
    `}

	${({ direction }) =>
    direction &&
    css`
      flex-direction: ${direction};
    `}

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}

  ${({ width }) =>
    width &&
    css`
      width: ${width};
    `}

  .pin-input {
    margin: 0 0 5px;

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
        color: ${StyleConstants.BUTTONS.danger.main};
        border-color: ${StyleConstants.BUTTONS.danger.main};
      }
    }
  }

  .pin-description {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin: 10px 0;
  }

  .resend-code {
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    margin-top: 20px;

    span {
      color: ${StyleConstants.GOLD};
      cursor: pointer;
    }
  }
`;

export const ContentImage = styled.img<{
  margin?: string;
}>`
  max-width: 100%;

  ${({ margin }) =>
    margin &&
    css`
      margin: ${margin};
    `}
`;

export const CTAWrapper = styled.div`
  display: flex;
`;

export const SendCTA = styled.div`
  background: ${StyleConstants.WHITE};
  border: 1px solid ${StyleConstants.BORDER_COLOR};
  border-radius: 10px;
  box-sizing: border-box;
  cursor: pointer;
  margin-right: 30px;
  height: 250px;
  width: 400px;

  display: flex;
  justify-content: space-between;
`;

export const SendCTAContent = styled.div`
  padding: 20px;
`;

export const CTAList = styled.ul`
  padding: 0;
  margin: 20px 0 0;
  list-style: none;
`;

export const CTAListItem = styled.li`
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px;
  margin-bottom: 5px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const SendCTALogo = styled.div`
  background: ${StyleConstants.GOLD};
  border-radius: 0px 10px 10px 0px;
  padding: 30px;

  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    color: ${StyleConstants.WHITE};
  }
`;

export const BankIcons = styled.img`
  cursor: pointer;
  margin-right: 10px;

  &:last-child {
    margin-right: 0;
  }
`;

export const FormWrapper = styled.form`
  margin: 20px 0;
`;

export const FormFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 50px;

  button {
    margin-right: 10px;
    width: 150px;

    &::last-child {
      margin-right: 0;
    }
  }
`;

export const FieldSubtext = styled.span`
  font-size: 12px;
  font-weight: 400;
  font-style: normal;
  line-height: 18px;
`;

export const ReviewContainer = styled.div`
  margin: 20px auto;
  width: 100%;
`;

export const ReviewTotal = styled.div`
  margin: 40px 0 0;
  width: 100%;

  p {
    margin: 0;
    text-align: center;
  }

  .total-description,
  .service-fee {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
  }

  .total-amount {
    font-size: 18px;
    font-weight: 800;
    line-height: 27px;
    margin: 10px 0;
  }

  .service-fee {
    margin-bottom: 40px;
  }

  button {
    margin: 40px 0 0;
  }
`;

export const ReviewListItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;

  &:last-child {
    margin-bottom: 0;
  }

  p {
    font-size: 14px;
    font-weight: 400;
    font-style: normal;
    line-height: 21px;
    margin: 0;
  }
`;

export const SuccessWrapper = styled.div`
  box-shadow: 0px 12px 15px rgba(140, 152, 164, 0.1);
  margin: 10px auto 20px;
  position: relative;
  background: #faedab;
  padding: 20px;

  display: flex;
  align-items: center;
  flex-direction: column;

  .success-message {
    font-size: 16px;
    font-weight: 700;
    line-height: 24px;
    margin-top: 20px;
  }

  .date {
    font-size: 12px;
    font-weight: 400;
    font-style: normal;
    line-height: 18px;
    margin: 5px 0;
  }
`;

export const ConfirmationMessage = styled.p`
  font-size: 14px;
  font-weight: 400;
  font-style: normal;
  line-height: 21px;
  margin: 10px 0 0;
`;

export const ItemTitle = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  margin: 0;
`;

/**
 * List Components
 */
export const List = styled.ul`
  margin: 30px 0 0;
  padding: 0;

  li {
    list-style: none;
  }
`;

export const ListItem = styled.li`
  border-bottom: 1px solid #f3f4f9;
  padding: 15px 0;

  align-items: center;
  display: flex;
  justify-content: space-between;

  svg {
    cursor: pointer;
  }

  &:first-child {
    border-top: 1px solid #f3f4f9;
  }
`;

export const DetailsWrapper = styled.div<{
  padding?: string;
}>`
  ${({ padding }) =>
    padding &&
    css`
      padding: ${padding};
    `}
`;

export const CuttedImageWrapper = styled.img`
  &:first-child {
    position: absolute;
    top: -7px;
    width: 100%;
  }

  &:last-child {
    position: absolute;
    bottom: -7px;
    width: 100%;
  }
`;
